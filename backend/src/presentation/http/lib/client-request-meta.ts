import type { Request } from 'express';
import type { ClientRequestMeta } from '@application/auth/dto/client-request-meta';

function firstForwardedIp(forwarded: string): string | null {
  const first = forwarded.split(',')[0]?.trim();
  return first || null;
}

export function extractClientRequestMeta(req: Request): ClientRequestMeta {
  const forwarded = req.headers['x-forwarded-for'];
  const ipAddress =
    typeof forwarded === 'string'
      ? firstForwardedIp(forwarded)
      : (req.ip ?? null);
  const userAgent =
    typeof req.headers['user-agent'] === 'string'
      ? req.headers['user-agent']
      : null;

  return { userAgent, ipAddress };
}

export const REFRESH_TOKEN_HEADER = 'x-refresh-token';

export function readRefreshTokenHeader(req: Request): string | undefined {
  const raw = req.headers[REFRESH_TOKEN_HEADER];
  if (typeof raw === 'string' && raw.length > 0) {
    return raw;
  }
  return undefined;
}
