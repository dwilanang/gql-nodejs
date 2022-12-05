#!/usr/bin/env sh
# don't modify this, but modify run-pre-push.sh instead
# we split it this way so that there's no need to reinstall the hooks if we change the hooks processes
while read -r LOCAL_REF LOCAL_SHA REMOTE_REF REMOTE_SHA
do
  LOCAL_REF="$LOCAL_REF" LOCAL_SHA="$LOCAL_SHA" REMOTE_REF="$REMOTE_REF" REMOTE_SHA="$REMOTE_SHA" make pre-push
done