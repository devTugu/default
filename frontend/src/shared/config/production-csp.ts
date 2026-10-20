function parseExtraImgSources(): string[] {
  const raw = process.env.CSP_EXTRA_IMG_SRC?.trim();
  if (!raw) {
    return [];
  }

  return raw
    .split(',')
    .map((entry) => entry.trim())
    .filter(Boolean);
}

/**
 * Production Content-Security-Policy (applied in next.config headers).
 * Dev/Turbopack skips CSP — inline HMR would break.
 *
 * Fork: set `CSP_EXTRA_IMG_SRC=https://cdn.example.com` when CMS logos use another origin.
 */
export function buildProductionContentSecurityPolicy(): string {
  const imgSrc = ["'self'", 'data:', 'blob:', ...parseExtraImgSources()].join(
    ' ',
  );

  return [
    "default-src 'self'",
    "script-src 'self' 'unsafe-inline'",
    "style-src 'self' 'unsafe-inline'",
    "font-src 'self' data:",
    `img-src ${imgSrc}`,
    "media-src 'self'",
    "connect-src 'self'",
    "object-src 'none'",
    "frame-src 'none'",
    "worker-src 'self' blob:",
    "manifest-src 'self'",
    "frame-ancestors 'none'",
    "base-uri 'self'",
    "form-action 'self'",
    'upgrade-insecure-requests',
  ].join('; ');
}
