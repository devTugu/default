import { NextResponse } from 'next/server';
import { UpstreamConnectionError } from '@/shared/lib/internal-api';

export function upstreamUnavailableNextResponse(): NextResponse {
  return NextResponse.json(
    {
      success: false,
      error: {
        code: 'UPSTREAM_UNAVAILABLE',
        message:
          'Cannot reach the API. Start the backend (pnpm dev or pnpm dev:backend) and verify API_INTERNAL_URL.',
      },
    },
    { status: 503 },
  );
}

export function catchUpstreamConnection(error: unknown): NextResponse | null {
  if (error instanceof UpstreamConnectionError) {
    return upstreamUnavailableNextResponse();
  }
  return null;
}
