#!/bin/bash

docker compose down
dotenv -e .env.test -- docker compose up -d
./scripts/wait-for-it.sh  postgresql://postgres:password@localhost:5432/tests -- echo '🟢 Database is ready!'
pnpm dlx prisma generate
dotenv -e .env.test -- pnpm dlx prisma migrate dev --skip-seed --name init
dotenv -e .env.test -- vitest run --coverage --config=vitest.config.ts 
docker compose down
