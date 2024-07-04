#!/bin/bash

docker compose down
docker compose up -d
./scripts/wait-for-it.sh  postgresql://postgres:password@localhost:5432/mydb -- echo '🟢 Database is ready!'
pnpm dlx prisma generate
pnpm dlx prisma migrate deploy
vitest run --coverage --config=vitest.config.ts 
docker compose down
