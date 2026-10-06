import * as Joi from 'joi';

const durationPattern = /^(\d+)(s|m|h|d)$/i;

export const envValidationSchema = Joi.object({
  NODE_ENV: Joi.string()
    .valid('development', 'test', 'production')
    .default('development'),
  APP_PORT: Joi.number().port().default(3000),
  PORT: Joi.number().port().optional(),
  LOG_LEVEL: Joi.string()
    .valid('error', 'warn', 'info', 'debug')
    .default('info'),

  DB_HOST: Joi.string().hostname().required(),
  DB_PORT: Joi.number().port().default(3306),
  DB_USERNAME: Joi.string().min(1).required(),
  DB_PASSWORD: Joi.string().allow('').default(''),
  DB_NAME: Joi.string().min(1).required(),
  DB_SSL: Joi.string().valid('true', 'false').default('false'),
  DB_CONNECTION_LIMIT: Joi.number().default(10),
  DB_ROOT_PASSWORD: Joi.string().optional(),

  REDIS_ENABLED: Joi.string().valid('true', 'false').default('true'),
  REDIS_URL: Joi.when('REDIS_ENABLED', {
    is: 'true',
    then: Joi.string().uri().required(),
    otherwise: Joi.string().uri().optional(),
  }),
  PERMISSION_CACHE_TTL_SEC: Joi.number().default(60),

  OTEL_ENABLED: Joi.string().valid('true', 'false').default('false'),
  OTEL_EXPORTER_OTLP_ENDPOINT: Joi.when('OTEL_ENABLED', {
    is: 'true',
    then: Joi.string().uri().required(),
    otherwise: Joi.string().uri().optional(),
  }),
  OTEL_SERVICE_NAME: Joi.string().default('website-api'),

  OAUTH_ENABLED: Joi.string().valid('true', 'false').default('false'),
  OAUTH_ISSUER: Joi.when('OAUTH_ENABLED', {
    is: 'true',
    then: Joi.string().uri().required(),
    otherwise: Joi.string().uri().optional(),
  }),
  OAUTH_CLIENT_ID: Joi.when('OAUTH_ENABLED', {
    is: 'true',
    then: Joi.string().min(1).required(),
    otherwise: Joi.string().optional(),
  }),
  OAUTH_CLIENT_SECRET: Joi.when('OAUTH_ENABLED', {
    is: 'true',
    then: Joi.string().min(1).required(),
    otherwise: Joi.string().optional(),
  }),
  OAUTH_CALLBACK_URL: Joi.when('OAUTH_ENABLED', {
    is: 'true',
    then: Joi.string().uri().required(),
    otherwise: Joi.string().uri().optional(),
  }),

  APP_DISPLAY_NAME: Joi.string().default('Website Template'),
  MFA_ISSUER: Joi.string().default('Website Template Admin'),
  MFA_ENCRYPTION_KEY: Joi.string().min(32).optional(),
  MFA_REQUIRED_ROLES: Joi.string().default('SUPER_ADMIN'),

  JWT_ACCESS_SECRET: Joi.string().min(32).required(),
  JWT_REFRESH_SECRET: Joi.string().min(32).required(),
  JWT_ACCESS_EXPIRES_IN: Joi.string().pattern(durationPattern).default('15m'),
  JWT_REFRESH_EXPIRES_IN: Joi.string().pattern(durationPattern).default('7d'),

  CORS_ORIGIN: Joi.string().default('http://localhost:3000'),
  THROTTLE_TTL: Joi.number().default(60),
  THROTTLE_LIMIT: Joi.number().default(60),
  LOGIN_THROTTLE_TTL: Joi.number().default(60),
  LOGIN_THROTTLE_LIMIT: Joi.number().default(5),
  LOGIN_MAX_FAILED_ATTEMPTS: Joi.number().integer().min(1).default(5),
  LOGIN_LOCKOUT_MINUTES: Joi.number().integer().min(1).default(15),

  /** Slug of the single default org (multi-org UI out of scope). */
  ORGANIZATION_DEFAULT_SLUG: Joi.string().default('default'),

  SWAGGER_ENABLED: Joi.string().valid('true', 'false').default('false'),

  SEED_ADMIN_EMAIL: Joi.string().email().optional(),
  SEED_ADMIN_PASSWORD: Joi.string().min(8).optional(),

  SMTP_HOST: Joi.string().optional(),
  SMTP_PORT: Joi.number().port().optional(),
  SMTP_USER: Joi.string().optional(),
  SMTP_PASS: Joi.string().optional(),
  SMTP_FROM: Joi.string().email().optional(),
  CONTACT_NOTIFY_EMAIL: Joi.string().email().optional(),

  S3_BUCKET: Joi.string().optional(),
  S3_REGION: Joi.string().optional(),
  S3_ACCESS_KEY: Joi.string().optional(),
  S3_SECRET_KEY: Joi.string().optional(),
  S3_ENDPOINT: Joi.string().uri().optional(),
  S3_PUBLIC_BASE_URL: Joi.string().uri().optional(),

  AUDIT_PURGE_ENABLED: Joi.string().valid('true', 'false').default('false'),
  AUDIT_RETENTION_DAYS: Joi.number().integer().min(1).default(90),

  SENTRY_DSN: Joi.string().uri().optional(),
});
