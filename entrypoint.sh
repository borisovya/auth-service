#!/bin/sh

echo "⏳ Waiting for PostgreSQL at $DB_HOST:$DB_PORT..."

until nc -z -v -w30 "$DB_HOST" "$DB_PORT"
do
  echo "❗️ Still waiting for PostgreSQL..."
  sleep 2
done

echo "✅ PostgreSQL is up – running migrations..."

npx prisma migrate deploy

echo "🌱 Seeding database..."
npx prisma db seed || echo "⚠️ Seed failed but app will continue"

echo "🚀 Starting the app..."
exec node dist/src/main
