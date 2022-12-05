#!/usr/bin/env sh

if [[ ! $(node -v) ]]; then
    echo "Node does not exist"
    exit 1
fi

echo "check available eslint"
if ! command -v ./node_modules/.bin/eslint &> /dev/null
then
    echo "install eslint"
    npm install eslint --save-dev
fi
echo "eslint [OK]"

echo "init GIT hooks"
FILE_PRE_COMMIT=./.git/hooks/pre-commit
if ! test -f "$FILE_PRE_COMMIT"; then
    chmod +x ./.github/pre-commit.sh
    cp ./.github/pre-commit.sh $FILE_PRE_COMMIT
fi

echo "GIT hooks [OK]"

echo "run command \"make service up\" start service"
echo "------------------Happy Coding!!!------------------"
exit 0