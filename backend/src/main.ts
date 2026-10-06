import { NestFactory } from '@nestjs/core';
import { NestExpressApplication } from '@nestjs/platform-express';
import { LoggerService } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { WINSTON_MODULE_NEST_PROVIDER } from 'nest-winston';
import { AppModule } from './app.module';
import { initTracing } from '@infrastructure/observability/tracing';
import { initSentryIfConfigured } from '@infrastructure/observability/sentry';
import { configureApp } from '@shared/bootstrap/configure-app';

async function bootstrap() {
  await initSentryIfConfigured();
  await initTracing();
  const app = await NestFactory.create<NestExpressApplication>(AppModule, {
    bufferLogs: true,
  });

  const configService = app.get(ConfigService);
  const logger = app.get<LoggerService>(WINSTON_MODULE_NEST_PROVIDER);
  app.useLogger(logger);

  app.enableShutdownHooks();
  configureApp(app);

  const isSwaggerEnabled =
    configService.get<string>('SWAGGER_ENABLED', 'false') === 'true';

  if (isSwaggerEnabled) {
    const displayName = configService.get<string>(
      'APP_DISPLAY_NAME',
      'Website Template',
    );
    const swaggerConfig = new DocumentBuilder()
      .setTitle(`${displayName} API v1`)
      .setDescription(
        `${displayName} — NestJS Clean Architecture API with JWT auth and RBAC.`,
      )
      .setVersion('1.0')
      .addBearerAuth(
        { type: 'http', scheme: 'bearer', bearerFormat: 'JWT', in: 'header' },
        'access-token',
      )
      .build();

    const document = SwaggerModule.createDocument(app, swaggerConfig);
    SwaggerModule.setup('docs', app, document, {
      swaggerOptions: { persistAuthorization: true },
    });
  }

  const port = Number(
    process.env.PORT ?? configService.get<number>('APP_PORT', 3000),
  );
  await app.listen(port);
  logger.log(
    `Application running on http://localhost:${port}/api/v1`,
    'Bootstrap',
  );
  if (isSwaggerEnabled) {
    logger.log(`Swagger docs: http://localhost:${port}/docs`, 'Bootstrap');
  }
}

void bootstrap();
