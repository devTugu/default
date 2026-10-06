'use client';

import { AuthGuard, SessionExpiryDialog, TokenRefreshScheduler } from '@/features/auth';
import { AppSidebar, SiteHeader } from '@/widgets/app-sidebar';
import { CsrfBootstrap } from '@/widgets/csrf-bootstrap/csrf-bootstrap';
import { PageTransition } from '@/widgets/motion/page-transition';
import { useTranslations } from 'next-intl';
import { SidebarInset, SidebarProvider } from '@/shared/ui/sidebar';

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const t = useTranslations('common');

  return (
    <AuthGuard>
      <CsrfBootstrap />
      <TokenRefreshScheduler />
      <SessionExpiryDialog />
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-50 focus:rounded-md focus:bg-background focus:px-3 focus:py-2 focus:shadow"
      >
        {t('skipToContent')}
      </a>
      <SidebarProvider
        style={
          {
            '--sidebar-width': '16rem',
          } as React.CSSProperties
        }
      >
        <AppSidebar />
        <SidebarInset>
          <SiteHeader />
          <PageTransition className="flex flex-1 flex-col p-4 md:p-6">
            <main id="main-content">{children}</main>
          </PageTransition>
        </SidebarInset>
      </SidebarProvider>
    </AuthGuard>
  );
}
