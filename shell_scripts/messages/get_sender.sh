#!/usr/bin/env bash

SENDER_UUID="$1"

if [[ -z  $SENDER_UUID ]]; then
	echo "Incluya el UUID en la URL para retornar todos los mensajes enviados por el usuario."	
	echo
	echo "bash get_sender.sh uuid"
else
	curl http://localhost:5000/messages/sender/$SENDER_UUID | json_pp
fi