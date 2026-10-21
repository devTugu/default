import { NextRequest, NextResponse } from 'next/server';
import {
  AUTH_COOKIE_NAMES,
  clearAuthCookies,
  setAuthCookies,
} from '@/shared/lib/auth-cookies';
import {
  fetchAuthSessions,
  refreshTokenPair,
} from '@/shared/lib/bff-auth-server';

function unauthorizedResponse(): NextResponse {
  const response = NextResponse.json(
    {
      success: false,
      error: { code: 'UNAUTHORIZED', message: 'Not authenticated' },
    },
    { status: 401 },
  );
  return clearAuthCookies(response);
}

export async function GET(request: NextRequest) {
  const accessToken = request.cookies.get(AUTH_COOKIE_NAMES.ACCESS_TOKEN)?.value;
  const refreshToken = request.cookies.get(AUTH_COOKIE_NAMES.REFRESH_TOKEN)?.value;

  if (!accessToken && !refreshToken) {
    return unauthorizedResponse();
  }

  let token = accessToken;
  if (!token && refreshToken) {
    const pair = await refreshTokenPair(refreshToken, request);
    if (!pair) {
      return unauthorizedResponse();
    }
    token = pair.accessToken;
    const upstream = await fetchAuthSessions(
      token,
      pair.refreshToken,
      request,
    );
    const body = await upstream.text();
    const response = new NextResponse(body, {
      status: upstream.status,
      headers: {
        'content-type':
          upstream.headers.get('content-type') ?? 'application/json',
      },
    });
    return setAuthCookies(response, pair);
  }

  const upstream = await fetchAuthSessions(
    token ?? '',
    refreshToken,
    request,
  );
  if (upstream.status === 401 && refreshToken) {
    const pair = await refreshTokenPair(refreshToken, request);
    if (!pair) {
      return unauthorizedResponse();
    }
    const retry = await fetchAuthSessions(
      pair.accessToken,
      pair.refreshToken,
      request,
    );
    const body = await retry.text();
    const response = new NextResponse(body, {
      status: retry.status,
      headers: {
        'content-type':
          retry.headers.get('content-type') ?? 'application/json',
      },
    });
    return setAuthCookies(response, pair);
  }

  const body = await upstream.text();
  return new NextResponse(body, {
    status: upstream.status,
    headers: {
      'content-type': upstream.headers.get('content-type') ?? 'application/json',
    },
  });
}
