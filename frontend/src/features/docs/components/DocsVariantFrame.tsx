"use client";

import type { ReactNode } from "react";
import { Code2, Sparkles } from "lucide-react";
import { cn } from "@default/ui/lib/cn";
import { Badge } from "@default/ui/primitives/badge";
import { Button } from "@default/ui/primitives/button";

type DocsVariantFrameProps = {
  label: string;
  isPro?: boolean;
  isNew?: boolean;
  className?: string;
  previewClassName?: string;
  children: ReactNode;
};

export function DocsVariantFrame({
  label,
  isPro,
  isNew,
  className,
  previewClassName,
  children,
}: DocsVariantFrameProps) {
  return (
    <section
      className={cn(
        "docs-variant-frame flex min-w-0 flex-col overflow-x-hidden rounded-md border border-primary/8 bg-background",
        className,
      )}
    >
      <div className="flex h-10 items-center justify-between gap-1 border-b border-muted pl-4 pr-3">
        <div className="flex min-w-0 items-center gap-2">
          <p className="truncate text-sm font-medium text-foreground">{label}</p>
          {isPro ? (
            <Badge variant="secondary" className="shrink-0 text-[10px] uppercase tracking-wide">
              Pro
            </Badge>
          ) : null}
          {isNew ? (
            <Badge className="shrink-0 bg-emerald-600 text-[10px] uppercase tracking-wide text-white hover:bg-emerald-600">
              New
            </Badge>
          ) : null}
        </div>
        <div className="flex shrink-0 items-center gap-1">
          <Button variant="ghost" size="icon-sm" aria-label="Customize with AI">
            <Sparkles className="size-4" />
          </Button>
          <Button variant="ghost" size="icon-sm" aria-label="View code">
            <Code2 className="size-4" />
          </Button>
        </div>
      </div>
      <div
        className={cn(
          "docs-component-preview flex min-h-48 w-full min-w-0 flex-1 items-center justify-center px-4 py-5",
          previewClassName,
        )}
      >
        {children}
      </div>
    </section>
  );
}
