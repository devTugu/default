"use client";

import type { ReactNode } from "react";
import { cn } from "@default/ui/lib/cn";
import { Badge } from "@default/ui/primitives/badge";

type DocsMarketingBlockFrameProps = {
  title: string;
  description?: string;
  isPro?: boolean;
  isFree?: boolean;
  previewClassName?: string;
  /** Mega menus / flyouts need visible overflow (e.g. topbar-02). */
  unclipPreview?: boolean;
  children: ReactNode;
};

/**
 * Preview shell aligned with block catalog cards:
 * title + description, then a full-bleed viewport (`transform-gpu` contains `fixed` navbars).
 */
export function DocsMarketingBlockFrame({
  title,
  description,
  isPro,
  isFree,
  previewClassName,
  unclipPreview,
  children,
}: DocsMarketingBlockFrameProps) {
  return (
    <section className="relative isolate overflow-hidden rounded-xl border border-border bg-card text-card-foreground shadow-sm">
      <div className="space-y-2 border-b border-border px-5 py-5 sm:px-6">
        <div className="flex flex-wrap items-center gap-2">
          <h2 className="text-lg font-semibold tracking-tight text-foreground sm:text-xl">
            {title}
          </h2>
          {isPro ? (
            <Badge variant="secondary" className="text-[10px] uppercase tracking-wide">
              Pro
            </Badge>
          ) : null}
          {!isPro && isFree ? (
            <Badge variant="outline" className="text-[10px] uppercase tracking-wide">
              Free
            </Badge>
          ) : null}
        </div>
        {description ? (
          <p className="max-w-3xl text-sm leading-relaxed text-muted-foreground">
            {description}
          </p>
        ) : null}
      </div>
      <div
        className={cn(
          "docs-block-preview relative w-full overflow-x-auto bg-background",
          unclipPreview ? "overflow-y-visible" : "overflow-y-hidden",
          previewClassName,
        )}
      >
        {children}
      </div>
    </section>
  );
}
