import { ConfigService } from '@nestjs/config';
import type { PoolOptions } from 'mysql2/promise';

export const createMysqlPoolOptions = (
  configService: ConfigService,
): PoolOptions => {
  const useSsl = configService.get<string>('DB_SSL') === 'true';
  const connectionLimit = configService.get<number>('DB_CONNECTION_LIMIT', 10);

  return {
    host: configService.getOrThrow<string>('DB_HOST'),
    port: Number(configService.getOrThrow<string>('DB_PORT')),
    user: configService.getOrThrow<string>('DB_USERNAME'),
    password: configService.getOrThrow<string>('DB_PASSWORD'),
    database: configService.getOrThrow<string>('DB_NAME'),
    waitForConnections: true,
    connectionLimit,
    connectTimeout: 15000,
    ...(useSsl && { ssl: { rejectUnauthorized: true } }),
  };
};
