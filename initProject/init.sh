#!/usr/bin/env bash

USER="$1"
DB="$2"

if [[ -z $USER ]] || [[ -z $DB ]]; then
	echo "You must give the name of the database and its user."
	echo "For more help read the README.md file."
	echo
	echo "bash init.sh <Owner> <DB Name>"
else
	/bin/bash initProject/run_sql.sh $USER $DB initProject/sql/create_user_table.sql
	/bin/bash initProject/run_sql.sh $USER $DB initProject/sql/create_message_table.sql
fi

