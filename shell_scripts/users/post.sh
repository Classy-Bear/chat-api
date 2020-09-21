#!/usr/bin/env bash

USER="$1"

if [[ -z $USER ]]; then
	echo "Provide a user. e.g."
	echo 
	echo "bash post_user.sh David"
else
	curl --data "user=$USER" http://localhost:5000/users | json_pp 
	echo
fi