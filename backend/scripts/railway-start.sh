#!/bin/sh
set -e

echo "Running database migrations..."
node dist/infrastructure/database/run-migrations.js

if [ "${RUN_SEED}" = "true" ]; then
  echo "Running database seed (RUN_SEED=true)..."
  node dist/infrastructure/database/seed/run-seed.js
fi

echo "Starting application..."
exec node dist/main.js
