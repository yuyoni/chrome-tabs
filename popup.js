// ========================================
// TRANSLATIONS
// ========================================

const TRANSLATIONS = {
    ko: {
        subtitle: "탭 히스토리 검색",
        tab_search: "🔍 검색",
        tab_rules: "⚙️ 규칙",
        tab_guide: "📖 가이드",
        search_placeholder: "제목 또는 URL로 검색...",
        clear_history: "기록 삭제",
        recently_closed: "💡 최근 닫은 탭",
        empty_state: "탭 기록이 없어요. 브라우징을 시작해보세요! 🚀",
        all_tabs_open: "현재 모든 탭이 열려 있어요",
        no_search_match: "검색 결과가 없어요",
        btn_go: "이동",
        btn_restore: "복원",
        status_open: "● 열려있음",
        result_count: (n) => `${n}개 결과`,
        tabs_in_history: (n) => `히스토리 ${n}개`,
        time_just_now: "방금 전",
        time_minutes: (n) => `${n}분 전`,
        time_hours: (n) => `${n}시간 전`,
        time_days: (n) => `${n}일 전`,
        closed_status: (time) => `${time} 닫힘`,
        btn_regroup_title: "전체 탭 재그룹화",
        btn_regroup_subtitle: "단축키: Alt+G (Mac: ⌥G)",
        btn_regroup_loading: "그룹화 중...",
        btn_regroup_wait: "잠시 기다려주세요",
        bookmark_title: "📚 북마크 기반 그룹화",
        bookmark_toggle_text: "북마크 폴더로 탭 그룹화",
        bookmark_desc: "북마크 폴더에 저장된 URL과 일치하는 탭이 해당 폴더명으로 그룹화됩니다. 커스텀 규칙보다 우선순위가 낮아요.",
        rules_title: "📋 커스텀 그룹화 규칙",
        rules_subtitle: "규칙을 만들어 탭을 자동으로 그룹화하세요. 커스텀 규칙은 모든 그룹화 방식보다 우선합니다.",
        no_rules: '규칙이 없어요. "+ 새 규칙 추가"를 눌러 만들어보세요.',
        add_rule: "+ 새 규칙 추가",
        modal_new_title: "➕ 새 그룹화 규칙",
        modal_edit_title: "✏️ 그룹화 규칙 편집",
        label_group_name: "그룹 이름:",
        placeholder_group_name: "예: React 공부",
        label_match: "매칭 조건:",
        match_title: "제목 포함",
        match_url: "URL 포함",
        match_domain: "도메인 일치",
        label_keyword: "키워드:",
        label_color: "색상:",
        label_enabled: "이 규칙 활성화",
        btn_save: "저장",
        btn_cancel: "취소",
        confirm_clear: "탭 기록을 모두 삭제할까요? 되돌릴 수 없어요.",
        confirm_delete_rule: "이 규칙을 삭제할까요? 되돌릴 수 없어요.",
        confirm_ungroup: "북마크 기반 그룹핑을 비활성화합니다.\n\n현재 존재하는 북마크 폴더 기반 그룹들을 모두 해제하시겠습니까?\n\n(확인: 그룹 해제, 취소: 그룹 유지)",
        alert_fill_fields: "모든 항목을 입력해주세요",
        guide_welcome_sub: "브라우저 탭을 스마트하게 관리하는 확장 프로그램",
        guide_search_title: "탭 검색",
        guide_search_items: [
            "검색창에 입력하면 <strong>제목</strong>, <strong>URL</strong>, <strong>도메인</strong>으로 탭을 찾을 수 있어요",
            "첫 화면에는 <strong>최근 닫은 탭</strong> 10개가 자동으로 표시돼요",
            "<strong>복원</strong> 버튼을 누르면 닫힌 탭을 다시 열어요",
            "<strong>이동</strong> 버튼을 누르면 열려 있는 탭으로 바로 이동해요",
        ],
        guide_rules_title: "탭 그룹화 규칙",
        guide_rules_items: [
            "<strong>+ 새 규칙 추가</strong>를 눌러 그룹화 규칙을 만들어요",
            "탭 <strong>제목</strong>, <strong>URL</strong>, <strong>도메인</strong> 중 하나로 조건을 설정해요",
            "그룹 이름과 색상을 지정하면 자동으로 묶어줘요",
            "규칙 옆 토글로 언제든지 켜고 끌 수 있어요",
            "<strong>전체 탭 재그룹화</strong>를 누르면 지금 바로 규칙을 적용해요",
        ],
        guide_bookmark_title: "북마크 폴더 기반 그룹화",
        guide_bookmark_items: [
            "활성화하면 <strong>북마크 폴더</strong>를 기준으로 탭을 자동 그룹화해요",
            "북마크 폴더에 저장된 URL과 일치하는 탭이 해당 폴더명으로 묶여요",
            "커스텀 규칙보다는 우선순위가 낮아요",
        ],
        guide_shortcuts_title: "단축키",
        guide_shortcut_open: "팝업 열기",
        guide_shortcut_regroup: "탭 즉시 재그룹화",
        guide_mac_note: "Mac에서는 Alt 대신 <kbd>⌥ Option</kbd> 키를 사용하세요",
        guide_priority_title: "그룹화 우선순위",
        guide_priority_desc: "여러 조건이 겹칠 때 이 순서로 적용돼요",
        guide_p1_name: "커스텀 규칙",
        guide_p1_desc: "직접 만든 규칙이 최우선",
        guide_p2_name: "북마크 폴더",
        guide_p2_desc: "활성화 시 적용",
        guide_p3_name: "도메인 자동 그룹화",
        guide_p3_desc: "같은 도메인끼리 묶기",
    },
    en: {
        subtitle: "Search your browsing history",
        tab_search: "🔍 Search",
        tab_rules: "⚙️ Rules",
        tab_guide: "📖 Guide",
        search_placeholder: "Search by title or URL...",
        clear_history: "Clear History",
        recently_closed: "💡 Recently Closed",
        empty_state: "No tabs found. Start browsing to build your tab memory! 🚀",
        all_tabs_open: "All recent tabs are currently open",
        no_search_match: "No tabs match your search",
        btn_go: "Go",
        btn_restore: "Restore",
        status_open: "● Open",
        result_count: (n) => `${n} result${n !== 1 ? "s" : ""}`,
        tabs_in_history: (n) => `${n} tabs in history`,
        time_just_now: "Just now",
        time_minutes: (n) => `${n}m ago`,
        time_hours: (n) => `${n}h ago`,
        time_days: (n) => `${n}d ago`,
        closed_status: (time) => `Closed ${time}`,
        btn_regroup_title: "Re-group All Tabs",
        btn_regroup_subtitle: "Shortcut: Alt+G (⌥G on Mac)",
        btn_regroup_loading: "Grouping tabs...",
        btn_regroup_wait: "Please wait",
        bookmark_title: "📚 Bookmark-based Grouping",
        bookmark_toggle_text: "Group tabs by bookmark folders",
        bookmark_desc: "Tabs matching URLs in your bookmark folders will be grouped together. This takes priority over domain grouping but not custom rules.",
        rules_title: "📋 Custom Grouping Rules",
        rules_subtitle: "Create rules to automatically group tabs. Custom rules take priority over all other grouping methods.",
        no_rules: 'No custom rules yet. Click "+ Add New Rule" to create one.',
        add_rule: "+ Add New Rule",
        modal_new_title: "➕ New Grouping Rule",
        modal_edit_title: "✏️ Edit Grouping Rule",
        label_group_name: "Group Name:",
        placeholder_group_name: "e.g., React Study",
        label_match: "Match Condition:",
        match_title: "Title contains",
        match_url: "URL contains",
        match_domain: "Domain equals",
        label_keyword: "Keyword:",
        label_color: "Color:",
        label_enabled: "Enable this rule",
        btn_save: "Save",
        btn_cancel: "Cancel",
        confirm_clear: "Clear all tab history? This cannot be undone.",
        confirm_delete_rule: "Delete this rule? This cannot be undone.",
        confirm_ungroup: "Disable bookmark-based grouping.\n\nUngroup all current bookmark folder-based groups?\n\n(OK: Ungroup, Cancel: Keep groups)",
        alert_fill_fields: "Please fill in all fields",
        guide_welcome_sub: "Smart tab management for your browser",
        guide_search_title: "Tab Search",
        guide_search_items: [
            "Search by <strong>title</strong>, <strong>URL</strong>, or <strong>domain</strong> using the search box",
            "The first screen shows the <strong>10 most recently closed tabs</strong> automatically",
            "Click <strong>Restore</strong> to reopen a closed tab",
            "Click <strong>Go</strong> to switch to an already open tab",
        ],
        guide_rules_title: "Tab Grouping Rules",
        guide_rules_items: [
            "Click <strong>+ Add New Rule</strong> to create a grouping rule",
            "Set a condition using tab <strong>title</strong>, <strong>URL</strong>, or <strong>domain</strong>",
            "Assign a group name and color — tabs will be grouped automatically",
            "Toggle rules on/off anytime with the switch next to each rule",
            "Click <strong>Re-group All Tabs</strong> to apply rules immediately",
        ],
        guide_bookmark_title: "Bookmark Folder Grouping",
        guide_bookmark_items: [
            "Enable to auto-group tabs using your <strong>bookmark folders</strong>",
            "Tabs with URLs saved in a bookmark folder get grouped under that folder's name",
            "Lower priority than custom rules",
        ],
        guide_shortcuts_title: "Keyboard Shortcuts",
        guide_shortcut_open: "Open popup",
        guide_shortcut_regroup: "Re-group all tabs now",
        guide_mac_note: "On Mac, use <kbd>⌥ Option</kbd> instead of Alt",
        guide_priority_title: "Grouping Priority",
        guide_priority_desc: "When multiple conditions overlap, this order applies",
        guide_p1_name: "Custom Rules",
        guide_p1_desc: "Your rules always take first priority",
        guide_p2_name: "Bookmark Folders",
        guide_p2_desc: "Applied when enabled",
        guide_p3_name: "Domain Auto-grouping",
        guide_p3_desc: "Groups tabs by same domain",
    },
};

