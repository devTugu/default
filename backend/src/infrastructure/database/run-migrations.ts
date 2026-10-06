import 'reflect-metadata';
import * as dotenv from 'dotenv';
import { drizzle } from 'drizzle-orm/mysql2';
import { migrate } from 'drizzle-orm/mysql2/migrator';
import mysql from 'mysql2/promise';
import path from 'node:path';

dotenv.config({ path: '.env' });

const useSsl = process.env.DB_SSL === 'true';

async function run(): Promise<void> {
  const pool = mysql.createPool({
    host: process.env.DB_HOST,
    port: Number(process.env.DB_PORT ?? 3306),
    user: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    waitForConnections: true,
    connectionLimit: 1,
    connectTimeout: 15000,
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
