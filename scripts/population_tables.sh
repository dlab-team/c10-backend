#!/bin/bash
if pg_isready -h localhost -p 5432; then
  DATABASE_URL="postgresql://$POSTGRES_USER:$POSTGRES_PASSWORD@localhost:5432/$POSTGRES_DB"

  psql $DATABASE_URL -f /scripts/poblado_tablas.sql > /scripts/psql_log.txt
else
  echo "El contenedor PostgreSQL no está en ejecución."
  exit 1
fi

