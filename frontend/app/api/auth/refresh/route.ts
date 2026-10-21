import { NextRequest, NextResponse } from 'next/server';
import {
  AUTH_COOKIE_NAMES,
  clearAuthCookies,
} from '@/shared/lib/auth-cookies';
import { refreshTokenPair } from '@/shared/lib/bff-auth-server';
import { buildTokenPairResponse } from '@/shared/lib/bff-auth-response';
import { catchUpstreamConnection } from '@/shared/lib/bff-upstream';
import { assertCsrf } from '@/shared/lib/bff-csrf';

export async function POST(request: NextRequest) {
  const csrfError = assertCsrf(request);
  if (csrfError) return csrfError;

  const refreshToken = request.cookies.get(
    AUTH_COOKIE_NAMES.REFRESH_TOKEN,
  )?.value;

  if (!refreshToken) {
    const response = NextResponse.json(
      {
        success: false,
        error: { code: 'UNAUTHORIZED', message: 'Missing refresh token' },
      },
      { status: 401 },
    );
    return clearAuthCookies(response);
  }

  try {
    const pair = await refreshTokenPair(refreshToken, request);

    if (!pair) {
      const response = NextResponse.json(
        {
          success: false,
          error: { code: 'UNAUTHORIZED', message: 'Refresh failed' },
        },
        { status: 401 },
      );
      return clearAuthCookies(response);
    }

    return buildTokenPairResponse(pair);
  } catch (error) {
    const upstream = catchUpstreamConnection(error);
    if (upstream) {
      return upstream;
    }
    throw error;
  }
}
