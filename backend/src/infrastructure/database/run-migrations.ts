import 'reflect-metadata';
import * as dotenv from 'dotenv';
import { drizzle } from 'drizzle-orm/node-postgres';
import { migrate } from 'drizzle-orm/node-postgres/migrator';
import path from 'node:path';
import { Pool } from 'pg';

dotenv.config({ path: '.env' });

const useSsl = process.env.DB_SSL === 'true';

async function run(): Promise<void> {
  const pool = new Pool({
    host: process.env.DB_HOST,
    port: Number(process.env.DB_PORT ?? 5432),
    user: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    max: 1,
    connectionTimeoutMillis: 15_000,
    ...(useSsl && { ssl: { rejectUnauthorized: true } }),
  });

  const db = drizzle(pool);
  await migrate(db, {
    migrationsFolder: path.join(__dirname, 'drizzle/migrations'),
  });
  await pool.end();
  console.log('Migrations completed.');
}

run().catch((err) => {
  console.error('Migration failed:', err);
  process.exit(1);
});
