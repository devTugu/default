import { fetchInternal, parseInternalJson } from '@/shared/lib/internal-api';
import type { TokenPair } from '@/shared/api/types';

export async function refreshTokenPair(
  refreshToken: string,
): Promise<TokenPair | null> {
  const upstream = await fetchInternal('/auth/refresh', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ refreshToken }),
  });

  if (!upstream.ok) {
    return null;
  }

  const envelope = await parseInternalJson<TokenPair>(upstream);
  return envelope.data;
}

export async function fetchAuthMe(accessToken: string): Promise<Response> {
  return fetchInternal('/auth/me', {
    method: 'GET',
    headers: { Authorization: `Bearer ${accessToken}` },
  });
}
