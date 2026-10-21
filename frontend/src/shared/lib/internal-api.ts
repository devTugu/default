import type { NextRequest } from 'next/server';
import { serverEnv } from '@/shared/config/env';
import type { ApiEnvelope, ApiErrorEnvelope } from '@/shared/api/types';
import { withBffClientHeaders } from '@/shared/lib/bff-client-meta';

function buildInternalUrl(path: string): string {
  const base = serverEnv.API_INTERNAL_URL.replace(/\/$/, '');
  const normalized = path.startsWith('/') ? path : `/${path}`;
  return `${base}${normalized}`;
}

function mergeHeaders(init?: HeadersInit): Headers {
  const headers = new Headers(init);
  if (!headers.has('Accept')) {
    headers.set('Accept', 'application/json');
  }
  return headers;
}

export class UpstreamConnectionError extends Error {
  constructor(cause: unknown) {
    super('Upstream API unreachable');
    this.name = 'UpstreamConnectionError';
    this.cause = cause;
  }
}

function readNetworkErrorCode(error: unknown): string | undefined {
  if (!error || typeof error !== 'object' || !('code' in error)) {
    return undefined;
  }
  const code = (error as { code: unknown }).code;
  return typeof code === 'string' ? code : undefined;
}

/** @internal Exported for unit tests. */
export function isUpstreamConnectionError(error: unknown): boolean {
  if (!(error instanceof TypeError) || error.message !== 'fetch failed') {
    return false;
  }

  const cause = error.cause;
  if (cause instanceof AggregateError) {
    return cause.errors.some((entry) => {
      const code = readNetworkErrorCode(entry);
      return (
        code === 'ECONNREFUSED' ||
        code === 'ENOTFOUND' ||
        code === 'ETIMEDOUT'
      );
    });
  }

  const code = readNetworkErrorCode(cause);
  return (
    code === 'ECONNREFUSED' ||
    code === 'ENOTFOUND' ||
    code === 'ETIMEDOUT'
  );
}

export async function fetchInternal(
  path: string,
  init?: RequestInit,
  clientRequest?: NextRequest,
): Promise<Response> {
  const headers = clientRequest
    ? withBffClientHeaders(clientRequest, init?.headers)
    : mergeHeaders(init?.headers);

  try {
    return await fetch(buildInternalUrl(path), {
      ...init,
      headers,
    });
  } catch (error) {
    if (isUpstreamConnectionError(error)) {
      throw new UpstreamConnectionError(error);
    }
    throw error;
  }
}

export async function parseInternalJson<T>(
  response: Response
): Promise<ApiEnvelope<T>> {
  return response.json() as Promise<ApiEnvelope<T>>;
}

export function errorResponse(
  envelope: ApiErrorEnvelope,
  status: number
): Response {
  return Response.json(envelope, { status });
}

/** @internal Exported for unit tests. */
export function mergeInternalHeaders(init?: HeadersInit): Headers {
  return mergeHeaders(init);
}
