import { z } from 'zod';

const clientEnvSchema = z.object({
  NEXT_PUBLIC_APP_NAME: z.string().min(1).default('Admin Console'),
  NEXT_PUBLIC_BRAND_NAME: z.string().min(1).default('Your Site'),
  NEXT_PUBLIC_SITE_URL: z.string().url().optional(),
  NODE_ENV: z.enum(['development', 'test', 'production']).optional(),
});

const serverEnvSchema = z.object({
  API_INTERNAL_URL: z
    .string()
    .url()
    .refine((url) => url.endsWith('/api/v1'), {
      message: 'API_INTERNAL_URL must end with /api/v1',
    }),
});

const DEV_FALLBACK_URL = 'http://localhost:3001/api/v1';

function failEnv(message: string, details: unknown): never {
  console.error(message, details);
  throw new Error(message);
}

const parsedClient = clientEnvSchema.safeParse({
  NEXT_PUBLIC_APP_NAME: process.env.NEXT_PUBLIC_APP_NAME ?? 'Admin Console',
  NEXT_PUBLIC_BRAND_NAME: process.env.NEXT_PUBLIC_BRAND_NAME ?? 'Your Site',
  NEXT_PUBLIC_SITE_URL: process.env.NEXT_PUBLIC_SITE_URL,
  NODE_ENV: process.env.NODE_ENV,
});

if (!parsedClient.success) {
  if (process.env.NODE_ENV === 'production') {
    failEnv('Invalid client environment variables', parsedClient.error.flatten());
  }
}

/** Client-safe configuration — browser traffic goes through the BFF proxy. */
export const env = {
  API_BASE_URL: '/api/backend',
  APP_NAME: parsedClient.success
    ? parsedClient.data.NEXT_PUBLIC_APP_NAME
    : 'Admin Console',
  BRAND_NAME: parsedClient.success
    ? parsedClient.data.NEXT_PUBLIC_BRAND_NAME
    : 'Your Site',
  SITE_URL: parsedClient.success
    ? parsedClient.data.NEXT_PUBLIC_SITE_URL
    : undefined,
  APP_ENV: process.env.NODE_ENV ?? 'development',
} as const;

function resolveInternalUrl(): string {
  const nodeEnv = process.env.NODE_ENV ?? 'development';
  const raw = process.env.API_INTERNAL_URL;

  if (!raw) {
    if (nodeEnv === 'production') {
      failEnv('API_INTERNAL_URL is required in production', {});
    }
    return DEV_FALLBACK_URL;
  }

  const parsed = serverEnvSchema.safeParse({ API_INTERNAL_URL: raw });

  if (!parsed.success) {
    if (nodeEnv === 'production') {
      failEnv('Invalid server environment variables', parsed.error.flatten());
    }
    return raw;
  }

  return parsed.data.API_INTERNAL_URL;
}

/** Server-only configuration for BFF route handlers. */
export const serverEnv = {
  get API_INTERNAL_URL(): string {
    return resolveInternalUrl();
  },
} as const;
