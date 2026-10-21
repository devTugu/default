import { NextRequest, NextResponse } from 'next/server';
import {
  AUTH_COOKIE_NAMES,
  clearAuthCookies,
  setAuthCookies,
} from '@/shared/lib/auth-cookies';
import {
  fetchRevokeOtherAuthSessions,
  refreshTokenPair,
} from '@/shared/lib/bff-auth-server';
import { assertCsrf } from '@/shared/lib/bff-csrf';

export async function POST(request: NextRequest) {
  const csrfError = assertCsrf(request);
  if (csrfError) return csrfError;

  const accessToken = request.cookies.get(AUTH_COOKIE_NAMES.ACCESS_TOKEN)?.value;
  let refreshToken = request.cookies.get(AUTH_COOKIE_NAMES.REFRESH_TOKEN)?.value;

  if (!refreshToken) {
    const response = NextResponse.json(
      {
        success: false,
        error: { code: 'UNAUTHORIZED', message: 'Not authenticated' },
      },
      { status: 401 },
    );
    return clearAuthCookies(response);
  }

  let token = accessToken;
  let rotatedPair: Awaited<ReturnType<typeof refreshTokenPair>> | null = null;
  if (!token) {
    rotatedPair = await refreshTokenPair(refreshToken, request);
    if (!rotatedPair) {
      const response = NextResponse.json(
        {
          success: false,
          error: { code: 'UNAUTHORIZED', message: 'Not authenticated' },
        },
        { status: 401 },
      );
      return clearAuthCookies(response);
    }
    token = rotatedPair.accessToken;
    refreshToken = rotatedPair.refreshToken;
  }

  const upstream = await fetchRevokeOtherAuthSessions(
    token,
    refreshToken,
    request,
  );
  let response = new NextResponse(null, { status: upstream.status });

  if (upstream.status === 401) {
    rotatedPair = await refreshTokenPair(refreshToken, request);
    if (!rotatedPair) {
      const unauthorized = NextResponse.json(
        {
          success: false,
          error: { code: 'UNAUTHORIZED', message: 'Not authenticated' },
        },
        { status: 401 },
      );
      return clearAuthCookies(unauthorized);
    }
    const retry = await fetchRevokeOtherAuthSessions(
      rotatedPair.accessToken,
      rotatedPair.refreshToken,
      request,
    );
    response = new NextResponse(null, { status: retry.status });
    if (retry.ok) {
      response = setAuthCookies(response, rotatedPair);
    }
    return response;
  }

  if (rotatedPair && upstream.ok) {
    response = setAuthCookies(response, rotatedPair);
  }

  return response;
}
