// DOM Elements
const searchInput = document.getElementById('searchInput');
const resultsList = document.getElementById('resultsList');
const suggestionsList = document.getElementById('suggestionsList');
const resultCount = document.getElementById('resultCount');
const clearHistoryBtn = document.getElementById('clearHistory');
const emptyState = document.getElementById('emptyState');
const resultsSection = document.getElementById('resultsSection');
const suggestionsSection = document.getElementById('suggestionsSection');

let tabHistory = [];

// Initialize
async function init() {
  await loadTabHistory();
  displaySuggestions();
  setupEventListeners();
}

// Load tab history from storage
async function loadTabHistory() {
  try {
    const { tabHistory: history = [] } = await chrome.storage.local.get('tabHistory');
    tabHistory = history;
  } catch (error) {
    console.error('Error loading tab history:', error);
    tabHistory = [];
  }
}

// Setup event listeners
function setupEventListeners() {
  searchInput.addEventListener('input', debounce(handleSearch, 300));
  clearHistoryBtn.addEventListener('click', handleClearHistory);
}

// Debounce helper
function debounce(func, delay) {
  let timeout;
  return function (...args) {
    clearTimeout(timeout);
    timeout = setTimeout(() => func.apply(this, args), delay);
  };
}

// Handle search
async function handleSearch() {
  const query = searchInput.value.trim().toLowerCase();

  if (!query) {
    displaySuggestions();
    return;
  }

  // Filter tabs by query
  const filteredTabs = tabHistory.filter(tab => {
    const titleMatch = tab.title.toLowerCase().includes(query);
    const urlMatch = tab.url.toLowerCase().includes(query);
    const domainMatch = tab.domain && tab.domain.toLowerCase().includes(query);
    return titleMatch || urlMatch || domainMatch;
  });

  // Get currently open tabs to check status
  const openTabs = await chrome.tabs.query({});
  const openTabsMap = new Map(openTabs.map(tab => [tab.url, tab]));

  displayResults(filteredTabs, query, openTabsMap);
}

// Display suggestions (recently closed tabs)
async function displaySuggestions() {
  suggestionsSection.style.display = 'block';
  resultsSection.style.display = 'none';

  if (tabHistory.length === 0) {
    emptyState.style.display = 'flex';
    suggestionsSection.style.display = 'none';
    return;
  }

  emptyState.style.display = 'none';

  // Get current open tabs
  const openTabs = await chrome.tabs.query({});
  const openTabsMap = new Map(openTabs.map(tab => [tab.url, tab]));

  // Filter out currently open tabs and get recent 10
  const recentClosed = tabHistory
    .filter(tab => !openTabsMap.has(tab.url))
    .slice(0, 10);

  suggestionsList.innerHTML = '';

  if (recentClosed.length === 0) {
    suggestionsList.innerHTML = '<p class="no-results">All recent tabs are currently open</p>';
    return;
  }

  recentClosed.forEach(tab => {
    const tabCard = createTabCard(tab, false, '', openTabsMap);
    suggestionsList.appendChild(tabCard);
  });

  resultCount.textContent = `${tabHistory.length} tabs in history`;
}

// Display search results
function displayResults(filteredTabs, query, openTabsMap) {
  suggestionsSection.style.display = 'none';
  resultsSection.style.display = 'block';
  emptyState.style.display = 'none';

  resultsList.innerHTML = '';
  resultCount.textContent = `${filteredTabs.length} result${filteredTabs.length !== 1 ? 's' : ''}`;

  if (filteredTabs.length === 0) {
    resultsList.innerHTML = '<p class="no-results">No tabs match your search</p>';
    return;
  }

  filteredTabs.slice(0, 50).forEach(tab => {
    const tabCard = createTabCard(tab, true, query, openTabsMap);
    resultsList.appendChild(tabCard);
  });
}

// Create tab card element
function createTabCard(tab, highlight = false, query = '', openTabsMap = new Map()) {
  const card = document.createElement('div');

  // Check if tab is currently open
  const openTab = openTabsMap.get(tab.url);
  const isOpen = !!openTab;

  card.className = isOpen ? 'tab-card tab-card-open' : 'tab-card tab-card-closed';

  const info = document.createElement('div');
  info.className = 'tab-info';

  const title = document.createElement('div');
  title.className = 'tab-title';
  title.textContent = tab.title || 'Untitled';

  if (highlight && query) {
    title.innerHTML = highlightText(tab.title || 'Untitled', query);
  }

  const url = document.createElement('div');
  url.className = 'tab-url';
  url.textContent = truncateUrl(tab.url);

  if (highlight && query) {
    url.innerHTML = highlightText(truncateUrl(tab.url), query);
  }

  const statusContainer = document.createElement('div');
  statusContainer.className = 'tab-status';

  if (isOpen) {
    // Currently open tab
    const statusBadge = document.createElement('span');
    statusBadge.className = 'status-badge status-open';
    statusBadge.textContent = '● Open';
    statusContainer.appendChild(statusBadge);
  } else {
    // Closed tab - show when it was closed
    const statusBadge = document.createElement('span');
    statusBadge.className = 'status-badge status-closed';
    statusBadge.textContent = `Closed ${formatTime(tab.timestamp)}`;
    statusContainer.appendChild(statusBadge);
  }

  info.appendChild(title);
  info.appendChild(url);
  info.appendChild(statusContainer);

  const actionBtn = document.createElement('button');
  actionBtn.className = 'btn-reopen';

  if (isOpen) {
    actionBtn.textContent = 'Go';
    actionBtn.onclick = () => switchToTab(openTab.id);
  } else {
    actionBtn.textContent = 'Restore';
    actionBtn.onclick = () => reopenTab(tab.url);
  }

  card.appendChild(info);
  card.appendChild(actionBtn);

  return card;
}

// Highlight matching text
function highlightText(text, query) {
  const regex = new RegExp(`(${escapeRegex(query)})`, 'gi');
  return text.replace(regex, '<mark>$1</mark>');
}

// Escape regex special characters
function escapeRegex(string) {
  return string.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

// Truncate URL for display
function truncateUrl(url) {
  const maxLength = 60;
  if (url.length <= maxLength) return url;
  return url.substring(0, maxLength) + '...';
}

// Format timestamp
function formatTime(timestamp) {
  const now = Date.now();
  const diff = now - timestamp;

  const minutes = Math.floor(diff / 60000);
  const hours = Math.floor(diff / 3600000);
  const days = Math.floor(diff / 86400000);

  if (minutes < 1) return 'Just now';
  if (minutes < 60) return `${minutes}m ago`;
  if (hours < 24) return `${hours}h ago`;
  if (days < 7) return `${days}d ago`;

  const date = new Date(timestamp);
  return date.toLocaleDateString();
}

// Switch to existing tab
function switchToTab(tabId) {
  chrome.tabs.update(tabId, { active: true }, (tab) => {
    // Also switch to the window containing this tab
    chrome.windows.update(tab.windowId, { focused: true });
  });
  window.close();
}

// Reopen closed tab
function reopenTab(url) {
  chrome.tabs.create({ url, active: true });
  window.close();
}

// Clear history
async function handleClearHistory() {
  if (!confirm('Clear all tab history? This cannot be undone.')) {
    return;
  }

  try {
    await chrome.storage.local.set({ tabHistory: [] });
    tabHistory = [];
    displaySuggestions();
  } catch (error) {
    console.error('Error clearing history:', error);
  }
}

// Initialize on load
init();
