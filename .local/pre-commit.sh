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

coverageMin=$(grep -r "functions" ./package.json | awk '{print substr($0,length($0)-1,2)}')
coverageCur=$(echo $($(echo npm run coverage) | grep 'Total Coverage' | awk '{print substr($4, 2, length($4)-1)}'))
if (( ${coverageCur%%.*} < ${coverageMin%%.*} || ( ${coverageCur%%.*} == ${coverageMin%%.*} && ${coverageCur##*.} < ${coverageMin##*.} ) )) ; then
  echo "Unit Test Coverage ${coverageCur} < ${coverageMin}"
  exit 1
fi
echo "Unit Test Coverage ${coverageCur} > ${coverageMin}"

echo "Pre-Commit OK"
exit 0