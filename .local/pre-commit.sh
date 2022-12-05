#!/usr/bin/env sh

if [ -n "$SKIP_PRE_COMMIT" ]; then
  echo "Skipping pre-commit"
  exit 0
fi

files=$(git diff --cached --name-only --diff-filter=ACM | grep "\.(js|yml|graphql|json)$")
if [ "$files" != "" ]; then
  if ! make lint; then
      echo "Code not clean, linting failed"
    exit 1
  fi
fi

echo "✔️"
exit 0