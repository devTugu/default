'use client';

import { Loader2 } from 'lucide-react';
import { useTranslations } from 'next-intl';
import {
  useAuthSessions,
  useMe,
  useRevokeAuthSession,
  useRevokeOtherAuthSessions,
} from '@default/hooks';
import { Button } from '@default/ui/primitives/button';
import { Card, CardContent } from '@default/ui/primitives/card';
import { getErrorMessage } from '@/shared/api';
import { toast } from 'sonner';

function formatLastSeen(iso: string, locale: string): string {
  return new Date(iso).toLocaleString(locale);
}

export function SiteSettingsSessionPanel() {
  const t = useTranslations('entities.siteSettings');
  const tCommon = useTranslations('common');
  const { data: me } = useMe();
  const sessions = useAuthSessions({ enabled: Boolean(me) });
  const revoke = useRevokeAuthSession();
  const revokeOthers = useRevokeOtherAuthSessions();

  if (sessions.isLoading) {
    return (
      <Card>
        <CardContent className="flex items-center gap-2 pt-6 text-sm text-muted-foreground">
          <Loader2 className="size-4 animate-spin" />
          {tCommon('loading')}
        </CardContent>
      </Card>
    );
  }

  if (sessions.isError) {
    return (
      <Card>
        <CardContent className="pt-6">
          <p className="text-destructive text-sm">{getErrorMessage(sessions.error)}</p>
        </CardContent>
      </Card>
    );
  }

  const items = sessions.data?.items ?? [];
  const locale =
    typeof navigator !== 'undefined' ? navigator.language : 'en-US';

  const handleRevoke = async (sessionId: number) => {
    try {
      await revoke.mutateAsync(sessionId);
      toast.success(t('sessionRevokedToast'));
    } catch (error) {
      toast.error(getErrorMessage(error));
    }
  };

  const handleRevokeOthers = async () => {
    try {
      await revokeOthers.mutateAsync();
      toast.success(t('sessionRevokedOthersToast'));
    } catch (error) {
      toast.error(getErrorMessage(error));
    }
  };

  return (
    <Card>
      <CardContent className="space-y-3 pt-6">
        <div className="flex flex-wrap items-center justify-end gap-2">
          {items.length > 1 ? (
            <Button
              type="button"
              variant="outline"
              size="sm"
              disabled={revokeOthers.isPending}
              onClick={() => void handleRevokeOthers()}
            >
              {revokeOthers.isPending ? (
                <Loader2 className="size-4 animate-spin" />
              ) : null}
              {t('sessionRevokeOthers')}
            </Button>
          ) : null}
        </div>

        <ul className="divide-y rounded-lg border">
          {items.map((session) => (
            <li
              key={session.id}
              className="flex flex-wrap items-center justify-between gap-3 px-3 py-3"
            >
              <div className="min-w-0">
                <p className="text-sm font-medium">
                  {session.deviceLabel}
                  {session.current ? (
                    <span className="text-muted-foreground ml-2 text-xs font-normal">
                      ({t('sessionCurrent')})
                    </span>
                  ) : null}
                </p>
                <p className="text-muted-foreground truncate text-xs">
                  {session.ipAddress ?? '—'} ·{' '}
                  {formatLastSeen(session.lastSeenAt, locale)}
                </p>
              </div>
              {session.current ? (
                <span className="bg-primary/10 text-primary rounded-full px-2 py-0.5 text-xs font-medium">
                  {t('sessionActiveBadge')}
                </span>
              ) : (
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  disabled={revoke.isPending}
                  onClick={() => void handleRevoke(session.id)}
                >
                  {t('sessionRevoke')}
                </Button>
              )}
            </li>
          ))}
        </ul>

        {items.length === 0 ? (
          <p className="text-muted-foreground text-sm">{t('sessionEmpty')}</p>
        ) : null}
      </CardContent>
    </Card>
  );
}
