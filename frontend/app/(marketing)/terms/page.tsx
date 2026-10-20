import type { Metadata } from 'next';
import { getTranslations } from 'next-intl/server';
import { LegalDocumentPage } from '@/widgets/marketing/legal-document-page';

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations('marketing.legal.terms');
  return {
    title: t('title'),
    description: t('metaDescription'),
  };
}

const TERMS_SECTION_KEYS = [
  ['s1Title', 's1Body'],
  ['s2Title', 's2Body'],
  ['s3Title', 's3Body'],
  ['s4Title', 's4Body'],
] as const;

export default async function TermsPage() {
  const t = await getTranslations('marketing.legal.terms');
  const tLegal = await getTranslations('marketing.legal');
  const sections = TERMS_SECTION_KEYS.map(([titleKey, bodyKey]) => ({
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
