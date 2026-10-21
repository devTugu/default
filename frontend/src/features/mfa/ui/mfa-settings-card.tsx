'use client';

import { ShieldCheck, ShieldOff } from 'lucide-react';
import { useTranslations } from 'next-intl';
import type { UserOutput } from '@/entities/user';
import { Alert, AlertDescription, AlertTitle } from '@default/ui/primitives/alert';
import { Badge } from '@default/ui/primitives/badge';
import { Button } from '@default/ui/primitives/button';
import { Switch } from '@default/ui/primitives/switch';
import { MfaSetupPanel } from './mfa-setup-panel';
import { MfaSettingsDisableSection } from './mfa-settings-disable-section';
import { useMfaSettingsCard } from './use-mfa-settings-card';

export interface MfaSettingsCardProps {
  user: UserOutput | null;
  onSessionUpdate: (user: UserOutput) => void;
}

export function MfaSettingsCard({ user, onSessionUpdate }: MfaSettingsCardProps) {
  const t = useTranslations('security');
  const mfa = useMfaSettingsCard(onSessionUpdate);

  const mfaEnabled = user?.mfaEnabled ?? false;
  const toggleOn = mfaEnabled || mfa.otpauthUrl != null;

  return (
    <div className="flex flex-col gap-4">
          <MfaSettingsCardHeader
            mfaEnabled={mfaEnabled}
            toggleOn={toggleOn}
            enrollPending={mfa.enroll.isPending}
            onToggle={mfa.handleToggle}
          />

          {!mfaEnabled && !mfa.otpauthUrl ? (
            <Alert>
              <AlertTitle>{t('mfaAlertDisabledTitle')}</AlertTitle>
              <AlertDescription>{t('mfaAlertDisabledDescription')}</AlertDescription>
            </Alert>
          ) : null}

          {mfa.otpauthUrl ? (
            <div className="border-t pt-4">
              <MfaSetupPanel
                otpauthUrl={mfa.otpauthUrl}
                isLoading={mfa.enroll.isPending}
                code={mfa.code}
                onCodeChange={mfa.setCode}
                onConfirm={mfa.handleConfirm}
                isConfirming={mfa.confirm.isPending}
                confirmLabel={t('confirmMfa')}
                confirmingLabel={t('confirming')}
                onBack={mfa.cancelSetup}
                backLabel={t('cancelSetup')}
              />
            </div>
          ) : null}

          {mfa.showDisable && mfaEnabled ? (
            <MfaSettingsDisableSection
              code={mfa.code}
              onCodeChange={mfa.setCode}
              onDisable={mfa.handleDisable}
              onCancel={mfa.cancelDisable}
              isPending={mfa.disable.isPending}
            />
          ) : null}

          {!mfa.otpauthUrl && !mfa.showDisable && mfaEnabled ? (
            <div className="flex flex-wrap gap-2 border-t pt-4">
              <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={() => mfa.setShowDisable(true)}
              >
                {t('disableMfa')}
              </Button>
            </div>
          ) : null}
    </div>
  );
}

function MfaSettingsCardHeader({
  mfaEnabled,
  toggleOn,
  enrollPending,
  onToggle,
}: {
  mfaEnabled: boolean;
  toggleOn: boolean;
  enrollPending: boolean;
  onToggle: (next: boolean) => void;
}) {
  const t = useTranslations('security');

  return (
    <div className="flex flex-wrap items-start justify-between gap-4">
      <div className="flex min-w-0 flex-1 gap-3">
        {toggleOn ? (
          <ShieldCheck className="text-emerald-600 mt-0.5 size-5 shrink-0 dark:text-emerald-400" />
        ) : (
          <ShieldOff className="text-muted-foreground mt-0.5 size-5 shrink-0" />
        )}
        <div className="space-y-2">
          <div className="flex flex-wrap items-center gap-2">
            <h3 className="text-sm font-semibold">
              {mfaEnabled ? t('mfaCardTitleEnabled') : t('mfaCardTitleDisabled')}
            </h3>
            <Badge variant={mfaEnabled ? 'default' : 'outline'}>
              {mfaEnabled ? t('mfaBadgeEnabled') : t('mfaBadgeOptional')}
            </Badge>
          </div>
          <p className="text-muted-foreground text-sm leading-relaxed">
            {mfaEnabled ? t('mfaEnabled') : t('mfaDisabledHint')}
          </p>
        </div>
      </div>
      <div className="flex items-center gap-2">
        <span className="text-muted-foreground text-xs">{t('switchOff')}</span>
        <Switch
          checked={toggleOn}
          disabled={enrollPending}
          aria-label={t('mfaToggleAria')}
          onCheckedChange={(checked) => {
            void onToggle(checked);
          }}
        />
        <span className="text-muted-foreground text-xs">{t('switchOn')}</span>
      </div>
    </div>
  );
}
