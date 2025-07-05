#!/bin/sh

echo "⏳ Waiting for database..."

# Ждем, пока база будет доступна
until nc -z -v -w30 $DB_HOST $DB_PORT
do
  echo "⏳ Waiting for PostgreSQL at $DB_HOST:$DB_PORT..."
  sleep 2
done

echo "✅ PostgreSQL is up – running migrations..."
npx prisma migrate deploy

echo "📥 Seeding database..."
npx prisma db seed

echo "🚀 Starting the app..."
exec node dist/main
