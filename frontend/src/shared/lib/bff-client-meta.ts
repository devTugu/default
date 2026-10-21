import type { NextRequest } from 'next/server';
import {
  firstForwardedClientIp,
  normalizeClientIpAddress,
} from '@default/utils/client-ip';

const LOCAL_DEV_FALLBACK_IP = '127.0.0.1';

function mergeHeaders(init?: HeadersInit): Headers {
  const headers = new Headers(init);
  if (!headers.has('Accept')) {
    headers.set('Accept', 'application/json');
  }
  return headers;
}

export function resolveBffClientIp(request: NextRequest): string {
  const fromForwarded = firstForwardedClientIp(
    request.headers.get('x-forwarded-for'),
  );
  if (fromForwarded) {
    return fromForwarded;
  }

  const realIp = request.headers.get('x-real-ip')?.trim();
  const normalizedReal = normalizeClientIpAddress(realIp);
  if (normalizedReal) {
    return normalizedReal;
  }

  return LOCAL_DEV_FALLBACK_IP;
}

export function withBffClientHeaders(
  request: NextRequest,
  initHeaders?: HeadersInit,
): Headers {
  const headers = mergeHeaders(initHeaders);
  headers.set('X-Forwarded-For', resolveBffClientIp(request));
  const userAgent = request.headers.get('user-agent');
  if (userAgent) {
    headers.set('User-Agent', userAgent);
  }
  return headers;
}
