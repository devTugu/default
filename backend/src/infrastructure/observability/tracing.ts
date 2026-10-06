/**
 * OpenTelemetry bootstrap — enabled when OTEL_ENABLED=true.
 */
export async function initTracing(): Promise<void> {
  if (process.env.OTEL_ENABLED !== 'true') {
    return;
  }

  try {
    const { NodeSDK } = await import('@opentelemetry/sdk-node');
    const { getNodeAutoInstrumentations } =
      await import('@opentelemetry/auto-instrumentations-node');
    const { OTLPTraceExporter } =
      await import('@opentelemetry/exporter-trace-otlp-http');
    const { resourceFromAttributes } = await import('@opentelemetry/resources');
    const { ATTR_SERVICE_NAME } =
      await import('@opentelemetry/semantic-conventions');

    const endpoint =
      process.env.OTEL_EXPORTER_OTLP_ENDPOINT ??
      'http://localhost:4318/v1/traces';
    const serviceName = process.env.OTEL_SERVICE_NAME ?? 'website-api';

    const sdk = new NodeSDK({
      resource: resourceFromAttributes({
        [ATTR_SERVICE_NAME]: serviceName,
      }),
      traceExporter: new OTLPTraceExporter({ url: endpoint }),
      instrumentations: [getNodeAutoInstrumentations()],
    });

    sdk.start();
    process.on('SIGTERM', () => {
      void sdk.shutdown();
    });
  } catch (error) {
    console.warn(
      'OpenTelemetry initialization skipped:',
      error instanceof Error ? error.message : error,
    );
  }
}
