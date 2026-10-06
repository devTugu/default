import { env } from './env';

export const APP_CONFIG = {
  API_BASE_URL: env.API_BASE_URL,
  APP_NAME: env.APP_NAME,
  BRAND_NAME: env.BRAND_NAME,
  SITE_URL: env.SITE_URL,
} as const;
