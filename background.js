// Configuration
const CONFIG = {
    TAB_THRESHOLD: 10,
    MAX_STORAGE_ENTRIES: 1000,
    DEBOUNCE_DELAY: 2000,
    COLORS: [
        "grey",
        "blue",
        "red",
        "yellow",
        "green",
        "pink",
        "purple",
        "cyan",
    ],
};

// Debounce helper
let groupingTimeout = null;

// Custom grouping rules cache
let customRules = [];

// Load custom rules from storage
async function loadCustomRules() {
    try {
        const { groupingRules = [] } = await chrome.storage.local.get('groupingRules');
        customRules = groupingRules.filter(rule => rule.enabled);
        return customRules;
    } catch (error) {
        console.error('Error loading custom rules:', error);
        return [];
    }
}

// Check if tab matches a custom rule
function matchCustomRule(tab, rule) {
    if (!rule.enabled) return false;

    const { matchType, keyword } = rule;
    const searchValue = keyword.toLowerCase();

    switch (matchType) {
        case 'title':
            return tab.title && tab.title.toLowerCase().includes(searchValue);
        case 'url':
            return tab.url && tab.url.toLowerCase().includes(searchValue);
        case 'domain':
            const domain = extractDomain(tab.url);
            return domain === searchValue;
        default:
            return false;
    }
}

// Store tab visit data
async function saveTabVisit(tab) {
    if (
        !tab.url ||
        tab.url.startsWith("chrome://") ||
        tab.url.startsWith("chrome-extension://")
    ) {
        return;
    }

    const tabData = {
        title: tab.title || "Untitled",
        url: tab.url,
        timestamp: Date.now(),
        domain: extractDomain(tab.url),
    };

    try {
        const { tabHistory = [] } =
            await chrome.storage.local.get("tabHistory");

        // Add new entry at the beginning
        tabHistory.unshift(tabData);

        // Limit storage size
        const limitedHistory = tabHistory.slice(0, CONFIG.MAX_STORAGE_ENTRIES);

        await chrome.storage.local.set({ tabHistory: limitedHistory });
    } catch (error) {
        console.error("Error saving tab visit:", error);
    }
}

// Extract domain from URL
function extractDomain(url) {
    try {
        const urlObj = new URL(url);
        return urlObj.hostname.replace("www.", "");
    } catch {
        return "";
    }
}

// Extract group name from domain and titles
function generateGroupName(domain, titles) {
    // Common domain mappings
    const domainNames = {
        "youtube.com": "YouTube",
        "github.com": "GitHub",
        "stackoverflow.com": "Stack Overflow",
        "reddit.com": "Reddit",
        "twitter.com": "Twitter",
        "facebook.com": "Facebook",
        "linkedin.com": "LinkedIn",
        "amazon.com": "Amazon",
        "netflix.com": "Netflix",
        "google.com": "Google",
    };

    if (domainNames[domain]) {
        return domainNames[domain];
    }

    // Try to extract meaningful keywords from titles
    const keywords = extractCommonKeywords(titles);
    if (keywords) {
        return keywords;
    }

    // Fallback to domain name
    return (
        domain.split(".")[0].charAt(0).toUpperCase() +
        domain.split(".")[0].slice(1)
    );
}

// Extract common keywords from titles
function extractCommonKeywords(titles) {
    if (titles.length === 0) return null;

    // Split titles into words and count frequency
    const wordCounts = {};
    const stopWords = new Set([
        "the",
        "a",
        "an",
        "and",
        "or",
        "but",
        "in",
        "on",
        "at",
        "to",
        "for",
        "of",
        "with",
        "by",
        "from",
        "as",
        "is",
        "was",
        "are",
        "been",
        "be",
        "have",
        "has",
        "had",
        "do",
        "does",
        "did",
        "will",
        "would",
        "should",
        "could",
        "may",
        "might",
        "must",
        "can",
    ]);

    titles.forEach((title) => {
        const words = title.toLowerCase().split(/\W+/);
        words.forEach((word) => {
            if (word.length > 3 && !stopWords.has(word)) {
                wordCounts[word] = (wordCounts[word] || 0) + 1;
            }
        });
    });

    // Find most common word
    let maxCount = 0;
    let commonWord = null;
    for (const [word, count] of Object.entries(wordCounts)) {
        if (count > maxCount && count >= Math.min(2, titles.length / 2)) {
            maxCount = count;
            commonWord = word;
        }
    }

    if (commonWord) {
        return commonWord.charAt(0).toUpperCase() + commonWord.slice(1);
    }

    return null;
}

