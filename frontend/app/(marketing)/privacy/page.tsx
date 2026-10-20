import type { Metadata } from 'next';
import { getTranslations } from 'next-intl/server';
import { LegalDocumentPage } from '@/widgets/marketing/legal-document-page';

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations('marketing.legal.privacy');
  return {
    title: t('title'),
    description: t('metaDescription'),
  };
}

const PRIVACY_SECTION_KEYS = [
  ['s1Title', 's1Body'],
  ['s2Title', 's2Body'],
  ['s3Title', 's3Body'],
  ['s4Title', 's4Body'],
] as const;

export default async function PrivacyPage() {
  const t = await getTranslations('marketing.legal.privacy');
  const tLegal = await getTranslations('marketing.legal');
  const sections = PRIVACY_SECTION_KEYS.map(([titleKey, bodyKey]) => ({
    title: t(titleKey),
    body: t(bodyKey),
  }));

  return (
    <LegalDocumentPage
      title={t('title')}
      intro={t('intro')}
      lastUpdated={t('lastUpdated')}
      backLabel={tLegal('backToHome')}
      sections={sections}
    />
  );
}