// ========================================
// LANGUAGE STATE
// ========================================

let currentLang = "ko";

function t(key, ...args) {
    const val = TRANSLATIONS[currentLang][key];
    if (typeof val === "function") return val(...args);
    return val !== undefined ? val : key;
}

// ========================================
// DOM Elements - Search Tab
// ========================================
const searchInput = document.getElementById("searchInput");
const resultsList = document.getElementById("resultsList");
const suggestionsList = document.getElementById("suggestionsList");
const resultCount = document.getElementById("resultCount");
const clearHistoryBtn = document.getElementById("clearHistory");
const emptyState = document.getElementById("emptyState");
const resultsSection = document.getElementById("resultsSection");
const suggestionsSection = document.getElementById("suggestionsSection");

// DOM Elements - Rules Tab
const rulesList = document.getElementById("rulesList");
const addRuleBtn = document.getElementById("addRuleBtn");
const triggerGroupingBtn = document.getElementById("triggerGroupingBtn");
const ruleModal = document.getElementById("ruleModal");
const saveRuleBtn = document.getElementById("saveRuleBtn");
const cancelRuleBtn = document.getElementById("cancelRuleBtn");
const ruleGroupNameInput = document.getElementById("ruleGroupName");
const ruleKeywordInput = document.getElementById("ruleKeyword");
const ruleEnabledCheckbox = document.getElementById("ruleEnabled");

