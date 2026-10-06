import { describe, expect, it, vi } from 'vitest';

describe('env', () => {
  it('uses dev fallback when API_INTERNAL_URL is missing in development', async () => {
    vi.stubEnv('NODE_ENV', 'development');
    vi.stubEnv('API_INTERNAL_URL', '');
    vi.resetModules();
    const { serverEnv } = await import('./env');
    expect(serverEnv.API_INTERNAL_URL).toBe('http://localhost:3001/api/v1');
  });

  it('throws in production when API_INTERNAL_URL is missing', async () => {
    vi.stubEnv('NODE_ENV', 'production');
    vi.stubEnv('API_INTERNAL_URL', '');
    vi.resetModules();
    await expect(async () => {
      const { serverEnv } = await import('./env');
      void serverEnv.API_INTERNAL_URL;
    }).rejects.toThrow('API_INTERNAL_URL is required in production');
  });

  it('exposes brand name from NEXT_PUBLIC_BRAND_NAME', async () => {
    vi.stubEnv('NEXT_PUBLIC_BRAND_NAME', 'Acme Public');
    vi.resetModules();
    const { env } = await import('./env');
    expect(env.BRAND_NAME).toBe('Acme Public');
  });

  it('exposes site url when NEXT_PUBLIC_SITE_URL is set', async () => {
    vi.stubEnv('NEXT_PUBLIC_SITE_URL', 'https://acme.example.com');
    vi.resetModules();
    const { env } = await import('./env');
    expect(env.SITE_URL).toBe('https://acme.example.com');
  });
});
