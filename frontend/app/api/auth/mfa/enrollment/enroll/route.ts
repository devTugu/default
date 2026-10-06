import { NextRequest, NextResponse } from 'next/server';
import { fetchInternal, parseInternalJson } from '@/shared/lib/internal-api';
import { assertCsrf } from '@/shared/lib/bff-csrf';
import type { MfaEnrollmentResponse } from '@/shared/api/types';

export async function POST(request: NextRequest) {
  const csrfError = assertCsrf(request);
  if (csrfError) return csrfError;

  const body = await request.text();

  const upstream = await fetchInternal('/auth/mfa/enrollment/enroll', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body,
  });

  const envelope = await parseInternalJson<MfaEnrollmentResponse>(upstream);
  return NextResponse.json(envelope, { status: upstream.status });
}
