#!/bin/sh

echo "Waiting for database to be ready..."
while ! nc -z db 5432; do
    sleep 1
done

echo "Database is ready!"

# Exécuter les migrations Prisma
echo "Running database migrations..."
pnpm prisma migrate deploy

# Démarrer l'application
exec "$@"