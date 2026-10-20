"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Badge } from "@default/ui/primitives/badge";
import { Button } from "@default/ui/primitives/button";
import { cn } from "@default/ui/lib/cn";
import type { BlockCategoryEntry } from "../docs-blocks-catalog";

type DocsBlockCategoryCardProps = {
  entry: BlockCategoryEntry;
};

export function DocsBlockCategoryCard({ entry }: DocsBlockCategoryCardProps) {
  const ready = Boolean(entry.href) && !entry.comingSoon;

  const inner = (
    <>
      <div className="flex items-start justify-between gap-3">
        <h3 className="text-base font-semibold tracking-tight text-foreground">{entry.title}</h3>
        {entry.badge ? (
          <Badge variant="secondary" className="shrink-0 text-[10px] uppercase tracking-wide">
            {entry.badge}
          </Badge>
        ) : null}
        {entry.comingSoon && !entry.href ? (
          <Badge variant="outline" className="shrink-0 text-[10px] uppercase tracking-wide">
            Soon
          </Badge>
        ) : null}
      </div>
      {entry.blockCount ? (
        <p className="mt-2 text-sm text-muted-foreground">{entry.blockCount} blocks in catalog</p>
      ) : (
        <p className="mt-2 text-sm text-muted-foreground">Preview and copy-ready layouts</p>
      )}
      <div className="mt-4 flex items-center justify-between gap-2">
        <span className="text-sm font-medium text-muted-foreground">
          {ready ? "Available" : "Coming soon"}
        </span>
        {ready ? (
          <span className="inline-flex items-center gap-1 text-sm font-medium text-foreground">
            View All
            <ArrowRight className="size-3.5" aria-hidden />
          </span>
        ) : (
          <Button type="button" variant="ghost" size="sm" className="gap-1 px-2" disabled>
            View All
            <ArrowRight className="size-3.5" aria-hidden />
          </Button>
        )}
      </div>
    </>
  );

  return (
    <article
      className={cn(
        "flex flex-col rounded-xl border border-border bg-card p-5 shadow-sm transition-colors",
        ready && "hover:border-foreground/20 hover:bg-muted/30",
        !ready && "opacity-70",
      )}
    >
      {ready ? (
        <Link href={entry.href!} className="flex flex-1 flex-col outline-none focus-visible:ring-2 focus-visible:ring-ring">
          {inner}
        </Link>
      ) : (
        inner
      )}
    </article>
  );
}
