#!/usr/bin/env bash

UUID="$1"

if [[ -z $UUID ]]; then
	echo "Incluya el UUID en la URL para retornar todos el mensaje enviado por el usuario."
	echo
	echo "bash get_message.sh uuid"
else
	curl http://localhost:5000/messages/getMessage/$UUID | json_pp
fi