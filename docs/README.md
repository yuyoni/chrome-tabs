# 🧠 Auto Tab Organizer

A production-ready Chrome extension that automatically groups your tabs and lets you search through your browsing history.

## Features

### ✨ Auto Tab Grouping

- Automatically groups tabs when count exceeds 20
- Groups by domain (e.g., YouTube, GitHub, Shopping)
- Smart group naming using domain recognition and title analysis
- Debounced execution for optimal performance
- Color-coded groups for easy identification

### 🔍 Powerful Search

- Search by title, URL, or domain
- Real-time search with highlighting
- Fast local search (no external APIs)
- View up to 1000 recent tabs

### 💡 Smart Suggestions

- Shows recently closed tabs
- Filters out currently open tabs
- Quick reopen with one click

### 📊 Tab Memory System

- Stores title, URL, domain, and timestamp
- Local storage using chrome.storage.local
- Automatic storage size limiting (max 1000 entries)
- Privacy-focused (no chrome:// or extension URLs stored)

### ⌨️ Keyboard Shortcuts

- **Open Search Popup**: `Alt+S` (Search)
- **Manual Tab Grouping**: `Alt+G` (Group)
- **Customize**: Go to `chrome://extensions/shortcuts`

📖 [Full Shortcuts Guide](SHORTCUTS.md)

## Installation

### Method 1: Load Unpacked (Developer Mode)

1. **Open Chrome Extensions Page**
    - Navigate to `chrome://extensions/`
    - Or click Menu (⋮) → Extensions → Manage Extensions

2. **Enable Developer Mode**
    - Toggle "Developer mode" in the top-right corner

3. **Load the Extension**
    - Click "Load unpacked"
    - Select the `chrome-tabs` folder containing these files:
        - manifest.json
        - background.js
        - popup.html
        - popup.js
        - styles.css
        - icon16.png
        - icon48.png
        - icon128.png

4. **Verify Installation**
    - The extension icon (🧠) should appear in your toolbar
    - If not visible, click the puzzle piece icon and pin it

### Method 2: Create Icons (Optional)

The extension includes placeholder icons. For better icons:

1. Open `create_icons.html` in a browser
2. It will auto-download three icon files
3. Replace the existing icon\*.png files

## Usage

### Opening the Extension

- Click the 🧠 icon in your Chrome toolbar
- Or use keyboard shortcut (if configured)

### Searching Tabs

1. Type in the search bar
2. Search by:
    - **Title**: "react tutorial"
    - **URL**: "github.com"
    - **Domain**: "youtube"
3. Click "Open" to reopen any tab

### Auto Grouping

- Automatically activates when you have 20+ tabs
- Groups tabs by domain
- Requires 2+ tabs from the same domain to create a group
- Waits 2 seconds after tab changes before grouping (debounced)

### Clearing History

- Click "Clear History" button in the popup
- Confirms before deletion
- Cannot be undone

## Technical Details

### Manifest V3

Uses the latest Chrome extension standard with:

- Service worker background script
- Declarative permissions
- Modern APIs

### Performance Optimizations

- **Debouncing**: 2-second delay on grouping to prevent excessive CPU usage
- **Storage Limiting**: Max 1000 entries to prevent storage bloat
- **Local-only Processing**: No network requests for grouping
- **Efficient Filtering**: Excludes chrome:// URLs and extensions

### Storage Structure

```javascript
{
  tabHistory: [
    {
      title: "Page Title",
      url: "https://example.com",
      domain: "example.com",
      timestamp: 1234567890000
    },
    ...
  ]
}
```

### Permissions Used

- **tabs**: Access tab information
- **tabGroups**: Create and manage tab groups
- **storage**: Store browsing history locally

## Key Implementation Details

### Auto Grouping Logic

1. Triggers when tab count > 20
2. Groups tabs by domain (min 2 tabs per group)
3. Generates smart group names:
    - Recognizes popular sites (YouTube, GitHub, etc.)
    - Extracts common keywords from titles
    - Falls back to capitalized domain name
4. Assigns colors cyclically
5. Skips already-grouped tabs

### Search Algorithm

- Case-insensitive matching
- Searches across title, URL, and domain
- Highlights matching text
- Limits display to 50 results for performance
- Sorts by most recent first

### Memory Management

- Stores max 1000 tabs (FIFO)
- Saves on tab completion (status === 'complete')
- Excludes internal Chrome URLs
- Removes duplicates by keeping most recent

## Troubleshooting

### Extension Not Working

- Check that you're in Developer Mode
- Refresh the extension page
- Check browser console for errors

### Tabs Not Grouping

- Ensure you have 20+ tabs open
- Wait 2 seconds after opening tabs (debounce delay)
- Check that tabs share the same domain
- Verify tabs aren't pinned (pinned tabs are skipped)

### Search Not Finding Tabs

- Clear and reload the extension
- Check chrome.storage.local in DevTools
- Verify tabs were visited after extension installation

### Storage Full

- Click "Clear History" to free up space
- Extension auto-limits to 1000 entries

## Browser Compatibility

- **Chrome**: Version 88+ (Manifest V3 support)
- **Edge**: Version 88+ (Chromium-based)
- **Opera**: Version 74+
- **Brave**: Latest version

## Privacy

- All data stored locally (chrome.storage.local)
- No external servers or API calls
- No analytics or tracking
- No permissions beyond tabs and storage

## Future Enhancements (Optional)

- [ ] Export/import tab history
- [ ] Custom grouping rules
- [ ] Tag system for tabs
- [ ] Sync across devices (chrome.storage.sync)
- [ ] Keyboard shortcuts
- [ ] Dark mode

## License

MIT License - Feel free to modify and distribute

## Support

For issues or feature requests, check the browser console for errors and verify all files are present.

---

**Enjoy smarter tab management! 🚀**