// State
let tabHistory = [];
let groupingRules = [];
let editingRuleIndex = -1;
let selectedColor = "blue";

// ========================================
// LANGUAGE MANAGEMENT
// ========================================

async function loadLanguage() {
    try {
        const { language = "ko" } = await chrome.storage.local.get("language");
        currentLang = language;
    } catch (error) {
        currentLang = "ko";
    }
}

async function saveLanguage(lang) {
    try {
        await chrome.storage.local.set({ language: lang });
    } catch (error) {
        console.error("Error saving language:", error);
    }
}

function applyTranslations() {
    // Update lang toggle button
    const langToggle = document.getElementById("langToggle");
    if (langToggle) {
        langToggle.textContent = currentLang === "ko" ? "EN" : "한국어";
    }

    // Update textContent for data-i18n elements
    document.querySelectorAll("[data-i18n]").forEach((el) => {
        const key = el.dataset.i18n;
        const value = t(key);
        if (value && typeof value === "string") el.textContent = value;
    });

    // Update placeholder for data-i18n-placeholder elements
    document.querySelectorAll("[data-i18n-placeholder]").forEach((el) => {
        const key = el.dataset.i18nPlaceholder;
        const value = t(key);
        if (value) el.placeholder = value;
    });

    // Regenerate guide tab content
    renderGuideTab();
}

