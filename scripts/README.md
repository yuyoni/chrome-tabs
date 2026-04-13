# 🛠️ Build Scripts

This folder contains build and development scripts for the Auto Tab Organizer extension.

## 📋 Available Scripts

### `build.sh` - Production Build

Creates a production-ready zip file for Chrome Web Store upload.

**Usage:**

```bash
./scripts/build.sh
# or from project root:
./build
```

**What it does:**

- Cleans previous build
- Creates `dist/` folder
- Copies only necessary files
- Creates timestamped zip file
- Shows package size
- Provides upload link

**Output:**

- `chrome-tabs-extension-v{timestamp}.zip`

---

### `dev-build.sh` - Development Build

Quick build for local testing without creating a zip file.

**Usage:**

```bash
./scripts/dev-build.sh
# or from project root:
./dev
```

**What it does:**

- Cleans and creates `dist/` folder
- Copies all necessary files
- Ready to load in `chrome://extensions`

**How to test:**

1. Run `./dev`
2. Open `chrome://extensions/`
3. Enable "Developer mode"
4. Click "Load unpacked"
5. Select the `dist/` folder

---

### `verify_extension.sh` - Extension Verification

Validates the extension structure and files.

**Usage:**

```bash
./scripts/verify_extension.sh
# or from project root:
./verify
```

**What it checks:**

- Required files exist
- File permissions
- Manifest validity
- No syntax errors

---

## 🚀 Quick Commands

From the project root, you can use these shortcuts:

```bash
# Production build
./build

# Development build
./dev

# Verify extension
./verify
```

## 📁 Build Output

```
chrome-tabs/
├── dist/              # Build output (gitignored)
│   ├── manifest.json
│   ├── background.js
│   ├── popup.html
│   ├── popup.js
│   ├── styles.css
│   └── icon*.png
└── chrome-tabs-extension-v*.zip  # Production package (gitignored)
```

## 🔧 File Permissions

All scripts have execute permissions (`chmod +x`):

- ✅ `scripts/build.sh`
- ✅ `scripts/dev-build.sh`
- ✅ `scripts/verify_extension.sh`
- ✅ `build` (wrapper)
- ✅ `dev` (wrapper)
- ✅ `verify` (wrapper)

## 📝 Notes

- All build outputs are gitignored (`dist/`, `*.zip`)
- Scripts are tracked in git for team collaboration
- Wrapper scripts in root provide convenient shortcuts
- Use `./build` for Chrome Web Store uploads
- Use `./dev` for quick local testing
