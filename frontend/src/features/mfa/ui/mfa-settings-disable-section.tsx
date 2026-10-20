'use client';

import { useTranslations } from 'next-intl';
import { Alert, AlertDescription, AlertTitle } from '@default/ui/primitives/alert';
import { Button } from '@default/ui/primitives/button';
import { Label } from '@default/ui/primitives/label';
import { TotpCodeInput } from './totp-code-input';

type MfaSettingsDisableSectionProps = {
  code: string;
  onCodeChange: (value: string) => void;
  onDisable: () => void;
  onCancel: () => void;
  isPending: boolean;
};

export function MfaSettingsDisableSection({
  code,
  onCodeChange,
  onDisable,
  onCancel,
  isPending,
}: MfaSettingsDisableSectionProps) {
  const t = useTranslations('security');
  const tCommon = useTranslations('common');

  return (
    <div className="space-y-4 border-t pt-4">
      <Alert variant="destructive">
        <AlertTitle>{t('mfaDisableAlertTitle')}</AlertTitle>
        <AlertDescription>{t('mfaDisableAlertDescription')}</AlertDescription>
      </Alert>
      <div className="space-y-2">
        <Label htmlFor="mfa-disable-code">{t('currentCode')}</Label>
        <TotpCodeInput
          id="mfa-disable-code"
          value={code}
          onChange={onCodeChange}
          disabled={isPending}
        />
      </div>
      <div className="flex flex-wrap gap-2">
        <Button
          type="button"
          variant="destructive"
          size="sm"
          onClick={onDisable}
          disabled={isPending || code.length !== 6}
        >
          {isPending ? t('disabling') : t('disableMfa')}
        </Button>
        <Button type="button" variant="outline" size="sm" onClick={onCancel}>
          {tCommon('cancel')}
        </Button>
      </div>
    </div>
  );
}