function renderGuideTab() {
    const container = document.getElementById("guideContent");
    if (!container) return;

    container.innerHTML = `
        <div class="guide-welcome">
            <div class="guide-welcome-icon">🧠</div>
            <h2>Auto Tab Organizer</h2>
            <p>${t("guide_welcome_sub")}</p>
        </div>

        <div class="guide-card">
            <div class="guide-card-header">
                <span class="guide-card-icon">🔍</span>
                <h3>${t("guide_search_title")}</h3>
            </div>
            <ul class="guide-list">
                ${t("guide_search_items").map((item) => `<li>${item}</li>`).join("")}
            </ul>
        </div>

        <div class="guide-card">
            <div class="guide-card-header">
                <span class="guide-card-icon">⚙️</span>
                <h3>${t("guide_rules_title")}</h3>
            </div>
            <ul class="guide-list">
                ${t("guide_rules_items").map((item) => `<li>${item}</li>`).join("")}
            </ul>
        </div>

        <div class="guide-card">
            <div class="guide-card-header">
                <span class="guide-card-icon">📚</span>
                <h3>${t("guide_bookmark_title")}</h3>
            </div>
            <ul class="guide-list">
                ${t("guide_bookmark_items").map((item) => `<li>${item}</li>`).join("")}
            </ul>
        </div>

        <div class="guide-card">
            <div class="guide-card-header">
                <span class="guide-card-icon">⌨️</span>
                <h3>${t("guide_shortcuts_title")}</h3>
            </div>
            <div class="guide-shortcuts">
                <div class="shortcut-row">
                    <div class="shortcut-keys">
                        <kbd>Alt</kbd><span class="shortcut-plus">+</span><kbd>S</kbd>
                    </div>
                    <span class="shortcut-desc">${t("guide_shortcut_open")}</span>
                </div>
                <div class="shortcut-row">
                    <div class="shortcut-keys">
                        <kbd>Alt</kbd><span class="shortcut-plus">+</span><kbd>G</kbd>
                    </div>
                    <span class="shortcut-desc">${t("guide_shortcut_regroup")}</span>
                </div>
            </div>
            <p class="guide-note">${t("guide_mac_note")}</p>
        </div>

        <div class="guide-card">
            <div class="guide-card-header">
                <span class="guide-card-icon">🏆</span>
                <h3>${t("guide_priority_title")}</h3>
            </div>
            <p class="guide-priority-desc">${t("guide_priority_desc")}</p>
            <div class="guide-priority">
                <div class="priority-item">
                    <span class="priority-badge p1">1</span>
                    <div class="priority-text">
                        <strong>${t("guide_p1_name")}</strong>
                        <span>${t("guide_p1_desc")}</span>
                    </div>
                </div>
                <div class="priority-arrow">↓</div>
                <div class="priority-item">
                    <span class="priority-badge p2">2</span>
                    <div class="priority-text">
                        <strong>${t("guide_p2_name")}</strong>
                        <span>${t("guide_p2_desc")}</span>
                    </div>
                </div>
                <div class="priority-arrow">↓</div>
                <div class="priority-item">
                    <span class="priority-badge p3">3</span>
                    <div class="priority-text">
                        <strong>${t("guide_p3_name")}</strong>
                        <span>${t("guide_p3_desc")}</span>
                    </div>
                </div>
            </div>
        </div>
    `;
}

// ========================================
// INITIALIZE
// ========================================

async function init() {
    await loadLanguage();
    await loadTabHistory();
    await loadGroupingRules();
    await loadBookmarkSettings();
    applyTranslations();
    displaySuggestions();
    setupEventListeners();
    setupTabNavigation();
}

