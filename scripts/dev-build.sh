#!/bin/bash

# Quick Development Build
# Use this for local testing without creating a zip file

set -e

echo "🔧 Quick dev build..."

# Clean and create dist
rm -rf dist
mkdir -p dist

# Copy files
cp manifest.json background.js popup.html popup.js styles.css dist/
cp icon*.png dist/ 2>/dev/null || true

echo "✅ Dev build ready in dist/"
echo "💡 Load 'dist' folder in chrome://extensions/"
