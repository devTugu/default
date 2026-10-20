"use client";

import { ChevronRight, Home } from "lucide-react";
import Link from "next/link";
import {
  DocsMarketingBlockCatalogPage,
  type DocsMarketingBlockVariant,
} from "./DocsMarketingBlockCatalogPage";

type DocsDashboardBlockCatalogPageProps = {
  /** Last breadcrumb segment, e.g. "Topbars" — matches block catalog */
  segment: string;
  title: string;
  description: string;
  variants: DocsMarketingBlockVariant[];
};

export function DocsDashboardBlockCatalogPage({
  segment,
  title,
  description,
  variants,
}: DocsDashboardBlockCatalogPageProps) {
  return (
    <div className="w-full space-y-6">
      <nav aria-label="Breadcrumb" className="flex flex-wrap items-center gap-1.5 text-sm text-muted-foreground">
        <Link href="/docs" className="inline-flex items-center gap-1 transition-colors hover:text-foreground">
          <Home className="size-3.5 shrink-0" aria-hidden />
          <span className="sr-only">Home</span>
        </Link>
        <ChevronRight className="size-3.5 shrink-0 opacity-60" aria-hidden />
        <Link href="/docs/blocks" className="transition-colors hover:text-foreground">
          Blocks
        </Link>
        <ChevronRight className="size-3.5 shrink-0 opacity-60" aria-hidden />
        <span>Dashboard-ui</span>
        <ChevronRight className="size-3.5 shrink-0 opacity-60" aria-hidden />
        <span className="font-medium text-foreground">{segment}</span>
      </nav>

      <DocsMarketingBlockCatalogPage title={title} description={description} variants={variants} />
    </div>
  );
}
