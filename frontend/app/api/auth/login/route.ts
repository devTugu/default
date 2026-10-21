import { NextRequest, NextResponse } from 'next/server';
import { fetchInternal, parseInternalJson } from '@/shared/lib/internal-api';
import { buildAuthSuccessResponse } from '@/shared/lib/bff-auth-response';
import { catchUpstreamConnection } from '@/shared/lib/bff-upstream';
import { assertCsrf } from '@/shared/lib/bff-csrf';
import type { LoginResult } from '@/shared/api/types';

export async function POST(request: NextRequest) {
  const csrfError = assertCsrf(request);
  if (csrfError) return csrfError;

  const body = await request.text();

  try {
    const upstream = await fetchInternal(
      '/auth/login',
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body,
      },
      request,
    );

    const envelope = await parseInternalJson<LoginResult>(upstream);

    if (!upstream.ok) {
      return NextResponse.json(envelope, { status: upstream.status });
    }

    return buildAuthSuccessResponse(envelope);
  } catch (error) {
    const upstream = catchUpstreamConnection(error);
    if (upstream) {
      return upstream;
    }
    throw error;
  }
}
