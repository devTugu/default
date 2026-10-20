'use client';

import { useTranslations } from 'next-intl';
import { useCallback, useState } from 'react';
import { toast } from 'sonner';
import { useSiteSettings, useUpdateSiteSettings } from '@/entities/site-settings';
import { Card, CardContent } from '@default/ui/primitives/card';
import { Label } from '@default/ui/primitives/label';
import { Switch } from '@default/ui/primitives/switch';
import { PermissionGate } from '@/features/auth';
import { PERMISSION_CODES } from '@/shared/config/permissions';

export function MfaPolicySettingsCard() {
  const t = useTranslations('security');
  const { data: settings, isLoading } = useSiteSettings();
  const updateSettings = useUpdateSiteSettings();
  const [pending, setPending] = useState(false);

  const enforced = settings?.security.enforcePrivilegedMfa ?? false;

  const onToggle = useCallback(
    async (checked: boolean) => {
      setPending(true);
      try {
        await updateSettings.mutateAsync({
          security: { enforcePrivilegedMfa: checked },
        });
        toast.success(
          checked ? t('platformMfaEnabledToast') : t('platformMfaDisabledToast'),
        );
      } catch {
        toast.error(t('platformMfaUpdateFailed'));
      } finally {
        setPending(false);
      }
    },
    [t, updateSettings],
  );

  return (
    <PermissionGate permission={PERMISSION_CODES.SITE_SETTING_UPDATE}>
      <Card>
        <CardContent className="flex items-center justify-between gap-4 pt-6">
          <Label htmlFor="platform-mfa-enforce" className="text-sm leading-snug">
            {t('platformMfaLabel')}
          </Label>
          <Switch
            id="platform-mfa-enforce"
            checked={enforced}
            disabled={isLoading || pending || updateSettings.isPending}
            onCheckedChange={(checked) => void onToggle(checked)}
          />
        </CardContent>
      </Card>
    </PermissionGate>
  );
}
