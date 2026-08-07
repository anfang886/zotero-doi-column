#!/usr/bin/env bash
# Package the plugin as an installable .xpi
set -euo pipefail

cd "$(dirname "$0")"

NAME="doi-column"
OUT="build/${NAME}.xpi"

rm -rf build
mkdir -p build

# zip from inside the source dir so manifest.json sits at the archive root
zip -r -FS "${OUT}" \
  manifest.json \
  bootstrap.js \
  README.md \
  LICENSE \
  -x '*.DS_Store' > /dev/null

echo "built ${OUT}"
