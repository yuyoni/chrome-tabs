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
        "orange",
    ],
};

// Debounce helper
let groupingTimeout = null;

// Custom grouping rules cache
let customRules = [];

// Bookmark folder map cache
let bookmarkMapCache = null;
let bookmarkCacheTime = 0;
const CACHE_DURATION = 60000; // 1 minute

// Load custom rules from storage
async function loadCustomRules() {
    try {
        const { groupingRules = [] } =
            await chrome.storage.local.get("groupingRules");
        customRules = groupingRules.filter((rule) => rule.enabled);
        return customRules;
    } catch (error) {
        console.error("Error loading custom rules:", error);
        return [];
    }
}

// Build bookmark folder map (URL → Folder Name)
async function buildBookmarkFolderMap() {
    try {
        const bookmarkTree = await chrome.bookmarks.getTree();
        const urlToFolder = new Map();

        // Recursively traverse bookmark tree
        function traverse(nodes, parentTitle, isRootLevel = false) {
            for (const node of nodes) {
                // Skip root-level containers but process their children
                const isRootContainer =
                    node.title === "Bookmarks Bar" ||
                    node.title === "Other Bookmarks" ||
                    node.title === "Mobile Bookmarks" ||
                    !node.title;

                if (isRootLevel && isRootContainer) {
                    if (node.children) {
                        traverse(node.children, null, false);
                    }
                    continue;
                }

                if (node.children && node.children.length > 0) {
                    // This is a folder - use it as parent for its children
                    traverse(node.children, node.title, false);
                } else if (node.url && parentTitle) {
                    // This is a bookmark with a valid parent folder
                    const normalizedUrl = normalizeUrl(node.url);
                    urlToFolder.set(normalizedUrl, parentTitle);
                    console.log(
                        `Bookmark mapped: ${normalizedUrl} → ${parentTitle}`,
                    );
                }
            }
        }

        traverse(bookmarkTree, null, true);
        console.log(`Built bookmark map with ${urlToFolder.size} entries`);
        return urlToFolder;
    } catch (error) {
        console.error("Error building bookmark folder map:", error);
        return new Map();
    }
}

// Get cached bookmark map or rebuild
async function getBookmarkMap() {
    const now = Date.now();

    // Return cached map if valid
    if (bookmarkMapCache && now - bookmarkCacheTime < CACHE_DURATION) {
        return bookmarkMapCache;
    }

    // Build new map
    bookmarkMapCache = await buildBookmarkFolderMap();
    bookmarkCacheTime = now;
    return bookmarkMapCache;
}

// Invalidate bookmark cache
function invalidateBookmarkCache() {
    bookmarkMapCache = null;
    bookmarkCacheTime = 0;
}

