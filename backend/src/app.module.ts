import { APP_FILTER, APP_GUARD, APP_INTERCEPTOR } from '@nestjs/core';
import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { ThrottlerGuard, ThrottlerModule } from '@nestjs/throttler';
import { WinstonModule } from 'nest-winston';
import { envValidationSchema } from '@infrastructure/config/env.validation';
import { createWinstonConfig } from '@infrastructure/config/logger.config';
import { InfrastructureModule } from '@infrastructure/infrastructure.module';
import { RedisClient } from '@infrastructure/cache/redis/redis.client';
import { RedisThrottlerStorage } from '@infrastructure/cache/redis/throttler-storage.redis';
import { isRedisEnabled } from '@infrastructure/config/redis.config';
import { AllExceptionsFilter } from '@presentation/http/filters/all-exceptions.filter';
import { LoggingInterceptor } from '@presentation/http/interceptors/logging.interceptor';
import { ResponseInterceptor } from '@presentation/http/interceptors/response.interceptor';
import { AuditInterceptor } from '@presentation/http/interceptors/audit.interceptor';
import { JwtAuthGuard } from '@presentation/http/guards/jwt-auth.guard';
import { PermissionsGuard } from '@presentation/http/guards/permissions.guard';
import { RequestIdMiddleware } from '@presentation/http/middleware/request-id.middleware';
import { AuthPresentationModule } from '@presentation/http/modules/auth.presentation.module';
import { UserPresentationModule } from '@presentation/http/modules/user.presentation.module';
import { AuthorizationPresentationModule } from '@presentation/http/modules/authorization.presentation.module';
import { SiteSettingPresentationModule } from '@presentation/http/modules/site-setting.presentation.module';
import { MediaPresentationModule } from '@presentation/http/modules/media.presentation.module';
import { DashboardPresentationModule } from '@presentation/http/modules/dashboard.presentation.module';
import { AuditPresentationModule } from '@presentation/http/modules/audit.presentation.module';

@Module({
  imports: [
    WinstonModule.forRootAsync({
      inject: [ConfigService],
      useFactory: (config: ConfigService) => createWinstonConfig(config),
    }),
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env',
      validationSchema: envValidationSchema,
      validationOptions: {
        convert: true,
        abortEarly: false,
      },
    }),
    ThrottlerModule.forRootAsync({
      imports: [InfrastructureModule],
      inject: [ConfigService, RedisClient],
      useFactory: (config: ConfigService, redis: RedisClient | null) => ({
        throttlers: [
          {
            ttl: config.get<number>('THROTTLE_TTL', 60) * 1000,
            limit: config.get<number>('THROTTLE_LIMIT', 60),
          },
        ],
        storage:
          isRedisEnabled(config) && redis
            ? new RedisThrottlerStorage(redis)
            : undefined,
      }),
    }),
    InfrastructureModule,
    AuthPresentationModule,
    UserPresentationModule,
    AuthorizationPresentationModule,
    SiteSettingPresentationModule,
    MediaPresentationModule,
    DashboardPresentationModule,
    AuditPresentationModule,
  ],
  providers: [
    { provide: APP_FILTER, useClass: AllExceptionsFilter },
    { provide: APP_INTERCEPTOR, useClass: LoggingInterceptor },
    { provide: APP_INTERCEPTOR, useClass: ResponseInterceptor },
    { provide: APP_INTERCEPTOR, useClass: AuditInterceptor },
    { provide: APP_GUARD, useClass: ThrottlerGuard },
    { provide: APP_GUARD, useClass: JwtAuthGuard },
    { provide: APP_GUARD, useClass: PermissionsGuard },
  ],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer): void {
    consumer.apply(RequestIdMiddleware).forRoutes('*');
  }
}
