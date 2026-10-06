import { getTranslations } from 'next-intl/server';
import { AdminPageHeader } from '@/widgets/admin-page-header';
import { SecurityMfaSection } from '@/widgets/security-mfa-section';

export default async function SecurityPage() {
  const tNav = await getTranslations('nav');
  const t = await getTranslations('security');

  return (
    <div className="space-y-6">
      <AdminPageHeader title={tNav('security')} description={t('pageDescription')} />
      <SecurityMfaSection />
    </div>
  );
}
