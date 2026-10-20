'use client';

import Link from 'next/link';
import { ChevronLeft, ChevronRight, DotIcon, LayoutDashboard } from 'lucide-react';
import { ROUTES } from '@/shared/config/routes';
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from '@default/ui/primitives/breadcrumb';
import type { AdminBreadcrumbItem } from './types';

type AdminInteractiveBreadcrumbProps = {
  items: AdminBreadcrumbItem[];
  onBack: () => void;
  onForward: () => void;
  className?: string;
};

export function AdminInteractiveBreadcrumb({
  items,
  onBack,
  onForward,
  className,
}: AdminInteractiveBreadcrumbProps) {
  if (items.length === 0) {
    return null;
  }

  const lastIndex = items.length - 1;

  return (
    <Breadcrumb className={className}>
      <BreadcrumbList className="h-8 gap-2 rounded-lg border border-border px-3 text-sm">
        <li className="bg-muted mr-1 flex items-center rounded-full px-1.5 py-0.5">
          <button
            type="button"
            onClick={onBack}
            className="text-foreground cursor-pointer rounded-sm p-0.5 hover:bg-background/80"
            aria-label="Go back"
          >
            <ChevronLeft className="size-4" />
          </button>
          <button
            type="button"
            onClick={onForward}
            className="text-foreground/60 cursor-pointer rounded-sm p-0.5 hover:bg-background/80 hover:text-foreground"
            aria-label="Go forward"
          >
            <ChevronRight className="size-4" />
          </button>
        </li>

        <BreadcrumbItem>
          <BreadcrumbLink asChild>
            <Link href={ROUTES.DASHBOARD} className="flex items-center">
              <LayoutDashboard className="size-4" />
              <span className="sr-only">Dashboard</span>
            </Link>
          </BreadcrumbLink>
        </BreadcrumbItem>

        {items.map((item, index) => {
          const Icon = item.icon;
          const isLast = index === lastIndex;
          const content = (
            <>
              {Icon ? <Icon className="size-4 shrink-0" /> : null}
              <span>{item.label}</span>
            </>
          );

          return (
            <span key={`${item.label}-${index}`} className="contents">
              <BreadcrumbSeparator>
                <DotIcon className="size-4" />
              </BreadcrumbSeparator>
              <BreadcrumbItem>
                {isLast ? (
                  <BreadcrumbPage className="flex items-center gap-2">
                    {content}
                  </BreadcrumbPage>
                ) : item.href ? (
                  <BreadcrumbLink asChild className="flex items-center gap-2">
                    <Link href={item.href}>{content}</Link>
                  </BreadcrumbLink>
                ) : (
                  <span className="text-muted-foreground flex items-center gap-2">
                    {content}
                  </span>
                )}
              </BreadcrumbItem>
            </span>
          );
        })}
      </BreadcrumbList>
    </Breadcrumb>
  );
}
