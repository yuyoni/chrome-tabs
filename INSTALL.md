# Quick Installation Guide

## 📦 Loading the Extension in Chrome

### Step 1: Open Chrome Extensions Page

1. Open Google Chrome
2. Navigate to: `chrome://extensions/`
    - Or click the menu (⋮) → **Extensions** → **Manage Extensions**

### Step 2: Enable Developer Mode

- In the top-right corner, toggle **"Developer mode"** ON
- This enables the "Load unpacked" button

### Step 3: Load the Extension

1. Click the **"Load unpacked"** button
2. Navigate to and select this folder:
    ```
    /Users/yuyeon/Desktop/projects/chrome-tabs
    ```
3. Click **"Select"** (or **"Open"**)

### Step 4: Verify Installation

- The extension should appear in your extensions list
- Look for **"Smart Tab Memory"** with the 🧠 icon
- The icon should appear in your Chrome toolbar
- If not visible, click the puzzle piece (🧩) icon and pin it

---

## 🚀 Quick Test

### Test Auto Grouping

1. Open 25+ tabs from different websites
    - Try: 3 YouTube tabs, 3 GitHub tabs, etc.
2. Wait 2 seconds
3. Tabs should automatically group by domain
4. Groups will be named (e.g., "YouTube", "GitHub")

### Test Search Feature

1. Click the 🧠 extension icon
2. Type in the search bar:
    - Search by title: "tutorial"
    - Search by URL: "github.com"
    - Search by domain: "youtube"
3. Click **"Open"** to reopen any tab

### Test Tab Memory

1. Browse some websites
2. Close a few tabs
3. Open the extension popup
4. See "Recently Closed" suggestions
5. Click "Open" to restore them

---

## 🛠️ Troubleshooting

### Extension Not Loading

- **Error: manifest.json not found**
    - Make sure you selected the correct folder
    - Verify all files exist (manifest.json, background.js, popup.html, etc.)

- **Error: manifest.json parsing failed**
    - Check for JSON syntax errors
    - Verify file encoding is UTF-8

### Extension Icon Not Showing

- Click the puzzle piece (🧩) in the toolbar
- Find "Smart Tab Memory"
- Click the pin icon to keep it visible

### Tabs Not Grouping

- Need 20+ tabs to trigger auto-grouping
- Wait 2 seconds after opening tabs (debounce delay)
- Pinned tabs are excluded
- Need 2+ tabs from the same domain

### Search Not Finding Tabs

- Tabs must be visited **after** extension is installed
- Visit some websites, then try searching
- Chrome:// URLs are excluded (internal Chrome pages)

### Want Better Icons?

1. Open `create_icons.html` in your browser
2. Three icon files will auto-download
3. Replace the existing icon\*.png files
4. Reload the extension (click refresh icon in chrome://extensions)

---

## 🎯 Next Steps

1. **Read the README.md** for full feature documentation
2. **Check TECHNICAL_GUIDE.md** for implementation details
3. **Customize** the extension:
    - Change `TAB_THRESHOLD` in background.js (default: 20)
    - Change `MAX_STORAGE_ENTRIES` in background.js (default: 1000)
    - Modify colors in styles.css

---

## 📝 Files Checklist

Verify these files exist:

- ✅ manifest.json (extension config)
- ✅ background.js (auto-grouping logic)
- ✅ popup.html (UI structure)
- ✅ popup.js (search logic)
- ✅ styles.css (styling)
- ✅ icon16.png (small icon)
- ✅ icon48.png (medium icon)
- ✅ icon128.png (large icon)

Optional:

- 📄 README.md (documentation)
- 📄 TECHNICAL_GUIDE.md (implementation details)
- 📄 INSTALL.md (this file)

---

## 🔗 Useful Chrome URLs

- Extensions page: `chrome://extensions/`
- Extension errors: Click "Errors" button on extension card
- Service worker console: Click "service worker" link
- Storage inspector: DevTools → Application → Storage → Extension

---

**You're all set! Enjoy smarter tab management! 🎉**
