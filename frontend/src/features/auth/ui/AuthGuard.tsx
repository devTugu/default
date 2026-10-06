'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useMe } from '@/entities/user';
import { useAuthStore } from '../model/store';
import { ROUTES } from '@/shared/config/routes';
import { redirectToLogin } from '@/shared/lib/clear-client-session';
import { sessionHint } from '@/shared/lib/session-hint';
import { Skeleton } from '@/shared/ui/skeleton';

interface AuthGuardProps {
  children: React.ReactNode;
}

export const AuthGuard = ({ children }: AuthGuardProps) => {
  const router = useRouter();
  const setSession = useAuthStore((s) => s.setSession);
  const clearSession = useAuthStore((s) => s.clearSession);
  const user = useAuthStore((s) => s.user);
  const hasSession = sessionHint.hasSession();

  const { data, isLoading, isError } = useMe(hasSession);

  useEffect(() => {
    if (!hasSession) {
      router.replace(ROUTES.LOGIN);
      return;
    }
    if (data) setSession(data);
    if (isError) {
      clearSession();
      redirectToLogin();
    }
  }, [hasSession, data, isError, router, setSession, clearSession]);

  if (!hasSession || isLoading || (!user && !data)) {
    return (
      <div className="flex min-h-svh flex-col gap-4 p-6">
        <Skeleton className="h-8 w-48" />
        <Skeleton className="h-64 w-full" />
      </div>
    );
  }

  return <>{children}</>;
};
