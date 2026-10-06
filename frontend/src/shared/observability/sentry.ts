export async function initSentryIfConfigured(): Promise<void> {
  const dsn = process.env.SENTRY_DSN;
  if (!dsn) {
    return;
  }

  try {
    const Sentry = await import('@sentry/nextjs');
    Sentry.init({
      dsn,
      environment: process.env.NODE_ENV ?? 'development',
      tracesSampleRate: 0.1,
    });
  } catch (error) {
    console.warn(
      'Sentry initialization skipped:',
      error instanceof Error ? error.message : error,
    );
  }
}
