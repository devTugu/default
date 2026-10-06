import { NextRequest, NextResponse } from 'next/server';
import {
  AUTH_COOKIE_NAMES,
  clearAuthCookies,
  setAuthCookies,
} from '@/shared/lib/auth-cookies';
import {
  fetchAuthMe,
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

async function proxyAuthMe(accessToken: string): Promise<NextResponse> {
  const upstream = await fetchAuthMe(accessToken);
  const body = await upstream.text();

  return new NextResponse(body, {
    status: upstream.status,
    headers: {
      'content-type':
        upstream.headers.get('content-type') ?? 'application/json',
    },
  });
}

async function meWithRefreshRetry(
  accessToken: string | undefined,
  refreshToken: string | undefined,
): Promise<NextResponse> {
  if (accessToken) {
    const response = await proxyAuthMe(accessToken);
    if (response.status !== 401) {
      return response;
    }
  }

  if (!refreshToken) {
    return unauthorizedResponse();
  }

  const pair = await refreshTokenPair(refreshToken);
  if (!pair) {
    return unauthorizedResponse();
  }

  const response = await proxyAuthMe(pair.accessToken);
  if (response.status === 401) {
    return clearAuthCookies(response);
  }

  return setAuthCookies(response, pair);
}

export async function GET(request: NextRequest) {
  const accessToken = request.cookies.get(AUTH_COOKIE_NAMES.ACCESS_TOKEN)?.value;
  const refreshToken = request.cookies.get(
    AUTH_COOKIE_NAMES.REFRESH_TOKEN,
  )?.value;

  return meWithRefreshRetry(accessToken, refreshToken);
}
