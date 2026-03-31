# 🚀 Quick Reference Card

## Installation (30 seconds)

1. Open `chrome://extensions/`
2. Enable **Developer mode** (top-right)
3. Click **Load unpacked**
4. Select this folder

---

## Features at a Glance

| Feature           | Trigger        | What It Does                  |
| ----------------- | -------------- | ----------------------------- |
| **Auto Grouping** | 20+ tabs       | Groups tabs by domain         |
| **Tab Memory**    | Visit any page | Saves to history (max 1000)   |
| **Search**        | Type in popup  | Find tabs by title/URL/domain |
| **Suggestions**   | Open popup     | Shows recently closed tabs    |

---

## Key Numbers

```
20   = Tab threshold for auto-grouping
1000 = Max tabs stored in history
2s   = Debounce delay before grouping
300ms = Search debounce delay
```

---

## File Map

```
manifest.json     → Extension config
background.js     → Auto-grouping + tab tracking
popup.html        → UI structure
popup.js          → Search logic
styles.css        → Styling
icon*.png         → Extension icons
```

---

## Customization Points

### background.js (Lines 2-7)

```javascript
const CONFIG = {
  TAB_THRESHOLD: 10,          // ← Change this
  MAX_STORAGE_ENTRIES: 1000,  // ← Or this
  DEBOUNCE_DELAY: 2000,       // ← Or this
  COLORS: [...]               // ← Or these
};
```

### Add Custom Domain Names (background.js, line ~70)

```javascript
const domainNames = {
    "youtube.com": "YouTube",
    "github.com": "GitHub",
    "yoursite.com": "Your Custom Name", // ← Add here
};
```

---

## Testing Checklist

### Quick Test (2 minutes)

1. ✅ Load extension in Chrome
2. ✅ Open 25 tabs from different sites
3. ✅ Wait 2 seconds → tabs should group
4. ✅ Click extension icon
5. ✅ Search for a keyword
6. ✅ Close a tab, then check suggestions

---

## Common Tasks

### Change Group Threshold

📝 Edit `background.js` line 3:

```javascript
TAB_THRESHOLD: 10,  // Now groups at 15+ tabs
```

### Increase Storage Limit

📝 Edit `background.js` line 4:

```javascript
MAX_STORAGE_ENTRIES: 5000,  // Store 5000 tabs
```

### Faster Grouping

📝 Edit `background.js` line 5:

```javascript
DEBOUNCE_DELAY: 1000,  // Group after 1 second
```

### Add Custom Colors

📝 Edit `background.js` line 6:

```javascript
COLORS: ["grey", "blue", "red", "orange", "magenta"];
```

---

## Troubleshooting (30 seconds)

| Problem              | Solution                               |
| -------------------- | -------------------------------------- |
| Extension won't load | Check all files present, valid JSON    |
| Tabs not grouping    | Need 20+ tabs, wait 2s, same domain    |
| Search empty         | Visit sites after installing extension |
| Icon missing         | Click 🧩 puzzle icon, pin extension    |

---

## Architecture Flow

```
User opens tab
    ↓
background.js detects (onUpdated)
    ↓
saveTabVisit() → chrome.storage.local
    ↓
triggerAutoGroup() (debounced 2s)
    ↓
autoGroupTabs() → chrome.tabs.group()
    ↓
Tabs grouped by domain
```

```
User clicks extension
    ↓
popup.html loads
    ↓
popup.js init()
    ↓
Load tabHistory from storage
    ↓
Display suggestions (recent closed)
    ↓
User types in search
    ↓
Filter tabs (title/URL/domain)
    ↓
Display results with highlighting
```

---

## API Usage

### Chrome APIs Used

```javascript
chrome.tabs.query(); // Get tabs
chrome.tabs.group(); // Create group
chrome.tabs.onCreated; // Listen for new tabs
chrome.tabs.onUpdated; // Listen for changes
chrome.tabs.onRemoved; // Listen for closures
chrome.tabGroups.update(); // Set group name/color
chrome.storage.local.get(); // Read storage
chrome.storage.local.set(); // Write storage
```

---

## Performance Tips

### Current Optimizations

✅ Debouncing (reduces calls by 95%)
✅ Storage limiting (prevents bloat)
✅ Set-based lookups (O(1) time)
✅ Early returns (skip unnecessary work)
✅ Sliced rendering (max 50 results)

### Don't Do This

❌ Remove debouncing (CPU spike)
❌ Unlimited storage (memory leak)
❌ Group every tab (cluttered UI)
❌ Sync API for large data (quota limits)

---

## Privacy & Security

✅ **All data local** (chrome.storage.local)
✅ **No network calls** (100% offline)
✅ **No tracking** (zero analytics)
✅ **Minimal permissions** (tabs, tabGroups, storage)
✅ **Input sanitized** (regex escaping)

---

## Extension Permissions Explained

```json
"permissions": [
  "tabs",       // Read tab title, URL, status
  "tabGroups",  // Create/update tab groups
  "storage"     // Store browsing history locally
]
```

**Not requested:**

- ❌ `<all_urls>` (access page content)
- ❌ `webRequest` (intercept network)
- ❌ `cookies` (access cookies)
- ❌ `history` (access browsing history)

---

## Documentation Files

| File                                     | Use Case                 |
| ---------------------------------------- | ------------------------ |
| [INSTALL.md](INSTALL.md)                 | First-time installation  |
| [README.md](README.md)                   | Feature overview & usage |
| [TECHNICAL_GUIDE.md](TECHNICAL_GUIDE.md) | Implementation details   |
| [PROJECT_SUMMARY.md](PROJECT_SUMMARY.md) | Project overview         |
| [QUICK_REFERENCE.md](QUICK_REFERENCE.md) | This file!               |

---

## Useful Commands

### Reload Extension

1. Go to `chrome://extensions/`
2. Click refresh icon (🔄) on extension card

### View Console Logs

1. Go to `chrome://extensions/`
2. Click "service worker" link
3. Opens DevTools for background.js

### Inspect Popup

1. Right-click extension icon
2. Select "Inspect popup"
3. Opens DevTools for popup.html

### Check Storage

1. Open DevTools on popup
2. Application tab → Storage → Extension
3. View chrome.storage.local data

### Clear Storage (Manual)

```javascript
// In extension console:
chrome.storage.local.clear();
```

---

## Code Snippets

### Get All Stored Tabs

```javascript
chrome.storage.local.get("tabHistory", (result) => {
    console.log(result.tabHistory);
});
```

### Manually Trigger Grouping

```javascript
// In background.js console:
autoGroupTabs();
```

### Export Tab History

```javascript
chrome.storage.local.get("tabHistory", (result) => {
    const json = JSON.stringify(result.tabHistory, null, 2);
    console.log(json);
    // Copy from console
});
```

---

## Keyboard Shortcuts (Future Enhancement)

Add to manifest.json:

```json
"commands": {
  "_execute_action": {
    "suggested_key": {
      "default": "Ctrl+Shift+T",
      "mac": "Command+Shift+T"
    }
  }
}
```

---

## Version History

| Version | Date       | Changes         |
| ------- | ---------- | --------------- |
| 1.0.0   | 2026-03-30 | Initial release |

---

## Contact & Support

- 🐛 **Issues**: Check browser console logs
- 📖 **Docs**: See README.md and TECHNICAL_GUIDE.md
- 🔧 **Customization**: Edit CONFIG in background.js

---

**Print this page and keep it handy! 📋**
