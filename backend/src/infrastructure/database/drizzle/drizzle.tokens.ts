import type { NodePgDatabase } from 'drizzle-orm/node-postgres';
import type { DrizzleSchema } from './schema';

export const DRIZZLE = Symbol('DRIZZLE');

export type DrizzleDatabase = NodePgDatabase<DrizzleSchema>;
