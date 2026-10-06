#!/bin/sh
set -e

echo "Running database migrations..."
node dist/infrastructure/database/run-migrations.js

echo "Starting application..."
exec node dist/main.js
