import 'dotenv/config';
import { defineConfig } from 'drizzle-kit';

export default defineConfig({
  schema: './src/infrastructure/database/drizzle/schema/index.ts',
  out: './src/infrastructure/database/drizzle/migrations',
  dialect: 'postgresql',
  dbCredentials: {
    host: process.env.DB_HOST ?? '127.0.0.1',
    port: Number(process.env.DB_PORT ?? 5432),
    user: process.env.DB_USERNAME ?? 'app_user',
    password: process.env.DB_PASSWORD ?? 'app_password',
    database: process.env.DB_NAME ?? 'app_db',
    ssl: process.env.DB_SSL === 'true',
  },
});
