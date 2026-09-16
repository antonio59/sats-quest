#!/bin/sh
# Assemble the publishable site into dist/ for Cloudflare Pages.
# Pages Functions live at <output>/functions and _headers at the output root.
set -e

rm -rf dist
mkdir -p dist
cp index.html style.css _headers dist/
cp -r src dist/
cp -r functions dist/

echo "Built dist/:"
find dist -type f | sort