// Auto-group tabs
async function autoGroupTabs() {
    try {
        const tabs = await chrome.tabs.query({ currentWindow: true });

        // Only group if threshold exceeded
        if (tabs.length <= CONFIG.TAB_THRESHOLD) {
            return;
        }

        // Load custom rules
        await loadCustomRules();

        // PRIORITY 1: Apply custom rules first
        const customGroups = {};
        const remainingTabs = [];

        for (const tab of tabs) {
            // Skip pinned tabs and chrome:// URLs
            if (
                tab.pinned ||
                !tab.url ||
                tab.url.startsWith("chrome://") ||
                tab.url.startsWith("chrome-extension://")
            ) {
                continue;
            }

            // Check against custom rules (highest priority)
            let matched = false;
            for (const rule of customRules) {
                if (matchCustomRule(tab, rule)) {
                    const groupKey = rule.groupName;
                    if (!customGroups[groupKey]) {
                        customGroups[groupKey] = {
                            tabs: [],
                            rule: rule
                        };
                    }
                    customGroups[groupKey].tabs.push(tab);
                    matched = true;
                    break; // Only apply first matching rule
                }
            }

            if (!matched) {
                remainingTabs.push(tab);
            }
        }

        // PRIORITY 2: Group remaining tabs by domain
        const domainGroups = {};
        const ungroupedTabs = [];

        for (const tab of remainingTabs) {
            const domain = extractDomain(tab.url);
            if (!domain) {
                ungroupedTabs.push(tab);
                continue;
            }

            if (!domainGroups[domain]) {
                domainGroups[domain] = [];
            }
            domainGroups[domain].push(tab);
        }

        // Get existing groups to avoid duplicates
        const existingGroups = await chrome.tabGroups.query({
            windowId: chrome.windows.WINDOW_ID_CURRENT,
        });
        const existingGroupNames = new Set(existingGroups.map((g) => g.title));

        let colorIndex = 0;

        // STEP 1: Create custom rule groups first
        for (const [groupName, groupData] of Object.entries(customGroups)) {
            if (groupData.tabs.length < 1) {
                continue;
            }

            // Check if tabs are already grouped together
            const firstTabGroupId = groupData.tabs[0].groupId;
            const allInSameGroup = groupData.tabs.every(
                (tab) =>
                    tab.groupId === firstTabGroupId && firstTabGroupId !== -1,
            );

            if (allInSameGroup) {
                continue;
            }

            // Skip if group with this name already exists
            if (existingGroupNames.has(groupName)) {
                continue;
            }

            try {
                const tabIds = groupData.tabs.map((tab) => tab.id);
                const groupId = await chrome.tabs.group({ tabIds });
                await chrome.tabGroups.update(groupId, {
                    title: groupName,
                    color: groupData.rule.color || CONFIG.COLORS[colorIndex % CONFIG.COLORS.length],
                    collapsed: false,
                });
                colorIndex++;
                existingGroupNames.add(groupName);
            } catch (error) {
                console.error("Error creating custom group:", error);
            }
        }

        // STEP 2: Create groups for domains with 2+ tabs
        for (const [domain, domainTabs] of Object.entries(domainGroups)) {
            if (domainTabs.length < 2) {
                continue;
            }

            // Check if tabs are already grouped together
            const firstTabGroupId = domainTabs[0].groupId;
            const allInSameGroup = domainTabs.every(
                (tab) =>
                    tab.groupId === firstTabGroupId && firstTabGroupId !== -1,
            );

            if (allInSameGroup) {
                continue;
            }

            // Create new group
            const tabIds = domainTabs.map((tab) => tab.id);
            const groupName = generateGroupName(
                domain,
                domainTabs.map((t) => t.title || ""),
            );

            // Skip if group with this name already exists
            if (existingGroupNames.has(groupName)) {
                continue;
            }

            try {
                const groupId = await chrome.tabs.group({ tabIds });
                await chrome.tabGroups.update(groupId, {
                    title: groupName,
                    color: CONFIG.COLORS[colorIndex % CONFIG.COLORS.length],
                    collapsed: false,
                });
                colorIndex++;
            } catch (error) {
                console.error("Error creating group:", error);
            }
        }
    } catch (error) {
        console.error("Error in autoGroupTabs:", error);
    }
}

// Debounced grouping
function triggerAutoGroup() {
    if (groupingTimeout) {
        clearTimeout(groupingTimeout);
    }

    groupingTimeout = setTimeout(() => {
        autoGroupTabs();
    }, CONFIG.DEBOUNCE_DELAY);
}

// Event listeners
chrome.tabs.onCreated.addListener((tab) => {
    triggerAutoGroup();
});

chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
    // Only save when page is fully loaded
    if (changeInfo.status === "complete" && tab.url) {
        saveTabVisit(tab);
    }

    // Trigger grouping on URL or title changes
    if (changeInfo.url || changeInfo.title) {
        triggerAutoGroup();
    }
});

chrome.tabs.onRemoved.addListener(() => {
    triggerAutoGroup();
});

// Keyboard shortcut handler
chrome.commands.onCommand.addListener((command) => {
    if (command === "trigger-grouping") {
        console.log("Manual grouping triggered via keyboard shortcut");
        autoGroupTabs();
    }
});

// Message handler for re-grouping
chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
    if (message.action === 'regroupTabs') {
        console.log('Re-grouping tabs based on updated rules');
        autoGroupTabs();
        sendResponse({ success: true });
    }
    return true;
});

// Initialize: save existing tabs
chrome.runtime.onInstalled.addListener(async () => {
    console.log("Smart Tab Memory installed");

    // Save all current tabs
    const tabs = await chrome.tabs.query({});
    for (const tab of tabs) {
        if (tab.url && !tab.url.startsWith("chrome://")) {
            await saveTabVisit(tab);
        }
    }

    // Initial grouping check
    autoGroupTabs();
});
