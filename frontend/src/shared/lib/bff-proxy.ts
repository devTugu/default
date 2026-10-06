import { NextRequest, NextResponse } from 'next/server';
import { AUTH_COOKIE_NAMES } from '@/shared/lib/auth-cookies';
import { fetchInternal } from '@/shared/lib/internal-api';
import { assertCsrf } from '@/shared/lib/bff-csrf';
import {
  BffPathError,
  isBffPathAllowed,
  normalizeBffPath,
} from '@/shared/config/bff-allowlist';

const FORWARD_REQUEST_HEADERS = [
  'accept',
  'accept-language',
  'content-type',
  'x-request-id',
] as const;

const MUTATING_METHODS = new Set(['POST', 'PUT', 'PATCH', 'DELETE']);

async function readRequestBody(request: NextRequest): Promise<BodyInit | undefined> {
  if (!MUTATING_METHODS.has(request.method)) {
    return undefined;
  }

  return request.arrayBuffer();
}

export async function proxyToBackend(
  request: NextRequest,
  pathSegments: string[]
): Promise<NextResponse> {
  if (MUTATING_METHODS.has(request.method)) {
    const csrfError = assertCsrf(request);
    if (csrfError) return csrfError;
  }

  let upstreamPath: string;

  try {
    upstreamPath = normalizeBffPath(pathSegments);
  } catch (error) {
    if (error instanceof BffPathError) {
      return NextResponse.json(
        { success: false, error: { code: 'FORBIDDEN', message: error.message } },
        { status: 403 }
      );
    }
    throw error;
  }

  if (!isBffPathAllowed(upstreamPath, request.method)) {
    return NextResponse.json(
      {
        success: false,
        error: {
          code: 'FORBIDDEN',
          message: 'This API path is not allowed through the BFF proxy.',
        },
      },
      { status: 403 }
    );
  }

  const accessToken = request.cookies.get(AUTH_COOKIE_NAMES.ACCESS_TOKEN)?.value;

  const headers = new Headers();
  if (accessToken) {
    headers.set('Authorization', `Bearer ${accessToken}`);
  }

  for (const name of FORWARD_REQUEST_HEADERS) {
    const value = request.headers.get(name);
    if (value) {
      headers.set(name, value);
    }
  }

  const body = await readRequestBody(request);
  const upstreamUrl = `${upstreamPath}${request.nextUrl.search}`;

  const upstream = await fetchInternal(upstreamUrl, {
    method: request.method,
    headers,
    body,
  });

  const responseHeaders = new Headers();
  const contentType = upstream.headers.get('content-type');
  if (contentType) {
    responseHeaders.set('content-type', contentType);
  }

  return new NextResponse(upstream.body, {
    status: upstream.status,
    headers: responseHeaders,
  });
}
