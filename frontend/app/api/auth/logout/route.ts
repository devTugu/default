import { NextRequest, NextResponse } from 'next/server';
import { AUTH_COOKIE_NAMES, clearAuthCookies } from '@/shared/lib/auth-cookies';
import {
  fetchInternal,
  UpstreamConnectionError,
} from '@/shared/lib/internal-api';
import { assertCsrf } from '@/shared/lib/bff-csrf';

export async function POST(request: NextRequest) {
  const csrfError = assertCsrf(request);
  if (csrfError) return csrfError;

  const refreshToken = request.cookies.get(AUTH_COOKIE_NAMES.REFRESH_TOKEN)?.value;
  const accessToken = request.cookies.get(AUTH_COOKIE_NAMES.ACCESS_TOKEN)?.value;

  if (refreshToken) {
    try {
      await fetchInternal(
        '/auth/logout',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            ...(accessToken ? { Authorization: `Bearer ${accessToken}` } : {}),
          },
          body: JSON.stringify({ refreshToken }),
        },
        request,
      );
    } catch (error) {
      if (!(error instanceof UpstreamConnectionError)) {
        throw error;
      }
    }
  }

  const response = new NextResponse(null, { status: 204 });
  return clearAuthCookies(response);
}