// Check if tab matches a custom rule
function matchCustomRule(tab, rule) {
    if (!rule.enabled) return false;

    const { matchType, keyword } = rule;
    const searchValue = keyword.toLowerCase();

    switch (matchType) {
        case "title":
            return tab.title && tab.title.toLowerCase().includes(searchValue);
        case "url":
            return tab.url && tab.url.toLowerCase().includes(searchValue);
        case "domain":
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

// Normalize URL for comparison (handles trailing slashes, fragments, etc.)
function normalizeUrl(url) {
    try {
        const urlObj = new URL(url);
        // Remove trailing slash, hash, and normalize
        let normalized = urlObj.origin + urlObj.pathname;
        if (normalized.endsWith("/")) {
            normalized = normalized.slice(0, -1);
        }
        // Add search params if they exist
        if (urlObj.search) {
            normalized += urlObj.search;
        }
        return normalized;
    } catch {
        return url;
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

        // Load custom rules and settings
        await loadCustomRules();
        const { useBookmarkGrouping = false } = await chrome.storage.local.get(
            "useBookmarkGrouping",
        );
        console.log(
            `Auto-grouping: useBookmarkGrouping = ${useBookmarkGrouping}`,
        );

        // Load bookmark map if enabled
        let bookmarkMap = new Map();
        if (useBookmarkGrouping) {
            bookmarkMap = await getBookmarkMap();
            console.log(`Loaded bookmark map with ${bookmarkMap.size} entries`);
        }

        // PRIORITY 1: Apply custom rules first
        const customGroups = {};
        const remainingAfterCustom = [];

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
                            rule: rule,
                        };
                    }
                    customGroups[groupKey].tabs.push(tab);
                    matched = true;
                    break; // Only apply first matching rule
                }
            }

            if (!matched) {
                remainingAfterCustom.push(tab);
            }
        }

        // PRIORITY 2: Group by bookmark folders (if enabled)
        const bookmarkGroups = {};
        const remainingAfterBookmark = [];

        for (const tab of remainingAfterCustom) {
            if (useBookmarkGrouping) {
                const normalizedTabUrl = normalizeUrl(tab.url);
                const folderName = bookmarkMap.get(normalizedTabUrl);
                if (folderName) {
                    console.log(
                        `Tab matched bookmark folder: ${normalizedTabUrl} → ${folderName}`,
                    );
                    if (!bookmarkGroups[folderName]) {
                        bookmarkGroups[folderName] = [];
                    }
                    bookmarkGroups[folderName].push(tab);
                    continue;
                }
            }
            remainingAfterBookmark.push(tab);
        }

        console.log(
            `Bookmark groups found: ${Object.keys(bookmarkGroups).length}`,
            Object.keys(bookmarkGroups),
        );

        // PRIORITY 3: Group remaining tabs by domain
        const domainGroups = {};
        const ungroupedTabs = [];

        for (const tab of remainingAfterBookmark) {
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
                    color:
                        groupData.rule.color ||
                        CONFIG.COLORS[colorIndex % CONFIG.COLORS.length],
                    collapsed: false,
                });
                colorIndex++;
                existingGroupNames.add(groupName);
            } catch (error) {
                console.error("Error creating custom group:", error);
            }
        }

        // STEP 2: Create bookmark folder groups
        for (const [folderName, bookmarkTabs] of Object.entries(
            bookmarkGroups,
        )) {
            if (bookmarkTabs.length < 2) {
                continue;
            }

            // Check if tabs are already grouped together
            const firstTabGroupId = bookmarkTabs[0].groupId;
            const allInSameGroup = bookmarkTabs.every(
                (tab) =>
                    tab.groupId === firstTabGroupId && firstTabGroupId !== -1,
            );

            if (allInSameGroup) {
                continue;
            }

            // Skip if group with this name already exists
            if (existingGroupNames.has(folderName)) {
                continue;
            }

            try {
                const tabIds = bookmarkTabs.map((tab) => tab.id);
                const groupId = await chrome.tabs.group({ tabIds });
                await chrome.tabGroups.update(groupId, {
                    title: folderName,
                    color: CONFIG.COLORS[colorIndex % CONFIG.COLORS.length],
                    collapsed: false,
                });
                colorIndex++;
                existingGroupNames.add(folderName);
            } catch (error) {
                console.error("Error creating bookmark group:", error);
            }
        }

        // STEP 3: Create groups for domains with 2+ tabs
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

