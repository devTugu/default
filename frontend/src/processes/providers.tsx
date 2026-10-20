'use client';

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { MotionConfig } from 'motion/react';
import { AppThemeProvider } from '@/shared/ui/app-theme-provider';
import { useState, type ReactNode } from 'react';
import { Toaster } from '@/shared/ui/sonner';
import { TooltipProvider } from '@default/ui/primitives/tooltip';
import { BrandThemeApplier } from '@/shared/ui/brand-theme-applier';

export function Providers({
  children,
  brandColor,
}: {
  children: ReactNode;
  brandColor: string | null;
}) {
  const [queryClient] = useState(
    () =>
      new QueryClient({
        defaultOptions: {
          queries: {
            staleTime: 60 * 1000,
            refetchOnWindowFocus: false,
          },
        },
      }),
  );

  return (
    <QueryClientProvider client={queryClient}>
      <AppThemeProvider>
        <MotionConfig reducedMotion="user">
          <TooltipProvider>
            <BrandThemeApplier initialBrandColor={brandColor} />
            {children}
            <Toaster richColors position="top-right" />
          </TooltipProvider>
        </MotionConfig>
      </AppThemeProvider>
    </QueryClientProvider>
  );
}
