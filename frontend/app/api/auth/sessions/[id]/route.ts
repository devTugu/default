import { NextRequest, NextResponse } from 'next/server';
import {
  AUTH_COOKIE_NAMES,
  clearAuthCookies,
  setAuthCookies,
} from '@/shared/lib/auth-cookies';
import {
  fetchRevokeAuthSession,
  refreshTokenPair,
} from '@/shared/lib/bff-auth-server';
import { assertCsrf } from '@/shared/lib/bff-csrf';

type RouteContext = { params: Promise<{ id: string }> };

async function resolveAccessToken(
  request: NextRequest,
): Promise<{ accessToken: string; refreshPair?: Awaited<ReturnType<typeof refreshTokenPair>> } | null> {
  const accessToken = request.cookies.get(AUTH_COOKIE_NAMES.ACCESS_TOKEN)?.value;
  const refreshToken = request.cookies.get(AUTH_COOKIE_NAMES.REFRESH_TOKEN)?.value;

  if (accessToken) {
    return { accessToken };
  }
  if (!refreshToken) {
    return null;
  }
  const pair = await refreshTokenPair(refreshToken, request);
  if (!pair) {
    return null;
  }
  return { accessToken: pair.accessToken, refreshPair: pair };
}

export async function DELETE(request: NextRequest, context: RouteContext) {
  const csrfError = assertCsrf(request);
  if (csrfError) return csrfError;

  const resolved = await resolveAccessToken(request);
  if (!resolved) {
    const response = NextResponse.json(
      {
        success: false,
        error: { code: 'UNAUTHORIZED', message: 'Not authenticated' },
      },
      { status: 401 },
    );
    return clearAuthCookies(response);
  }

  const { id } = await context.params;
  const sessionId = Number.parseInt(id, 10);
  if (!Number.isFinite(sessionId)) {
    return NextResponse.json(
      {
        success: false,
        error: { code: 'BAD_REQUEST', message: 'Invalid session id' },
      },
      { status: 400 },
    );
  }

  const upstream = await fetchRevokeAuthSession(
    resolved.accessToken,
    sessionId,
    request,
  );
  const body = await upstream.text();
  let response = new NextResponse(body || null, {
    status: upstream.status,
    headers: upstream.headers.get('content-type')
      ? { 'content-type': upstream.headers.get('content-type')! }
      : undefined,
  });

  if (resolved.refreshPair) {
    response = setAuthCookies(response, resolved.refreshPair);
  }

  return response;
}
