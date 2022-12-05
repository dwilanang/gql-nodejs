#!/usr/bin/env sh

if [ -n "$SKIP_PRE_PUSH" ]; then
  echo "Skipping pre-push"
  exit 0
fi

convertRefToBranch() {
  git rev-parse --abbrev-ref "$1"
}

PROTECTED_BRANCHES="master;main" # separate with semicolon

REMOTE_BRANCH_NAME=$( convertRefToBranch "$REMOTE_REF" )
LOCAL_BRANCH_NAME=$( convertRefToBranch "$LOCAL_REF" )

# handle `git push` command without specifying local/remote branch name
if [ -z "$LOCAL_BRANCH_NAME" ]; then
  LOCAL_BRANCH_NAME=$( convertRefToBranch HEAD )
fi
if [ -z "$REMOTE_BRANCH_NAME" ]; then
  REMOTE_BRANCH_NAME=$( convertRefToBranch HEAD )
fi

printf "Trying to push from local '%s' to remote '%s'\n" "$LOCAL_BRANCH_NAME" "$REMOTE_BRANCH_NAME"

if echo "$PROTECTED_BRANCHES" | grep -q "$REMOTE_BRANCH_NAME"; then
  printf "Branch '%s' is protected!\n" "$REMOTE_BRANCH_NAME"
  echo "If you really want to push to protected branch, then push with SKIP_PRE_PUSH env var defined i.e."
  printf "run command: SKIP_PRE_PUSH=1 git push origin %s:%s\n" "$LOCAL_BRANCH_NAME" "$REMOTE_BRANCH_NAME"
  exit 1
fi

echo "Pre-Push OK"
exit 0