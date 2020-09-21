#!/usr/bin/env bash

UUID="$1"
NEW_USER="$2"

if [[ -z $UUID ]] || [[ -z $NEW_USER ]]; then
	echo "Provide an user and an uuid. e.g."
	echo 
	echo "bash put_user.sh uuid newUser"
else
	curl -X PUT -d "uuid=$UUID&newUser=$NEW_USER" http://localhost:5000/users | json_pp 
	echo
fi