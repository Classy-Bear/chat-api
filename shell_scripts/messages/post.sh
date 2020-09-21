#!/usr/bin/env bash

MESSAGE="$1"
SENDER_UUID="$2"
RECEIVER_UUID="$3"

if [[ -z $MESSAGE ]] || [[ -z $SENDER_UUID ]] || [[ -z $RECEIVER_UUID ]]; then
	echo "Make sure you have the following fields: <message>, <sender>, <receiver>."
	echo
	echo "bash post.sh message sender_uuid receiver_uuid"
else
	curl -d "message=$MESSAGE&sender=$SENDER_UUID&receiver=$RECEIVER_UUID" http://localhost:5000/messages | json_pp
fi