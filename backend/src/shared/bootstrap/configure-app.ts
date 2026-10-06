import {
  INestApplication,
  ValidationPipe,
  VersioningType,
} from '@nestjs/common';
import { NestExpressApplication } from '@nestjs/platform-express';
import { ConfigService } from '@nestjs/config';
import helmet from 'helmet';
// eslint-disable-next-line @typescript-eslint/no-require-imports
const compression = require('compression') as typeof import('compression');

export interface ConfigureAppOptions {
  enableSecurityMiddleware?: boolean;
  enableCors?: boolean;
}

export function configureApp(
  app: INestApplication,
  options: ConfigureAppOptions = {},
): void {
  const expressApp = app as NestExpressApplication;
  const { enableSecurityMiddleware = true, enableCors = true } = options;

  expressApp.set('trust proxy', 1);
  expressApp.enableVersioning({
    type: VersioningType.URI,
    defaultVersion: '1',
  });
  expressApp.setGlobalPrefix('api');
  expressApp.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
      transformOptions: { enableImplicitConversion: true },
    }),
  );

  if (enableSecurityMiddleware) {
    expressApp.use(helmet());
    expressApp.use(compression());
  }

  if (enableCors) {
    const configService = app.get(ConfigService);
    expressApp.enableCors({
      origin: configService.get<string>('CORS_ORIGIN', 'http://localhost:3000'),
      methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE'],
      allowedHeaders: ['Content-Type', 'Authorization', 'x-request-id'],
      credentials: true,
    });
  }
}
