#!/usr/bin/env bash

UUID="$1"

if [[ -z $UUID ]]; then
	echo "Provide an uuid. e.g."
	echo 
	echo "bash delete_user.sh uuid"
else
	curl -X DELETE http://localhost:5000/users/$UUID | json_pp
fi