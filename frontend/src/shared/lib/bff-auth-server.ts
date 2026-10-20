import { fetchInternal, parseInternalJson } from '@/shared/lib/internal-api';
import type { TokenPair } from '@/shared/api/types';

export const REFRESH_TOKEN_HEADER = 'x-refresh-token';

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

function authHeaders(
  accessToken: string,
  refreshToken?: string,
): HeadersInit {
  const headers: Record<string, string> = {
    Authorization: `Bearer ${accessToken}`,
  };
  if (refreshToken) {
    headers[REFRESH_TOKEN_HEADER] = refreshToken;
  }
  return headers;
}

export async function fetchAuthSessions(
  accessToken: string,
  refreshToken?: string,
): Promise<Response> {
  return fetchInternal('/auth/sessions', {
    method: 'GET',
    headers: authHeaders(accessToken, refreshToken),
  });
}

export async function fetchRevokeAuthSession(
  accessToken: string,
  sessionId: number,
): Promise<Response> {
  return fetchInternal(`/auth/sessions/${sessionId}`, {
    method: 'DELETE',
    headers: authHeaders(accessToken),
  });
}

export async function fetchRevokeOtherAuthSessions(
  accessToken: string,
  refreshToken: string,
): Promise<Response> {
  return fetchInternal('/auth/sessions/revoke-others', {
    method: 'POST',
    headers: authHeaders(accessToken, refreshToken),
  });
}
