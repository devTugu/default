import { serverEnv } from '@/shared/config/env';
import type { ApiEnvelope, ApiErrorEnvelope } from '@/shared/api/types';

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

export async function fetchInternal(
  path: string,
  init?: RequestInit
): Promise<Response> {
  return fetch(buildInternalUrl(path), {
    ...init,
    headers: mergeHeaders(init?.headers),
  });
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
