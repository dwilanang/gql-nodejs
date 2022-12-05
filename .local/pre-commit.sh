#!/usr/bin/env sh

PREFIX="pre-commit:"

if [ -n "$SKIP_PRE_COMMIT" ]; then
  echo "Skipping pre-commit"
  exit 0
fi

fileList=$(git diff --diff-filter=d --cached --name-only)
jsFileList=$(echo "$fileList" | grep -E '\.(js)$')
if [ ${#jsFileList} -gt 0 ]; then
    if ! make lint; then
        echo "$PREFIX Lint failed."
        exit 1
    fi
fi

echo "Pre-Commit OK"
exit 0