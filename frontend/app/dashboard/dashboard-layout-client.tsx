'use client';

import { Suspense } from 'react';
import { AuthGuard, SessionExpiryDialog, TokenRefreshScheduler } from '@/features/auth';
import {
  AdminBreadcrumbBar,
  AdminBreadcrumbProvider,
} from '@/widgets/admin-breadcrumb';
import { AdminDashboardHeader } from '@/widgets/admin-shell/admin-dashboard-header';
import { AppSidebar } from '@/widgets/app-sidebar';
import { CsrfBootstrap } from '@/widgets/csrf-bootstrap/csrf-bootstrap';
import { PageTransition } from '@/widgets/motion/page-transition';
import { DASHBOARD_SHELL_CLASS } from '@/shared/config/dashboard-shell';
import { useTranslations } from 'next-intl';
import { cn } from '@/shared/lib/utils';
import { SidebarInset, SidebarProvider } from '@/shared/ui/sidebar';

export function DashboardLayoutClient({
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
            '--sidebar-width': '17rem',
          } as React.CSSProperties
        }
      >
        <AppSidebar />
        <SidebarInset className="relative flex min-h-svh flex-col bg-background">
          <div className={cn(DASHBOARD_SHELL_CLASS, 'flex min-h-0 flex-1 flex-col')}>
            <AdminDashboardHeader />
            <PageTransition className="flex min-h-0 flex-1 flex-col">
              <main id="main-content" className="flex-1 py-4 md:py-6">
                <AdminBreadcrumbProvider>
                  <Suspense fallback={null}>
                    <AdminBreadcrumbBar />
                  </Suspense>
                  {children}
                </AdminBreadcrumbProvider>
              </main>
            </PageTransition>
          </div>
        </SidebarInset>
      </SidebarProvider>
    </AuthGuard>
  );
}
