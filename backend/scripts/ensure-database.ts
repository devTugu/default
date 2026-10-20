import * as dotenv from 'dotenv';
import { Client } from 'pg';

dotenv.config({ path: '.env' });

const dbName = process.env.DB_NAME;
const dbHost = process.env.DB_HOST ?? 'localhost';
const dbPort = Number(process.env.DB_PORT ?? 5432);
const dbUser = process.env.DB_USERNAME;
const dbPassword = process.env.DB_PASSWORD;

function assertConfig(): void {
  if (!dbName || !/^[a-zA-Z0-9_]+$/.test(dbName)) {
    throw new Error('DB_NAME must be set (letters, numbers, underscore only).');
  }
  if (!dbUser) {
    throw new Error('DB_USERNAME is required.');
  }
}

async function ensureDatabase(): Promise<void> {
  assertConfig();

  const client = new Client({
    host: dbHost,
    port: dbPort,
    user: dbUser,
    password: dbPassword,
    database: 'postgres',
  });

  await client.connect();
  try {
    const exists = await client.query(
      'SELECT 1 FROM pg_database WHERE datname = $1',
      [dbName],
    );
    if (exists.rowCount && exists.rowCount > 0) {
      console.log(`Database "${dbName}" already exists.`);
      return;
    }
    await client.query(`CREATE DATABASE "${dbName}"`);
    console.log(`Created database "${dbName}".`);
  } finally {
    await client.end();
  }
}

ensureDatabase().catch((error: unknown) => {
  console.error('ensure-database failed:', error);
  process.exit(1);
});
