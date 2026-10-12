'use client';

import { Smartphone } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { MfaSetupConfirmSection } from './mfa-setup-confirm-section';
import { MfaSetupQrSection } from './mfa-setup-qr-section';

interface MfaSetupPanelProps {
  otpauthUrl: string | null;
  isLoading?: boolean;
  code: string;
  onCodeChange: (value: string) => void;
  onConfirm: () => void | Promise<void>;
  isConfirming?: boolean;
  onBack?: () => void;
  confirmLabel?: string;
  confirmingLabel?: string;
  backLabel?: string;
}

export function MfaSetupPanel({
  otpauthUrl,
  isLoading = false,
  code,
  onCodeChange,
  onConfirm,
  isConfirming = false,
  onBack,
  confirmLabel,
  confirmingLabel,
  backLabel,
}: MfaSetupPanelProps) {
  const t = useTranslations('mfa');
  const canConfirm = Boolean(otpauthUrl) && code.length === 6 && !isLoading;

  return (
    <div className="space-y-6">
      <div className="rounded-lg border bg-muted/30 p-4">
        <div className="flex items-start gap-3">
          <div className="mt-0.5 flex size-8 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary">
            <Smartphone className="size-4" />
          </div>
          <div className="space-y-2 text-sm">
            <p className="font-medium">{t('useAuthenticatorApp')}</p>
            <p className="text-muted-foreground">{t('authenticatorAppsHint')}</p>
          </div>
        </div>
      </div>

      <MfaSetupQrSection otpauthUrl={otpauthUrl} isLoading={isLoading} />

      <MfaSetupConfirmSection
        code={code}
        onCodeChange={onCodeChange}
        onConfirm={onConfirm}
        isConfirming={isConfirming}
        canConfirm={canConfirm}
        isLoading={isLoading}
        otpauthUrl={otpauthUrl}
        onBack={onBack}
        confirmLabel={confirmLabel}
        confirmingLabel={confirmingLabel}
        backLabel={backLabel}
      />
    </div>
  );
}
