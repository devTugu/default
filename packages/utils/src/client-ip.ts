const IPV4_MAPPED_PREFIX = '::ffff:';

/** Normalize stored/display client IPs (loopback, IPv4-mapped IPv6). */
export function normalizeClientIpAddress(
  ip: string | null | undefined,
): string | null {
  if (ip == null) {
    return null;
  }

  const trimmed = ip.trim();
  if (!trimmed) {
    return null;
  }

  if (trimmed === '::1') {
    return '127.0.0.1';
  }

  if (trimmed.startsWith(IPV4_MAPPED_PREFIX)) {
    return trimmed.slice(IPV4_MAPPED_PREFIX.length);
  }

  return trimmed;
}

export function firstForwardedClientIp(
  forwarded: string | null | undefined,
): string | null {
  if (!forwarded) {
    return null;
  }

  const first = forwarded.split(',')[0]?.trim();
  return normalizeClientIpAddress(first);
}
