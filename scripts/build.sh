#!/bin/bash

# Chrome Extension Build Script
# Builds and packages the extension for upload to Chrome Web Store

set -e  # Exit on error

echo "🔨 Building Smart Tab Memory Extension..."

# Clean previous build
if [ -d "dist" ]; then
    echo "📦 Cleaning previous build..."
    rm -rf dist
fi

# Create dist directory
echo "📁 Creating dist directory..."
mkdir -p dist

# Copy required files
echo "📋 Copying extension files..."
cp manifest.json dist/
cp background.js dist/
cp popup.html dist/
cp popup.js dist/
cp styles.css dist/
cp icon*.png dist/ 2>/dev/null || echo "⚠️  Warning: No icon files found"

# Create zip file
echo "📦 Creating extension package..."
cd dist
ZIP_NAME="chrome-tabs-extension-v$(date +%Y%m%d-%H%M%S).zip"
zip -r "../$ZIP_NAME" ./* -x "*.DS_Store"
cd ..

echo "✅ Build complete!"
echo "📦 Package: $ZIP_NAME"
echo "📊 Package size: $(du -h "$ZIP_NAME" | cut -f1)"
echo ""
echo "🚀 Ready to upload to Chrome Web Store!"
echo "   Upload at: https://chrome.google.com/webstore/devconsole"
