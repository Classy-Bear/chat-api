#!/usr/bin/env bash

UUID="$1"

if [[ -z $UUID ]]; then
	echo "Incluya el uuid del mensaje a eliminar."
	echo
	echo "bash delete.sh uuid"
else
	curl -X DELETE http://localhost:5000/messages/$UUID | json_pp
fi