"use client";

import type { ComponentType } from "react";
import Link from "next/link";
import { Button } from "@default/ui/primitives/button";
import type { DocsDemoLoad } from "./docs-preview-types";
import {
  DocsBlockPreviewShell,
  type DocsBlockPreviewKind,
} from "./DocsBlockPreviewShell";
import { DocsDemoPreview } from "./DocsLazyPreview";
import { DocsInViewMount } from "./DocsInViewMount";
import { DocsMarketingBlockFrame } from "./DocsMarketingBlockFrame";

export type DocsMarketingBlockVariant = {
  title: string;
  description?: string;
  isPro?: boolean;
  /** Default registry shows a Free pill on open dashboard/marketing blocks. */
  isFree?: boolean;
  Component?: ComponentType;
  load?: DocsDemoLoad;
  previewClassName?: string;
  unclipPreview?: boolean;
  blockPreview?: DocsBlockPreviewKind;
  shellClassName?: string;
  minWidthClassName?: string | false;
  skeletonClassName?: string;
};

type DocsMarketingBlockCatalogPageProps = {
  title: string;
  description: string;
  variants: DocsMarketingBlockVariant[];
};

export function DocsMarketingBlockCatalogPage({
  title,
  description,
  variants,
}: DocsMarketingBlockCatalogPageProps) {
  return (
    <article className="w-full space-y-8">
      <header className="space-y-4">
        <div className="space-y-3">
          <h1 className="text-3xl font-bold tracking-tight md:text-4xl">{title}</h1>
          <p className="max-w-3xl text-base leading-relaxed text-muted-foreground">
            {description}
          </p>
        </div>
        <div className="flex flex-wrap items-center gap-2">
          <Button type="button" variant="secondary" size="sm" className="h-8" disabled>
            Limited Offer
          </Button>
        </div>
      </header>

      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-border pb-4">
        <Button variant="outline" size="sm" className="h-8" asChild>
          <Link href="/docs/blocks">View All Blocks</Link>
        </Button>
        <div className="flex flex-wrap items-center gap-2 text-sm text-muted-foreground">
          <span>Sort by</span>
          <Button variant="secondary" size="sm" type="button" className="h-8" disabled>
            Newest ▼
          </Button>
          <span className="mx-1 hidden sm:inline">·</span>
          <span>Price</span>
          <Button variant="ghost" size="sm" type="button" className="h-8" disabled>
            All ▼
          </Button>
        </div>
      </div>

      <div className="flex min-w-0 flex-col gap-10">
        {variants.map(
          ({
            title: blockTitle,
            description: blockDescription,
            isPro,
            isFree,
            Component,
            load,
            previewClassName,
            unclipPreview,
            blockPreview = "default",
            shellClassName,
            minWidthClassName,
            skeletonClassName,
          }) => (
            <DocsMarketingBlockFrame
              key={blockTitle}
              title={blockTitle}
              description={blockDescription}
              isPro={isPro}
              isFree={isFree}
              previewClassName={previewClassName}
              unclipPreview={unclipPreview}
            >
              <DocsInViewMount skeletonClassName={skeletonClassName}>
                <DocsBlockPreviewShell
                  kind={blockPreview}
                  shellClassName={shellClassName}
                  minWidthClassName={minWidthClassName}
                >
                  <DocsDemoPreview
                    Component={Component}
                    load={load}
                    skeletonClassName={skeletonClassName}
                    previewKey={blockTitle}
                  />
                </DocsBlockPreviewShell>
              </DocsInViewMount>
            </DocsMarketingBlockFrame>
          ),
        )}
      </div>
    </article>
  );
}
