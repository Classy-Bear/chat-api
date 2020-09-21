#!/usr/bin/env bash

SQLFILE="$1"

if [ -z  $SQLFILE ]
then
    echo "Provide a SQL file"
else
    psql -d postgres -U david -f $1
fi