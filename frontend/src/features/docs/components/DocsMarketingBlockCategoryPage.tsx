"use client";

import type { ReactNode } from "react";
import { ChevronRight, Home } from "lucide-react";
import Link from "next/link";
import type { BlockCatalogTab } from "../docs-blocks-catalog";

const TAB_LABEL: Record<BlockCatalogTab, string> = {
  marketing: "Marketing",
  ecommerce: "Ecommerce",
  dashboard: "Dashboard UI",
  applications: "Applications",
};

type DocsMarketingBlockCategoryPageProps = {
  tab: BlockCatalogTab;
  segment: string;
  children: ReactNode;
};

export function DocsMarketingBlockCategoryPage({
  tab,
  segment,
  children,
}: DocsMarketingBlockCategoryPageProps) {
  return (
    <div className="w-full space-y-6">
      <nav
        aria-label="Breadcrumb"
        className="flex flex-wrap items-center gap-1.5 text-sm text-muted-foreground"
      >
        <Link
          href="/docs/blocks"
          className="inline-flex items-center gap-1 transition-colors hover:text-foreground"
        >
          <Home className="size-3.5 shrink-0" aria-hidden />
          <span className="sr-only">Home</span>
        </Link>
        <ChevronRight className="size-3.5 shrink-0 opacity-60" aria-hidden />
        <Link href="/docs/blocks" className="transition-colors hover:text-foreground">
          Blocks
        </Link>
        <ChevronRight className="size-3.5 shrink-0 opacity-60" aria-hidden />
        <span>{TAB_LABEL[tab]}</span>
        <ChevronRight className="size-3.5 shrink-0 opacity-60" aria-hidden />
        <span className="font-medium capitalize text-foreground">{segment}</span>
      </nav>

      {children}
    </div>
  );
}