// ========================================
// TAB HISTORY
// ========================================

async function loadTabHistory() {
    try {
        const { tabHistory: history = [] } =
            await chrome.storage.local.get("tabHistory");
        tabHistory = history;
    } catch (error) {
        console.error("Error loading tab history:", error);
        tabHistory = [];
    }
}

// ========================================
// EVENT LISTENERS
// ========================================

function setupEventListeners() {
    searchInput.addEventListener("input", debounce(handleSearch, 300));
    clearHistoryBtn.addEventListener("click", handleClearHistory);

    // Language toggle
    const langToggle = document.getElementById("langToggle");
    if (langToggle) {
        langToggle.addEventListener("click", async () => {
            currentLang = currentLang === "ko" ? "en" : "ko";
            await saveLanguage(currentLang);
            applyTranslations();
            // Refresh dynamic content in current language
            if (searchInput.value.trim()) {
                handleSearch();
            } else {
                displaySuggestions();
            }
            displayRules();
        });
    }
}

// Debounce helper
function debounce(func, delay) {
    let timeout;
    return function (...args) {
        clearTimeout(timeout);
        timeout = setTimeout(() => func.apply(this, args), delay);
    };
}

// ========================================
// SEARCH
// ========================================

async function handleSearch() {
    const query = searchInput.value.trim().toLowerCase();

    if (!query) {
        displaySuggestions();
        return;
    }

    const filteredTabs = tabHistory.filter((tab) => {
        const titleMatch = tab.title.toLowerCase().includes(query);
        const urlMatch = tab.url.toLowerCase().includes(query);
        const domainMatch =
            tab.domain && tab.domain.toLowerCase().includes(query);
        return titleMatch || urlMatch || domainMatch;
    });

    const openTabs = await chrome.tabs.query({});
    const openTabsMap = new Map(openTabs.map((tab) => [tab.url, tab]));

    displayResults(filteredTabs, query, openTabsMap);
}

async function displaySuggestions() {
    suggestionsSection.style.display = "block";
    resultsSection.style.display = "none";

    if (tabHistory.length === 0) {
        emptyState.style.display = "flex";
        suggestionsSection.style.display = "none";
        return;
    }

    emptyState.style.display = "none";

    const openTabs = await chrome.tabs.query({});
    const openTabsMap = new Map(openTabs.map((tab) => [tab.url, tab]));

    const recentClosed = tabHistory
        .filter((tab) => !openTabsMap.has(tab.url))
        .slice(0, 10);

    suggestionsList.innerHTML = "";

    if (recentClosed.length === 0) {
        suggestionsList.innerHTML = `<p class="no-results">${t("all_tabs_open")}</p>`;
        return;
    }

    recentClosed.forEach((tab) => {
        const tabCard = createTabCard(tab, false, "", openTabsMap);
        suggestionsList.appendChild(tabCard);
    });

    resultCount.textContent = t("tabs_in_history", tabHistory.length);
}

function displayResults(filteredTabs, query, openTabsMap) {
    suggestionsSection.style.display = "none";
    resultsSection.style.display = "block";
    emptyState.style.display = "none";

    resultsList.innerHTML = "";
    resultCount.textContent = t("result_count", filteredTabs.length);

    if (filteredTabs.length === 0) {
        resultsList.innerHTML = `<p class="no-results">${t("no_search_match")}</p>`;
        return;
    }

    filteredTabs.slice(0, 50).forEach((tab) => {
        const tabCard = createTabCard(tab, true, query, openTabsMap);
        resultsList.appendChild(tabCard);
    });
}

