'use client';

import { Suspense, useState } from 'react';
import { Search } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { Button } from '@default/ui/primitives/button';
import { Separator } from '@default/ui/primitives/separator';
import { SidebarTrigger } from '@/shared/ui/sidebar';
import { NavigationProgressBar } from '@/widgets/motion/navigation-progress-bar';
import { AdminCommandMenu } from './admin-command-menu';
import { AdminTopbar03Actions } from './admin-topbar-03-actions';

export function AdminDashboardHeader() {
  const [commandOpen, setCommandOpen] = useState(false);
  const t = useTranslations('dashboard.header');

  return (
    <>
      <header className="bg-background sticky top-0 z-40 pt-3">
        <div className="bg-card relative flex w-full items-center justify-between overflow-hidden rounded-xl border px-4 py-2 shadow-sm sm:px-6">
          <Suspense fallback={null}>
            <NavigationProgressBar embedded />
          </Suspense>
          <div className="flex min-w-0 items-center gap-1.5 sm:gap-2">
            <SidebarTrigger className="shrink-0" />
            <Separator
              orientation="vertical"
              className="hidden h-4! shrink-0 self-center sm:block"
            />
            <Button
              type="button"
              variant="ghost"
              size="icon"
              className="size-9 shrink-0 sm:hidden"
              aria-label={t('searchPlaceholder')}
              onClick={() => setCommandOpen(true)}
            >
              <Search className="size-4" />
            </Button>
            <Button
              type="button"
              variant="ghost"
              className="text-muted-foreground hidden h-9 shrink-0 gap-1.5 px-2.5 font-normal hover:bg-transparent sm:inline-flex dark:hover:bg-transparent"
              onClick={() => setCommandOpen(true)}
            >
              <Search className="size-4 shrink-0 opacity-60" />
              <span className="truncate">{t('searchPlaceholder')}</span>
              <kbd className="bg-muted pointer-events-none ml-1 hidden rounded border px-1.5 font-mono text-[10px] font-medium opacity-100 sm:inline-block">
                ⌘K
              </kbd>
            </Button>
          </div>
          <div className="flex shrink-0 items-center gap-1.5">
            <AdminTopbar03Actions />
          </div>
        </div>
      </header>
      <AdminCommandMenu open={commandOpen} onOpenChange={setCommandOpen} />
    </>
  );
}
