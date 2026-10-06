import { NextRequest, NextResponse } from 'next/server';
import { fetchInternal, parseInternalJson } from '@/shared/lib/internal-api';

export async function GET(request: NextRequest) {
  const state = request.nextUrl.searchParams.get('state') ?? crypto.randomUUID();

  const upstream = await fetchInternal(
    `/auth/oauth/authorize?state=${encodeURIComponent(state)}`,
    { method: 'GET' },
  );

  const envelope = await parseInternalJson<{ url: string }>(upstream);

  if (!upstream.ok) {
    return NextResponse.json(envelope, { status: upstream.status });
  }

  return NextResponse.json(envelope);
}