function createTabCard(tab, highlight = false, query = "", openTabsMap = new Map()) {
    const card = document.createElement("div");

    const openTab = openTabsMap.get(tab.url);
    const isOpen = !!openTab;

    card.className = isOpen ? "tab-card tab-card-open" : "tab-card tab-card-closed";

    const info = document.createElement("div");
    info.className = "tab-info";

    const title = document.createElement("div");
    title.className = "tab-title";
    title.textContent = tab.title || "Untitled";
    if (highlight && query) {
        title.innerHTML = highlightText(tab.title || "Untitled", query);
    }

    const url = document.createElement("div");
    url.className = "tab-url";
    url.textContent = truncateUrl(tab.url);
    if (highlight && query) {
        url.innerHTML = highlightText(truncateUrl(tab.url), query);
    }

    const statusContainer = document.createElement("div");
    statusContainer.className = "tab-status";

    const statusBadge = document.createElement("span");
    if (isOpen) {
        statusBadge.className = "status-badge status-open";
        statusBadge.textContent = t("status_open");
    } else {
        statusBadge.className = "status-badge status-closed";
        statusBadge.textContent = t("closed_status", formatTime(tab.timestamp));
    }
    statusContainer.appendChild(statusBadge);

    info.appendChild(title);
    info.appendChild(url);
    info.appendChild(statusContainer);

    const actionBtn = document.createElement("button");
    actionBtn.className = "btn-reopen";

    if (isOpen) {
        actionBtn.textContent = t("btn_go");
        actionBtn.onclick = () => switchToTab(openTab.id);
    } else {
        actionBtn.textContent = t("btn_restore");
        actionBtn.onclick = () => reopenTab(tab.url);
    }

    card.appendChild(info);
    card.appendChild(actionBtn);

    return card;
}

function highlightText(text, query) {
    const regex = new RegExp(`(${escapeRegex(query)})`, "gi");
    return text.replace(regex, "<mark>$1</mark>");
}

