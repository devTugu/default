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
import { catchUpstreamConnection } from '@/shared/lib/bff-upstream';

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

async function proxyAuthMe(
  accessToken: string,
  clientRequest: NextRequest,
): Promise<NextResponse> {
  const upstream = await fetchAuthMe(accessToken, clientRequest);
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
  clientRequest: NextRequest,
): Promise<NextResponse> {
  if (accessToken) {
    const response = await proxyAuthMe(accessToken, clientRequest);
    if (response.status !== 401) {
      return response;
    }
  }

  if (!refreshToken) {
    return unauthorizedResponse();
  }

  const pair = await refreshTokenPair(refreshToken, clientRequest);
  if (!pair) {
    return unauthorizedResponse();
  }

  const response = await proxyAuthMe(pair.accessToken, clientRequest);
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

  try {
    return await meWithRefreshRetry(accessToken, refreshToken, request);
  } catch (error) {
    const upstream = catchUpstreamConnection(error);
    if (upstream) {
      return upstream;
    }
    throw error;
  }
}
