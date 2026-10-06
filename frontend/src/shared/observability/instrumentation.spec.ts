import { afterEach, describe, expect, it, vi } from 'vitest';

describe('instrumentation register', () => {
  afterEach(() => {
    vi.resetModules();
    vi.unstubAllEnvs();
    vi.restoreAllMocks();
  });

  it('does not start OpenTelemetry when OTEL_ENABLED is not true', async () => {
    vi.stubEnv('OTEL_ENABLED', 'false');
    vi.stubEnv('SENTRY_DSN', '');

    const startSpy = vi.fn();
    vi.doMock('@opentelemetry/sdk-node', () => ({
      NodeSDK: vi.fn(() => ({ start: startSpy, shutdown: vi.fn() })),
    }));
    vi.doMock('@/shared/observability/sentry', () => ({
      initSentryIfConfigured: vi.fn().mockResolvedValue(undefined),
    }));

    const { register } = await import('../../../instrumentation');
    await register();

    expect(startSpy).not.toHaveBeenCalled();
  });
});
