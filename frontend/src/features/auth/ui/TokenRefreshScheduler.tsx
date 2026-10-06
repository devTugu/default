'use client';

import { useTokenRefreshScheduler } from '../hooks/use-token-refresh-scheduler';

export function TokenRefreshScheduler() {
  useTokenRefreshScheduler();
  return null;
}
