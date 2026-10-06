'use client';

import { useAuthStore } from '@/features/auth';
import { MfaSettingsPanel } from '@/features/mfa';

export function SecurityMfaSection() {
  const user = useAuthStore((s) => s.user);
  const setSession = useAuthStore((s) => s.setSession);

  return <MfaSettingsPanel user={user} onSessionUpdate={setSession} />;
}