// Check and group a single tab immediately (no debounce)
async function checkAndGroupSingleTab(tab) {
    try {
        // Skip if below threshold
        const allTabs = await chrome.tabs.query({ currentWindow: true });
        if (allTabs.length <= CONFIG.TAB_THRESHOLD) {
            return;
        }

        // Skip pinned tabs and chrome:// URLs
        if (
            tab.pinned ||
            !tab.url ||
            tab.url.startsWith("chrome://") ||
            tab.url.startsWith("chrome-extension://")
        ) {
            return;
        }

        // Skip if already grouped
        if (tab.groupId !== -1) {
            return;
        }

        // Load custom rules and settings
        await loadCustomRules();
        const { useBookmarkGrouping = false } = await chrome.storage.local.get(
            "useBookmarkGrouping",
        );

        // PRIORITY 1: Check custom rules first
        for (const rule of customRules) {
            if (matchCustomRule(tab, rule)) {
                // Find existing group with this name
                const groups = await chrome.tabGroups.query({
                    windowId: tab.windowId,
                });
                const existingGroup = groups.find(
                    (g) => g.title === rule.groupName,
                );

                if (existingGroup) {
                    // Add to existing group
                    await chrome.tabs.group({
                        tabIds: [tab.id],
                        groupId: existingGroup.id,
                    });
                    console.log(`Added tab to custom group: ${rule.groupName}`);
                } else {
                    // Create new group
                    const groupId = await chrome.tabs.group({
                        tabIds: [tab.id],
                    });
                    await chrome.tabGroups.update(groupId, {
                        title: rule.groupName,
                        color: rule.color || "blue",
                        collapsed: false,
                    });
                    console.log(`Created new custom group: ${rule.groupName}`);
                }
                return; // Only apply first matching rule
            }
        }

        // PRIORITY 2: Check bookmark folder grouping
        if (useBookmarkGrouping) {
            const bookmarkMap = await getBookmarkMap();
            const normalizedTabUrl = normalizeUrl(tab.url);
            console.log(`Checking bookmark for tab: ${normalizedTabUrl}`);
            const folderName = bookmarkMap.get(normalizedTabUrl);
            console.log(`Bookmark folder found: ${folderName || "none"}`);

            if (folderName) {
                // Find tabs with same bookmark folder
                const sameFolderTabs = allTabs.filter((t) => {
                    if (
                        t.pinned ||
                        !t.url ||
                        t.url.startsWith("chrome://") ||
                        t.url.startsWith("chrome-extension://")
                    ) {
                        return false;
                    }
                    const normalizedUrl = normalizeUrl(t.url);
                    return bookmarkMap.get(normalizedUrl) === folderName;
                });

                console.log(
                    `Found ${sameFolderTabs.length} tabs in folder "${folderName}"`,
                );

                // Need at least 2 tabs (including this one) to group
                if (sameFolderTabs.length >= 2) {
                    // Check if other tabs are already grouped
                    const groupedTabs = sameFolderTabs.filter(
                        (t) => t.groupId !== -1,
                    );

                    if (groupedTabs.length > 0) {
                        // Add to existing bookmark folder group
                        const existingGroupId = groupedTabs[0].groupId;
                        await chrome.tabs.group({
                            tabIds: [tab.id],
                            groupId: existingGroupId,
                        });
                        console.log(
                            `Added tab to existing bookmark folder group: ${folderName}`,
                        );
                    } else {
                        // Create new bookmark folder group
                        const groups = await chrome.tabGroups.query({
                            windowId: tab.windowId,
                        });
                        const existingGroup = groups.find(
                            (g) => g.title === folderName,
                        );

                        if (!existingGroup) {
                            // Group all same-folder tabs together
                            const tabIds = sameFolderTabs.map((t) => t.id);
                            const groupId = await chrome.tabs.group({ tabIds });
                            await chrome.tabGroups.update(groupId, {
                                title: folderName,
                                color: CONFIG.COLORS[
                                    Math.floor(
                                        Math.random() * CONFIG.COLORS.length,
                                    )
                                ],
                                collapsed: false,
                            });
                            console.log(
                                `Created new bookmark folder group: ${folderName}`,
                            );
                        } else {
                            // Add to existing group
                            await chrome.tabs.group({
                                tabIds: [tab.id],
                                groupId: existingGroup.id,
                            });
                            console.log(
                                `Added tab to existing bookmark folder group: ${folderName}`,
                            );
                        }
                    }
                    return; // Bookmark folder matched
                }
            }
        }

        // PRIORITY 3: Check domain grouping
        const domain = extractDomain(tab.url);
        if (!domain) return;

        // Find tabs with same domain
        const sameDomainTabs = allTabs.filter(
            (t) =>
                !t.pinned &&
                t.url &&
                !t.url.startsWith("chrome://") &&
                !t.url.startsWith("chrome-extension://") &&
                extractDomain(t.url) === domain,
        );

        // Need at least 2 tabs (including this one) to group
        if (sameDomainTabs.length < 2) {
            return;
        }

        // Check if other tabs are already grouped
        const groupedTabs = sameDomainTabs.filter((t) => t.groupId !== -1);
        if (groupedTabs.length > 0) {
            // Add to existing domain group
            const existingGroupId = groupedTabs[0].groupId;
            await chrome.tabs.group({
                tabIds: [tab.id],
                groupId: existingGroupId,
            });
            console.log(`Added tab to existing domain group`);
        } else {
            // Create new domain group if not exists
            const groupName = generateGroupName(
                domain,
                sameDomainTabs.map((t) => t.title || ""),
            );
            const groups = await chrome.tabGroups.query({
                windowId: tab.windowId,
            });
            const existingGroup = groups.find((g) => g.title === groupName);

            if (!existingGroup) {
                // Group all same-domain tabs together
                const tabIds = sameDomainTabs.map((t) => t.id);
                const groupId = await chrome.tabs.group({ tabIds });
                await chrome.tabGroups.update(groupId, {
                    title: groupName,
                    color: CONFIG.COLORS[
                        Math.floor(Math.random() * CONFIG.COLORS.length)
                    ],
                    collapsed: false,
                });
                console.log(`Created new domain group: ${groupName}`);
            }
        }
    } catch (error) {
        console.error("Error in checkAndGroupSingleTab:", error);
    }
}

