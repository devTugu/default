import type { Request } from 'express';
import {
  firstForwardedClientIp,
  normalizeClientIpAddress,
} from '@default/utils/client-ip';

export function resolveClientIp(request: Request): string | null {
  const forwarded = request.headers['x-forwarded-for'];
  if (typeof forwarded === 'string') {
    return firstForwardedClientIp(forwarded);
  }

  return normalizeClientIpAddress(request.ip ?? null);
}
