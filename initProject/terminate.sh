#!/usr/bin/env bash

USER="$1"
DB="$2"

if [[ -z $USER ]] || [[ -z $DB ]]; then
	echo "Debe de dar el nombre de la base de datos y el usuario de esta. Para más ayuda ejecute el archivo \"help.sh\" de este direcotrio."
	echo
	echo "bash terminate.sh <Owner> <Name>"
else
	/bin/bash initProject/shell_scripts/run_sql.sh $USER $DB initProject/sql/drop_user_table.sql
	/bin/bash initProject/shell_scripts/run_sql.sh $USER $DB initProject/sql/drop_message_table.sql
fi
