'use client';

import { cn } from '@/shared/lib/utils';
import { AdminContentLocaleProvider } from '@/shared/i18n/admin-content-locale-context';
import { AdminContentLocaleTabs } from '@/shared/ui/admin-content-locale-tabs';
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from '@/shared/ui/sheet';

const sizeClasses = {
  sm: 'sm:max-w-sm',
  md: 'sm:max-w-md',
  lg: 'sm:max-w-lg',
} as const;

interface AdminFormSheetProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  title: string;
  description?: string;
  size?: keyof typeof sizeClasses;
  /** Show Strapi-style EN/MN content locale tabs (default true for CMS forms). */
  showContentLocale?: boolean;
  children: React.ReactNode;
  footer?: React.ReactNode;
}

export function AdminFormSheet({
  open,
  onOpenChange,
  title,
  description,
  size = 'md',
  showContentLocale = true,
  children,
  footer,
}: AdminFormSheetProps) {
  const sheetBody = (
    <>
      <SheetHeader className="shrink-0 border-b px-6 pt-6 pb-4">
        <SheetTitle>{title}</SheetTitle>
        {description ? (
          <SheetDescription>{description}</SheetDescription>
        ) : (
          <SheetDescription className="sr-only">{title}</SheetDescription>
        )}
      </SheetHeader>
      {showContentLocale ? <AdminContentLocaleTabs /> : null}
      <div className="flex-1 overflow-y-auto px-6 py-4">{children}</div>
      {footer ? (
        <div className="shrink-0 border-t px-6 py-4">{footer}</div>
      ) : null}
    </>
  );

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent
        className={cn(
          'flex h-full w-full flex-col gap-0 p-0',
          sizeClasses[size],
        )}
      >
        {showContentLocale ? (
          <AdminContentLocaleProvider resetKey={open}>{sheetBody}</AdminContentLocaleProvider>
        ) : (
          sheetBody
        )}
      </SheetContent>
    </Sheet>
  );
}
