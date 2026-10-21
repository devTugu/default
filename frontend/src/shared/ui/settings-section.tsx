import type { ReactNode } from 'react';
import { cn } from '@/shared/lib/utils';

/** Bordered content area for settings right column — one shell, no nested Card. */
export function SettingsSectionPanel({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <div
      className={cn(
        'bg-card text-card-foreground rounded-xl border p-5 shadow-sm',
        className,
      )}
    >
      {children}
    </div>
  );
}

/** Two-column settings row (label + content), aligned with chub admin /settings/security. */
export function SettingsSection({
  title,
  description,
  children,
  panel = true,
  panelClassName,
}: {
  title: string;
  description: string;
  children: ReactNode;
  /** False when children bring their own surface (e.g. data table). */
  panel?: boolean;
  panelClassName?: string;
}) {
  return (
    <section className="grid gap-6 border-b py-6 first:pt-0 last:border-b-0 lg:grid-cols-[minmax(0,14rem)_minmax(0,1fr)] lg:items-start lg:gap-10">
      <div className="space-y-1.5">
        <h2 className="text-base font-semibold">{title}</h2>
        <p className="text-muted-foreground text-sm leading-relaxed">
          {description}
        </p>
      </div>
      <div className="min-w-0">
        {panel ? (
          <SettingsSectionPanel className={panelClassName}>
            {children}
          </SettingsSectionPanel>
        ) : (
          children
        )}
      </div>
    </section>
  );
}
