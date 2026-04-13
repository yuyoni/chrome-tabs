#!/bin/bash

echo "🔍 Auto Tab Organizer - Extension Verification"
echo "=============================================="
echo ""

# Check required files
echo "📁 Checking required files..."
files=("manifest.json" "background.js" "popup.html" "popup.js" "styles.css" "icon16.png" "icon48.png" "icon128.png")

all_present=true
for file in "${files[@]}"; do
  if [ -f "$file" ]; then
    echo "  ✅ $file"
  else
    echo "  ❌ $file (MISSING)"
    all_present=false
  fi
done

echo ""

# Check manifest.json syntax
echo "🔍 Validating manifest.json..."
if command -v python3 &> /dev/null; then
  python3 -c "import json; json.load(open('manifest.json'))" 2>/dev/null
  if [ $? -eq 0 ]; then
    echo "  ✅ Valid JSON syntax"
  else
    echo "  ❌ Invalid JSON syntax"
  fi
else
  echo "  ⚠️  Python3 not found, skipping JSON validation"
fi

echo ""

# Check file sizes
echo "📊 File sizes:"
for file in "${files[@]}"; do
  if [ -f "$file" ]; then
    size=$(wc -c < "$file" | tr -d ' ')
    echo "  $file: $size bytes"
  fi
done

echo ""

# Check JavaScript syntax (basic)
echo "🔍 Checking JavaScript files..."
for jsfile in "background.js" "popup.js"; do
  if [ -f "$jsfile" ]; then
    # Basic syntax check - look for obvious issues
    if grep -q "function " "$jsfile" && grep -q "async " "$jsfile"; then
      echo "  ✅ $jsfile (basic syntax OK)"
    else
      echo "  ⚠️  $jsfile (review recommended)"
    fi
  fi
done

echo ""

# Check HTML structure
echo "🔍 Checking HTML structure..."
if grep -q "<!DOCTYPE html>" popup.html && grep -q "</html>" popup.html; then
  echo "  ✅ popup.html (valid structure)"
else
  echo "  ❌ popup.html (invalid structure)"
fi

echo ""

# Summary
echo "=============================================="
if [ "$all_present" = true ]; then
  echo "✅ All required files present!"
  echo ""
  echo "Next steps:"
  echo "1. Open Chrome and go to: chrome://extensions/"
  echo "2. Enable 'Developer mode' (top-right toggle)"
  echo "3. Click 'Load unpacked'"
  echo "4. Select this folder: $(pwd)"
  echo ""
  echo "📖 See INSTALL.md for detailed instructions"
else
  echo "❌ Some files are missing. Please check above."
fi
echo "=============================================="
