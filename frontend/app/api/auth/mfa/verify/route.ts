import { NextRequest, NextResponse } from 'next/server';
import { fetchInternal, parseInternalJson } from '@/shared/lib/internal-api';
import { buildTokenPairResponse } from '@/shared/lib/bff-auth-response';
import { assertCsrf } from '@/shared/lib/bff-csrf';
import type { TokenPair } from '@/shared/api/types';

export async function POST(request: NextRequest) {
  const csrfError = assertCsrf(request);
  if (csrfError) return csrfError;

  const body = await request.text();

  const upstream = await fetchInternal('/auth/mfa/verify', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body,
  });

  const envelope = await parseInternalJson<TokenPair>(upstream);

  if (!upstream.ok) {
    return NextResponse.json(envelope, { status: upstream.status });
  }

  return buildTokenPairResponse(envelope.data);
}
