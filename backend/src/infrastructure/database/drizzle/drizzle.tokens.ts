import type { MySql2Database } from 'drizzle-orm/mysql2';
import type { DrizzleSchema } from './schema';

export const DRIZZLE = Symbol('DRIZZLE');

export type DrizzleDatabase = MySql2Database<DrizzleSchema>;
