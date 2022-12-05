#!/usr/bin/env sh

if [ -n "$SKIP_PRE_COMMIT" ]; then
  echo "✔️ Skipping pre-commit because env var SKIP_PRE_COMMIT exists and not-empty"
  exit 0
fi

CHANGED_FILES=$(git diff HEAD --name-only | egrep '\.js$')

if [ -z "$CHANGED_JS_FILES" ]; then

  echo "✌️ No files changed ✌️"

else
  echo "🔎 Linting"
  if ! make lint; then
    echo "⛔ Code not clean, linting failed"
    exit 1
  fi
  echo "✔️ Lint OK"

fi

echo "✔️ Pre-Commit OK"
exit 0