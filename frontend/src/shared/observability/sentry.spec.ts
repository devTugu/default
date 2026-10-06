import { afterEach, describe, expect, it, vi } from 'vitest';

describe('initSentryIfConfigured', () => {
  afterEach(() => {
    vi.resetModules();
    vi.unstubAllEnvs();
    vi.restoreAllMocks();
  });

  it('skips initialization when SENTRY_DSN is unset', async () => {
    vi.stubEnv('SENTRY_DSN', '');
    const initSpy = vi.fn();
    vi.doMock('@sentry/nextjs', () => ({ init: initSpy }));

    const { initSentryIfConfigured } = await import('./sentry');
    await initSentryIfConfigured();

    expect(initSpy).not.toHaveBeenCalled();
  });
});
