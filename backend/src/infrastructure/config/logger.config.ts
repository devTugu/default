import { ConfigService } from '@nestjs/config';
import { WinstonModuleOptions } from 'nest-winston';
import * as winston from 'winston';

export function createWinstonConfig(
  configService: ConfigService,
): WinstonModuleOptions {
  const level = configService.get<string>('LOG_LEVEL', 'info');
  return {
    level,
    transports: [
      new winston.transports.Console({
        format: winston.format.combine(
          winston.format.timestamp(),
          winston.format.errors({ stack: true }),
          winston.format.json(),
        ),
      }),
    ],
  };
}

/** @deprecated Use createWinstonConfig with ConfigService */
export const winstonConfig: WinstonModuleOptions = createWinstonConfig({
  get: (key: string, fallback?: string) =>
    process.env[key] ?? fallback ?? 'info',
} as ConfigService);
