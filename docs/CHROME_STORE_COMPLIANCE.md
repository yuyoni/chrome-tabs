# Chrome Web Store - Compliance Documentation

## Extension Information

**Name:** Smart Tab Manager
**Contact:** yuyeon116@gmail.com
**Main Functionality:** Intelligent tab organization and browsing history search
**Target Users:** Productivity users, developers, students, researchers, and anyone managing multiple browser tabs

---

## 1. Single Purpose Description

This extension provides intelligent tab management and organization. It automatically groups browser tabs based on custom rules, bookmark folders, or website domains, and allows users to search their browsing history to quickly find and restore previously visited pages. All processing happens locally in the user's browser with no external data transmission.

---

## 2. Permission Justifications

### **tabs**

**Why needed:** Required to read tab information (title, URL, domain) for automatic grouping and to track visited pages in browsing history. This permission allows the extension to query open tabs, detect when new tabs are created or closed, and organize them into logical groups.

### **tabGroups**

**Why needed:** Essential for creating, updating, and managing Chrome's native tab groups. This permission enables the extension to automatically group tabs by custom rules, bookmark folders, or domains, and assign colors and names to these groups for better visual organization.

### **storage**

**Why needed:** Used to store user preferences (custom grouping rules, settings) and browsing history (up to 1,000 tab entries) locally on the user's device. This enables the extension to remember user configurations and provide searchable browsing history across browser sessions.

### **bookmarks**

**Why needed:** Allows reading the user's bookmark folder structure to enable bookmark-based tab grouping. When enabled by the user, tabs matching bookmarked URLs are automatically grouped according to their bookmark folder organization. This permission only reads bookmark data and never modifies it.

---

## 3. Remote Code Usage Statement

**This extension does NOT use any remote code.**

Specifically:

- ✅ No external scripts are loaded or executed
- ✅ No `eval()` or similar dynamic code execution
- ✅ No remote code injection of any kind
- ✅ All JavaScript code is bundled within the extension package
- ✅ No CDN dependencies or external resources
- ✅ 100% static code that can be fully reviewed during submission

All functionality is implemented using vanilla JavaScript included in the extension files (background.js, popup.js) with no runtime code fetching or execution.

---

## 4. Data Collection and Privacy Statement

### What data is accessed:

- **Tab information:** Title, URL, domain, and timestamp of visited pages
- **Bookmark data:** Bookmark folder names and URLs (read-only, when feature is enabled)
- **User preferences:** Custom grouping rules and settings

### Privacy guarantees:

- ✅ **No personal data is collected** - The extension does not access or collect any personally identifiable information
- ✅ **No external data transmission** - All data remains stored locally in the user's browser using Chrome's storage API
- ✅ **No analytics or tracking** - The extension does not send any usage data, analytics, or telemetry to external servers
- ✅ **No third-party services** - The extension operates entirely offline with no network requests
- ✅ **Local processing only** - All tab grouping, search, and organization happens locally on the user's device

### Data storage:

- All data is stored using `chrome.storage.local` API (local to the user's browser)
- Maximum 1,000 browsing history entries (configurable)
- Users can clear all stored data at any time via the "Clear History" button
- Data is never synchronized to external servers or cloud services

---

## 5. Privacy Policy

**Effective Date:** March 31, 2026
**Last Updated:** March 31, 2026

### Information Collection and Use

Smart Tab Manager ("the Extension") does NOT collect, store, or transmit any personal information to external servers. All data processing occurs locally within your browser.

### Data Stored Locally

The Extension stores the following data locally on your device using Chrome's `chrome.storage.local` API:

1. **Browsing History:** Tab titles, URLs, domains, and timestamps (maximum 1,000 entries)
2. **User Preferences:** Custom grouping rules, color selections, and feature settings
3. **Temporary Cache:** Bookmark folder mappings (cached for 1 minute, then cleared)

### Data Access

The Extension accesses:

- **Tab Information:** To organize and group your open tabs
- **Bookmark Data:** To enable bookmark-based grouping (only when you enable this feature)

This data is ONLY accessed to provide the extension's core functionality and is NEVER transmitted outside your browser.

### Data Sharing

We do NOT:

- Collect personal information
- Send data to external servers
- Share data with third parties
- Use analytics or tracking tools
- Sync data to cloud services

### Data Retention

- Browsing history is stored locally until you clear it using the "Clear History" button
- Custom rules and settings persist until you uninstall the extension or manually delete them
- Bookmark cache is automatically cleared after 1 minute

### Data Security

All data remains within Chrome's secure storage system on your local device. The Extension uses Chrome's built-in security features and does not introduce additional security risks.

### User Control

You have full control over your data:

- Clear browsing history at any time via the "Clear History" button
- Delete custom rules individually or all at once
- Disable bookmark grouping to prevent bookmark access
- Uninstall the extension to remove all stored data

### Changes to This Policy

Any changes to this privacy policy will be posted here and will apply only to data collected after the effective date of the change.

### Contact

For questions or concerns about this privacy policy, please contact:
**Email:** yuyeon116@gmail.com

### Summary

Smart Tab Manager is a privacy-first extension that:

- ✅ Processes all data locally in your browser
- ✅ Never sends data to external servers
- ✅ Does not collect personal information
- ✅ Gives you full control over your data
- ✅ Works completely offline

By using this extension, you acknowledge that all data processing happens locally on your device and no information is transmitted externally.

---

## 6. Additional Compliance Information

### Manifest V3 Compliance

This extension uses Manifest V3, Chrome's latest and most secure extension platform, featuring:

- Service worker architecture (no persistent background pages)
- Event-driven operation (only active when needed)
- Minimal memory footprint (2-10 MB typical usage)

### Content Security Policy

The extension adheres to strict Content Security Policy:

- No inline scripts
- No unsafe-eval
- No external resources
- All code statically bundled

### Minimal Permissions

The extension requests only the minimum permissions necessary for its core functionality. No broad permissions like "all websites" or "browsing history API" are requested.

### Open Development

- Transparent code that can be audited during review
- No obfuscation or minification (readable source)
- Clear, documented functionality

---

## 7. Review Notes for Chrome Web Store Team

**Key Points:**

1. This is a productivity tool for tab management - single, clear purpose
2. All four permissions are essential and directly support the core functionality
3. Zero data leaves the user's browser - completely local processing
4. No remote code, no external dependencies, no network requests
5. Privacy-first design with user data control
6. Manifest V3 compliant with modern security standards

**Testing Instructions:**

1. Install the extension in Chrome
2. Open 10+ tabs to trigger auto-grouping
3. Press Alt+S to open search popup
4. Create custom rules in ⚙️ Rules tab
5. Enable bookmark grouping toggle
6. Verify all operations complete without network activity (check DevTools Network tab)
7. Check chrome://extensions to verify permissions match manifest

**No violations of:**

- User data policy (no collection/transmission)
- Deceptive behavior (clear, honest functionality)
- Spam policy (genuine utility, not malware)
- Single purpose policy (focused on tab management)
- Minimum permissions policy (only essential permissions)

---

**Declaration:** This extension complies with all Chrome Web Store Developer Program Policies as of March 2026.

**Developer Contact:** yuyeon116@gmail.com
