#!/usr/bin/bash

SENDER_UUID="$1"
RECEIVER_UUID="$2"

if [[ -z $SENDER_UUID ]] || [[ -z $RECEIVER_UUID ]]; then
	echo "Incluya los UUID en la URL para retornar todos los mensajes enviados por el usuario."
	echo
	echo "bash get_sender_receiver.sh sender_uuid receiver_uuid"
else
	curl http://localhost:5000/messages/sender_receiver/"$SENDER_UUID&$RECEIVER_UUID" | json_pp
fi