'use client';

import { Info } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { useAuthStore } from '@/features/auth';
import { MfaPolicySettingsCard, MfaSettingsCard } from '@/features/mfa';
import { SettingsSection } from '@/shared/ui/settings-section';
import { SiteSettingsSessionPanel } from './site-settings-session-panel';

export function SiteSettingsSecuritySection({
  showPlatformPolicy,
}: {
  showPlatformPolicy: boolean;
}) {
  const t = useTranslations('entities.siteSettings');
  const user = useAuthStore((state) => state.user);
  const setSession = useAuthStore((state) => state.setSession);

  return (
    <div className="space-y-2">
      <div className="bg-card rounded-lg border px-4 py-3">
        <div className="flex gap-3">
          <Info className="text-muted-foreground mt-0.5 size-4 shrink-0" aria-hidden />
          <p className="text-muted-foreground text-sm">
            <span className="text-foreground font-medium">{t('sessionInfoLabel')}</span>{' '}
            {t('sessionInfoBody')}
          </p>
        </div>
      </div>

      <SettingsSection title={t('sectionSessionsTitle')} description={t('sectionSessionsDescription')}>
        <SiteSettingsSessionPanel />
      </SettingsSection>

      <SettingsSection
        title={t('sectionMfaTitle')}
        description={t('sectionMfaDescription')}
      >
        <MfaSettingsCard user={user} onSessionUpdate={setSession} />
      </SettingsSection>

      {showPlatformPolicy ? (
        <SettingsSection
          title={t('sectionPlatformMfaTitle')}
          description={t('sectionPlatformMfaDescription')}
        >
          <MfaPolicySettingsCard />
        </SettingsSection>
      ) : null}
    </div>
  );
}
