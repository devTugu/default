import type { ReactNode } from 'react';

/** Two-column settings row (label + content), aligned with chub admin /settings/security. */
export function SettingsSection({
  title,
  description,
  children,
}: {
  title: string;
  description: string;
  children: ReactNode;
}) {
  return (
    <section className="grid gap-6 border-b py-8 last:border-b-0 lg:grid-cols-[minmax(0,14rem)_minmax(0,1fr)] lg:gap-10">
      <div className="space-y-1.5">
        <h2 className="text-base font-semibold">{title}</h2>
        <p className="text-muted-foreground text-sm leading-relaxed">{description}</p>
      </div>
      <div className="min-w-0">{children}</div>
    </section>
  );
}
