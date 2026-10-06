import { Global, Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import {
  USER_REPOSITORY,
  REFRESH_TOKEN_REPOSITORY,
  ROLE_REPOSITORY,
  PERMISSION_REPOSITORY,
  PASSWORD_HASHER,
  TOKEN_ISSUER,
  TOKEN_BLACKLIST,
  PERMISSION_CACHE,
  AUDIT_LOG_REPOSITORY,
  SITE_SETTING_REPOSITORY,
  NOTIFICATION_PORT,
  MEDIA_STORAGE_PORT,
  MFA_VERIFIER,
  OAUTH_IDENTITY,
  ORGANIZATION_CONTEXT,
} from '@shared/constants/tokens';
import { UserDrizzleRepository } from './repositories/user.drizzle-repository';
import { RefreshTokenDrizzleRepository } from './repositories/refresh-token.drizzle-repository';
import { RoleDrizzleRepository } from './repositories/role.drizzle-repository';
import { PermissionDrizzleRepository } from './repositories/permission.drizzle-repository';
import { AuditLogDrizzleRepository } from './repositories/audit-log.drizzle-repository';
import { SiteSettingDrizzleRepository } from './repositories/site-setting.drizzle-repository';
import { BcryptPasswordHasher } from './auth/bcrypt-password-hasher';
import { JwtTokenIssuerAdapter } from './auth/jwt-token-issuer.adapter';
import { RedisClient } from './cache/redis/redis.client';
import { TokenBlacklistRedisAdapter } from './cache/redis/token-blacklist.redis-adapter';
import { PermissionCacheRedisAdapter } from './cache/redis/permission-cache.redis-adapter';
import { TokenBlacklistMemoryAdapter } from './cache/memory/token-blacklist.memory-adapter';
import { PermissionCacheMemoryAdapter } from './cache/memory/permission-cache.memory-adapter';
import { RedisHealthIndicator } from './cache/redis/redis.health';
import { isRedisEnabled } from './config/redis.config';
import { ITokenBlacklist } from '@application/ports/token-blacklist.port';
import { IPermissionCache } from '@application/ports/permission-cache.port';
import { INotificationPort } from '@application/ports/notification.port';
import { NoopNotificationAdapter } from './notification/noop-notification.adapter';
import { NodemailerNotificationAdapter } from './notification/nodemailer-notification.adapter';
import { UrlPassthroughAdapter } from './media/url-passthrough.adapter';
import { S3CompatibleStorageAdapter } from './media/s3-compatible-storage.adapter';
import { CompositeMediaStorageAdapter } from './media/composite-media-storage.adapter';
import { TotpMfaAdapter } from './auth/totp-mfa.adapter';
import { OidcIdentityAdapter } from './auth/oidc-identity.adapter';
import { DefaultOrganizationContext } from './tenancy/default-organization.context';
import { DrizzleModule } from './database/drizzle/drizzle.module';
import { DrizzleHealthIndicator } from './database/drizzle/drizzle.health';

@Global()
@Module({
  imports: [
    DrizzleModule,
    JwtModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (config: ConfigService) => ({
        secret: config.getOrThrow<string>('JWT_ACCESS_SECRET'),
      }),
    }),
  ],
  providers: [
    {
      provide: RedisClient,
      useFactory: (config: ConfigService) => {
        if (!isRedisEnabled(config)) return null;
        return new RedisClient(config);
      },
      inject: [ConfigService],
    },
    RedisHealthIndicator,
    DrizzleHealthIndicator,
    {
      provide: ORGANIZATION_CONTEXT,
      useClass: DefaultOrganizationContext,
    },
    { provide: USER_REPOSITORY, useClass: UserDrizzleRepository },
    {
      provide: REFRESH_TOKEN_REPOSITORY,
      useClass: RefreshTokenDrizzleRepository,
    },
    { provide: ROLE_REPOSITORY, useClass: RoleDrizzleRepository },
    { provide: PERMISSION_REPOSITORY, useClass: PermissionDrizzleRepository },
    { provide: AUDIT_LOG_REPOSITORY, useClass: AuditLogDrizzleRepository },
    {
      provide: SITE_SETTING_REPOSITORY,
      useClass: SiteSettingDrizzleRepository,
    },
    { provide: PASSWORD_HASHER, useClass: BcryptPasswordHasher },
    { provide: TOKEN_ISSUER, useClass: JwtTokenIssuerAdapter },
    {
      provide: TOKEN_BLACKLIST,
      useFactory: (
        config: ConfigService,
        redis: RedisClient | null,
      ): ITokenBlacklist => {
        if (isRedisEnabled(config) && redis) {
          return new TokenBlacklistRedisAdapter(redis);
        }
        return new TokenBlacklistMemoryAdapter();
      },
      inject: [ConfigService, RedisClient],
    },
    {
      provide: PERMISSION_CACHE,
      useFactory: (
        config: ConfigService,
        redis: RedisClient | null,
      ): IPermissionCache => {
        if (isRedisEnabled(config) && redis) {
          return new PermissionCacheRedisAdapter(redis);
        }
        return new PermissionCacheMemoryAdapter();
      },
      inject: [ConfigService, RedisClient],
    },
    NoopNotificationAdapter,
    NodemailerNotificationAdapter,
    {
      provide: NOTIFICATION_PORT,
      useFactory: (
        config: ConfigService,
        noop: NoopNotificationAdapter,
        nodemailer: NodemailerNotificationAdapter,
      ): INotificationPort => {
        if (config.get<string>('SMTP_HOST')) return nodemailer;
        return noop;
      },
      inject: [
        ConfigService,
        NoopNotificationAdapter,
        NodemailerNotificationAdapter,
      ],
    },
    UrlPassthroughAdapter,
    S3CompatibleStorageAdapter,
    CompositeMediaStorageAdapter,
    {
      provide: MEDIA_STORAGE_PORT,
      useExisting: CompositeMediaStorageAdapter,
    },
    { provide: MFA_VERIFIER, useClass: TotpMfaAdapter },
    { provide: OAUTH_IDENTITY, useClass: OidcIdentityAdapter },
  ],
  exports: [
    DrizzleModule,
    JwtModule,
    RedisClient,
    RedisHealthIndicator,
    DrizzleHealthIndicator,
    USER_REPOSITORY,
    REFRESH_TOKEN_REPOSITORY,
    ROLE_REPOSITORY,
    PERMISSION_REPOSITORY,
    AUDIT_LOG_REPOSITORY,
    SITE_SETTING_REPOSITORY,
    PASSWORD_HASHER,
    TOKEN_ISSUER,
    TOKEN_BLACKLIST,
    PERMISSION_CACHE,
    NOTIFICATION_PORT,
    MEDIA_STORAGE_PORT,
    MFA_VERIFIER,
    OAUTH_IDENTITY,
    ORGANIZATION_CONTEXT,
  ],
})
export class InfrastructureModule {}
