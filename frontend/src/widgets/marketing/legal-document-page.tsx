import Link from 'next/link';
import { ROUTES } from '@/shared/config/routes';

type LegalSection = {
  title: string;
  body: string;
};

type LegalDocumentPageProps = {
  title: string;
  intro: string;
  sections: LegalSection[];
  lastUpdated: string;
  backLabel: string;
};

export function LegalDocumentPage({
  title,
  intro,
  sections,
  lastUpdated,
  backLabel,
}: LegalDocumentPageProps) {
  return (
    <article className="mx-auto w-full max-w-3xl space-y-8 px-4 py-12 md:py-16">
      <header className="space-y-3 border-b border-border pb-8">
        <p className="text-muted-foreground text-sm">
          <Link href={ROUTES.HOME} className="hover:text-foreground">
            ← {backLabel}
          </Link>
        </p>
        <h1 className="text-3xl font-semibold tracking-tight">{title}</h1>
        <p className="text-muted-foreground text-sm">{lastUpdated}</p>
        <p className="text-muted-foreground leading-relaxed">{intro}</p>
      </header>
      <div className="space-y-8">
        {sections.map((section) => (
          <section key={section.title} className="space-y-2">
            <h2 className="text-lg font-medium">{section.title}</h2>
            <p className="text-muted-foreground leading-relaxed whitespace-pre-line">
              {section.body}
            </p>
          </section>
        ))}
      </div>
    </article>
  );
}
