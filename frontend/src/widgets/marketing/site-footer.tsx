import { getLocale, getTranslations } from 'next-intl/server';
import type { SiteSettingsFooter } from '@/entities/site-settings';
import { pickLocalized } from '@/shared/lib/pick-localized';
import type { Locale } from '@/shared/i18n/config';
import { Container, Section } from '@/widgets/marketing/ui';
import { LocaleSwitcher } from '@/shared/i18n/locale-switcher';
import { Separator } from '@/shared/ui/separator';
import Link from 'next/link';

interface SiteFooterProps {
  footer: SiteSettingsFooter;
  siteName: string;
}

export async function SiteFooter({ footer, siteName }: SiteFooterProps) {
  const t = await getTranslations('marketing.footer');
  const locale = (await getLocale()) as Locale;
  const year = new Date().getFullYear();
  const copyright =
    pickLocalized(footer.copyright, locale) || t('copyright', { year, siteName });
  const tagline = pickLocalized(footer.tagline, locale);
  const socialLinks = footer.socialLinks.filter(
    (link) => typeof link.url === 'string' && link.url.trim().length > 0,
  );

  return (
    <footer className="border-border/60 relative overflow-hidden border-t">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-30"
        style={{
          background:
            'radial-gradient(ellipse at 20% 0%, oklch(0.62 0.19 264 / 0.15), transparent 50%), radial-gradient(ellipse at 80% 0%, oklch(0.58 0.24 292 / 0.12), transparent 50%)',
        }}
      />
      <Section className="relative py-16 md:py-20">
        <Container>
          <div className="space-y-4">
            <p className="text-lg font-semibold">{siteName}</p>
            {tagline ? (
              <p className="text-muted-foreground max-w-xs text-sm">{tagline}</p>
            ) : null}
            <LocaleSwitcher />
            {socialLinks.length > 0 ? (
              <div className="flex flex-wrap gap-4 pt-2">
                {socialLinks.map((link, index) => (
                  <Link
                    key={`${link.platform}-${link.url}-${index}`}
                    href={link.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-muted-foreground hover:text-foreground text-sm transition-colors"
                  >
                    {link.platform}
                  </Link>
                ))}
              </div>
            ) : null}
          </div>

          <Separator className="my-10" />
          <p className="text-muted-foreground text-sm">{copyright}</p>
        </Container>
      </Section>
    </footer>
  );
}
