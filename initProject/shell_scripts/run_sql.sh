#!/usr/bin/env bash

USER="$1"
DB="$2"
SQLFILE="$3"

if [[ -z $USER ]] || [[ -z $DB ]] || [[ -z $SQLFILE ]]; then
	echo "Ha pasado un error en \"shell_scripts/run.sql\"."
else
    psql -U $USER -d $DB -f $SQLFILE
fi
