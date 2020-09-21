#!/usr/bin/env bash

UUID="$1"

if [[ -z $UUID ]]; then
	echo "Provide an uuid. e.g."
	echo 
	echo "bash get_user.sh uuid"
else
	curl http://localhost:5000/users/$UUID | json_pp 
	echo
fi