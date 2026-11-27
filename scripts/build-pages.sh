#!/bin/sh
# Assemble the publishable site into dist/ for Cloudflare Pages.
# Pages Functions live at <output>/functions and _headers at the output root.
set -e

rm -rf dist
mkdir -p dist
cp index.html style.css _headers dist/
cp -r src dist/
cp -r functions dist/

# Inject the app version from package.json as the single source of truth.
node -e '
  const fs = require("fs");
  const { version } = JSON.parse(fs.readFileSync("package.json", "utf8"));
  if (typeof version !== "string" || !version.trim()) {
    console.error("Missing version in package.json");
    process.exit(1);
  }
  fs.writeFileSync(
    "dist/src/version.js",
    "// Generated from package.json by scripts/build-pages.sh\nwindow.APP_VERSION = " + JSON.stringify(version.trim()) + ";\n"
  );
'

echo "Built dist/:"
find dist -type f | sort
