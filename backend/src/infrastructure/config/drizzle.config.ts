import { ConfigService } from '@nestjs/config';
import type { PoolConfig } from 'pg';

export const createPostgresPoolConfig = (
  configService: ConfigService,
): PoolConfig => {
  const useSsl = configService.get<string>('DB_SSL') === 'true';
  const max = configService.get<number>('DB_CONNECTION_LIMIT', 10);

  return {
    host: configService.getOrThrow<string>('DB_HOST'),
    port: Number(configService.getOrThrow<string>('DB_PORT')),
    user: configService.getOrThrow<string>('DB_USERNAME'),
    password: configService.getOrThrow<string>('DB_PASSWORD'),
    database: configService.getOrThrow<string>('DB_NAME'),
    max,
    connectionTimeoutMillis: 15_000,
    ...(useSsl && { ssl: { rejectUnauthorized: true } }),
  };
};