function escapeRegex(string) {
    return string.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

function truncateUrl(url) {
    const maxLength = 60;
    if (url.length <= maxLength) return url;
    return url.substring(0, maxLength) + "...";
}

function formatTime(timestamp) {
    const now = Date.now();
    const diff = now - timestamp;

    const minutes = Math.floor(diff / 60000);
    const hours = Math.floor(diff / 3600000);
    const days = Math.floor(diff / 86400000);

    if (minutes < 1) return t("time_just_now");
    if (minutes < 60) return t("time_minutes", minutes);
    if (hours < 24) return t("time_hours", hours);
    if (days < 7) return t("time_days", days);

    const date = new Date(timestamp);
    return date.toLocaleDateString();
}

function switchToTab(tabId) {
    chrome.tabs.update(tabId, { active: true }, (tab) => {
        chrome.windows.update(tab.windowId, { focused: true });
    });
    window.close();
}

function reopenTab(url) {
    chrome.tabs.create({ url, active: true });
    window.close();
}

async function handleClearHistory() {
    if (!confirm(t("confirm_clear"))) return;

    try {
        await chrome.storage.local.set({ tabHistory: [] });
        tabHistory = [];
        displaySuggestions();
    } catch (error) {
        console.error("Error clearing history:", error);
    }
}

// ========================================
// RULES MANAGEMENT
// ========================================

async function loadBookmarkSettings() {
    try {
        const { useBookmarkGrouping = false } = await chrome.storage.local.get(
            "useBookmarkGrouping",
        );
        const toggle = document.getElementById("bookmarkGroupingToggle");
        if (toggle) {
            toggle.checked = useBookmarkGrouping;
        }
    } catch (error) {
        console.error("Error loading bookmark settings:", error);
    }
}

async function triggerManualGrouping() {
    try {
        const btn = document.getElementById("triggerGroupingBtn");
        btn.disabled = true;
        const originalHTML = btn.innerHTML;
        btn.innerHTML = `
            <span class="btn-icon-large">⏳</span>
            <div class="btn-text">
                <div class="btn-title">${t("btn_regroup_loading")}</div>
                <div class="btn-subtitle">${t("btn_regroup_wait")}</div>
            </div>
        `;

        chrome.runtime.sendMessage({ action: "regroupTabs" }, () => {
            setTimeout(() => {
                btn.innerHTML = originalHTML;
                btn.disabled = false;
            }, 1000);
        });
    } catch (error) {
        console.error("Error triggering manual grouping:", error);
    }
}

async function toggleBookmarkGrouping() {
    try {
        const toggle = document.getElementById("bookmarkGroupingToggle");
        const enabled = toggle.checked;

        if (!enabled) {
            const shouldUngroup = confirm(t("confirm_ungroup"));

            if (shouldUngroup) {
                chrome.runtime.sendMessage(
                    { action: "ungroupBookmarkGroups" },
                    (response) => {
                        if (response && response.success) {
                            console.log(`Ungrouped ${response.count} bookmark-based groups`);
                        }
                    },
                );
            }
        }

        await chrome.storage.local.set({ useBookmarkGrouping: enabled });

        if (enabled) {
            chrome.runtime.sendMessage({ action: "regroupTabs" });
        }
    } catch (error) {
        console.error("Error toggling bookmark grouping:", error);
    }
}

async function loadGroupingRules() {
    try {
        const { groupingRules: rules = [] } =
            await chrome.storage.local.get("groupingRules");
        groupingRules = rules;
        displayRules();
    } catch (error) {
        console.error("Error loading grouping rules:", error);
        groupingRules = [];
    }
}

function displayRules() {
    if (!rulesList) return;

    rulesList.innerHTML = "";

    if (groupingRules.length === 0) {
        rulesList.innerHTML = `<p class="no-rules">${t("no_rules")}</p>`;
        return;
    }

    groupingRules.forEach((rule, index) => {
        const ruleCard = createRuleCard(rule, index);
        rulesList.appendChild(ruleCard);
    });
}

function createRuleCard(rule, index) {
    const card = document.createElement("div");
    card.className = `rule-card ${rule.enabled ? "enabled" : "disabled"}`;

    const info = document.createElement("div");
    info.className = "rule-info";

    const header = document.createElement("div");
    header.className = "rule-header";

    const toggle = document.createElement("input");
    toggle.type = "checkbox";
    toggle.className = "rule-toggle";
    toggle.checked = rule.enabled;
    toggle.onchange = () => toggleRule(index);

    const name = document.createElement("span");
    name.className = "rule-name";
    name.textContent = rule.groupName;

    const colorIndicator = document.createElement("div");
    colorIndicator.className = "rule-color";
    colorIndicator.innerHTML = getColorIndicator(rule.color);

    header.appendChild(toggle);
    header.appendChild(name);
    header.appendChild(colorIndicator);

    const condition = document.createElement("div");
    condition.className = "rule-condition";
    condition.textContent = `${getMatchTypeLabel(rule.matchType)}: "${rule.keyword}"`;

    info.appendChild(header);
    info.appendChild(condition);

    const actions = document.createElement("div");
    actions.className = "rule-actions";

    const editBtn = document.createElement("button");
    editBtn.className = "btn-icon";
    editBtn.textContent = "✏️";
    editBtn.title = "Edit";
    editBtn.onclick = () => editRule(index);

    const deleteBtn = document.createElement("button");
    deleteBtn.className = "btn-icon";
    deleteBtn.textContent = "🗑️";
    deleteBtn.title = "Delete";
    deleteBtn.onclick = () => deleteRule(index);

    actions.appendChild(editBtn);
    actions.appendChild(deleteBtn);

    card.appendChild(info);
    card.appendChild(actions);

    return card;
}

function getMatchTypeLabel(matchType) {
    const keys = {
        title: "match_title",
        url: "match_url",
        domain: "match_domain",
    };
    return t(keys[matchType] || matchType);
}

function getColorIndicator(color) {
    const colors = {
        grey: "#9AA0A6",
        blue: "#4285F4",
        red: "#EA4335",
        yellow: "#FBBC04",
        green: "#34A853",
        pink: "#F439A0",
        purple: "#A142F4",
        cyan: "#24C1E0",
        orange: "#FA903E",
    };
    const bgColor = colors[color] || colors.grey;
    return `<span class="color-indicator" style="background-color: ${bgColor};"></span>`;
}

async function toggleRule(index) {
    groupingRules[index].enabled = !groupingRules[index].enabled;
    await saveGroupingRules();
    displayRules();
    chrome.runtime.sendMessage({ action: "regroupTabs" });
}

function editRule(index) {
    editingRuleIndex = index;
    const rule = groupingRules[index];

    document.getElementById("modalTitle").textContent = t("modal_edit_title");
    ruleGroupNameInput.value = rule.groupName;
    ruleKeywordInput.value = rule.keyword;
    ruleEnabledCheckbox.checked = rule.enabled;
    selectedColor = rule.color;

    document.querySelector(
        `input[name="matchType"][value="${rule.matchType}"]`,
    ).checked = true;

    document.querySelectorAll(".color-btn").forEach((btn) => {
        btn.classList.toggle("selected", btn.dataset.color === selectedColor);
    });

    ruleModal.classList.remove("hidden");
}

async function deleteRule(index) {
    if (!confirm(t("confirm_delete_rule"))) return;

    groupingRules.splice(index, 1);
    await saveGroupingRules();
    displayRules();
    chrome.runtime.sendMessage({ action: "regroupTabs" });
}

async function saveGroupingRules() {
    try {
        await chrome.storage.local.set({ groupingRules });
    } catch (error) {
        console.error("Error saving grouping rules:", error);
    }
}

// ========================================
// TAB NAVIGATION
// ========================================

function setupTabNavigation() {
    const tabBtns = document.querySelectorAll(".tab-btn");
    const tabContents = document.querySelectorAll(".tab-content");

    tabBtns.forEach((btn) => {
        btn.addEventListener("click", () => {
            const tabName = btn.dataset.tab;

            tabBtns.forEach((b) => b.classList.remove("active"));
            tabContents.forEach((c) => c.classList.remove("active"));

            btn.classList.add("active");
            document.getElementById(`${tabName}Tab`).classList.add("active");

            if (tabName === "rules") {
                displayRules();
            }
        });
    });
}

// ========================================
// RULES EVENT LISTENERS
// ========================================

function setupRulesEventListeners() {
    if (triggerGroupingBtn) {
        triggerGroupingBtn.addEventListener("click", triggerManualGrouping);
    }

    const bookmarkToggle = document.getElementById("bookmarkGroupingToggle");
    if (bookmarkToggle) {
        bookmarkToggle.addEventListener("change", toggleBookmarkGrouping);
    }

    if (addRuleBtn) {
        addRuleBtn.addEventListener("click", () => {
            editingRuleIndex = -1;
            document.getElementById("modalTitle").textContent = t("modal_new_title");
            ruleGroupNameInput.value = "";
            ruleKeywordInput.value = "";
            ruleEnabledCheckbox.checked = true;
            selectedColor = "blue";

            document.querySelector(
                'input[name="matchType"][value="title"]',
            ).checked = true;

            document.querySelectorAll(".color-btn").forEach((btn) => {
                btn.classList.toggle("selected", btn.dataset.color === "blue");
            });

            ruleModal.classList.remove("hidden");
        });
    }

    if (saveRuleBtn) {
        saveRuleBtn.addEventListener("click", saveRule);
    }

    if (cancelRuleBtn) {
        cancelRuleBtn.addEventListener("click", () => {
            ruleModal.classList.add("hidden");
        });
    }

    document.querySelectorAll(".color-btn").forEach((btn) => {
        btn.addEventListener("click", () => {
            selectedColor = btn.dataset.color;
            document.querySelectorAll(".color-btn").forEach((b) => b.classList.remove("selected"));
            btn.classList.add("selected");
        });
    });
}

async function saveRule() {
    const groupName = ruleGroupNameInput.value.trim();
    const keyword = ruleKeywordInput.value.trim();
    const matchType = document.querySelector('input[name="matchType"]:checked').value;
    const enabled = ruleEnabledCheckbox.checked;

    if (!groupName || !keyword) {
        alert(t("alert_fill_fields"));
        return;
    }

    const rule = {
        groupName,
        keyword,
        matchType,
        color: selectedColor,
        enabled,
        createdAt: Date.now(),
    };

    if (editingRuleIndex >= 0) {
        groupingRules[editingRuleIndex] = { ...groupingRules[editingRuleIndex], ...rule };
    } else {
        groupingRules.push(rule);
    }

    await saveGroupingRules();
    displayRules();
    ruleModal.classList.add("hidden");
    chrome.runtime.sendMessage({ action: "regroupTabs" });
}

// ========================================
// ENTRY POINT
// ========================================

init();
setupRulesEventListeners();