// Ungroup all bookmark-based groups
async function ungroupBookmarkGroups() {
    try {
        // Get bookmark map to identify which groups are bookmark-based
        const bookmarkMap = await getBookmarkMap();

        // Get all bookmark folder names
        const bookmarkFolderNames = new Set(bookmarkMap.values());
        console.log("Bookmark folder names:", Array.from(bookmarkFolderNames));

        // Get all tab groups in current window
        const groups = await chrome.tabGroups.query({
            windowId: chrome.windows.WINDOW_ID_CURRENT,
        });

        let ungroupedCount = 0;

        // Ungroup tabs in groups that match bookmark folder names
        for (const group of groups) {
            if (bookmarkFolderNames.has(group.title)) {
                console.log(`Ungrouping bookmark-based group: ${group.title}`);

                // Get all tabs in this group
                const tabsInGroup = await chrome.tabs.query({
                    groupId: group.id,
                });

                // Ungroup each tab
                for (const tab of tabsInGroup) {
                    await chrome.tabs.ungroup(tab.id);
                }

                ungroupedCount++;
            }
        }

        console.log(`Ungrouped ${ungroupedCount} bookmark-based groups`);
        return ungroupedCount;
    } catch (error) {
        console.error("Error ungrouping bookmark groups:", error);
        return 0;
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

chrome.tabs.onUpdated.addListener(async (tabId, changeInfo, tab) => {
    // Only save when page is fully loaded
    if (changeInfo.status === "complete" && tab.url) {
        saveTabVisit(tab);

        // Check if this tab should be grouped immediately
        await checkAndGroupSingleTab(tab);
    }

    // Trigger grouping on URL or title changes
    if (changeInfo.url || changeInfo.title) {
        triggerAutoGroup();
    }
});

chrome.tabs.onRemoved.addListener(() => {
    triggerAutoGroup();
});

// Bookmark change listeners - invalidate cache
chrome.bookmarks.onCreated.addListener(() => {
    invalidateBookmarkCache();
});

chrome.bookmarks.onRemoved.addListener(() => {
    invalidateBookmarkCache();
});

chrome.bookmarks.onChanged.addListener(() => {
    invalidateBookmarkCache();
});

chrome.bookmarks.onMoved.addListener(() => {
    invalidateBookmarkCache();
});

// Keyboard shortcut handler
chrome.commands.onCommand.addListener((command) => {
    if (command === "trigger-grouping") {
        console.log("Manual grouping triggered via keyboard shortcut");
        autoGroupTabs();
    }
});

// Message handler for re-grouping and ungrouping
chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
    if (message.action === "regroupTabs") {
        console.log("Re-grouping tabs based on updated rules");
        autoGroupTabs();
        sendResponse({ success: true });
    } else if (message.action === "ungroupBookmarkGroups") {
        console.log("Ungrouping bookmark-based groups");
        ungroupBookmarkGroups().then((count) => {
            sendResponse({ success: true, count: count });
        });
        return true; // Will respond asynchronously
    }
    return true;
});

// Initialize: save existing tabs
chrome.runtime.onInstalled.addListener(async () => {
    console.log("Smart Tab Manager installed");

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
