describe('initTracing', () => {
  const originalOtelEnabled = process.env.OTEL_ENABLED;

  afterEach(() => {
    jest.resetModules();
    process.env.OTEL_ENABLED = originalOtelEnabled;
    jest.restoreAllMocks();
  });

  it('skips OpenTelemetry when OTEL_ENABLED is not true', async () => {
    process.env.OTEL_ENABLED = 'false';

    const startSpy = jest.fn();
    jest.doMock('@opentelemetry/sdk-node', () => ({
      NodeSDK: jest.fn(() => ({ start: startSpy, shutdown: jest.fn() })),
    }));

    const { initTracing } = await import('./tracing');
    await initTracing();

    expect(startSpy).not.toHaveBeenCalled();
  });
});
