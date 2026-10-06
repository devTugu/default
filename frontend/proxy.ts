import type { NextRequest } from 'next/server';
import { proxy as handleProxy } from '@/processes/proxy';

export function proxy(request: NextRequest) {
  return handleProxy(request);
}

export const config = {
  matcher: [
    '/dashboard/:path*',
    '/dashboard',
    '/sign-in',
    '/blog',
    '/blog/:path*',
    '/projects',
    '/projects/:path*',
    '/pricing',
  ],
};
