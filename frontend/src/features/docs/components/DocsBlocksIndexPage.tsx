"use client";

import { useState } from "react";
import Link from "next/link";
import { cn } from "@default/ui/lib/cn";
import {
  BLOCK_CATALOG_TABS,
  BLOCK_TAB_INTRO,
  categoriesForTab,
  type BlockCatalogTab,
} from "../docs-blocks-catalog";
import { DocsBlockCategoryCard } from "./DocsBlockCategoryCard";

export function DocsBlocksIndexPage() {
  const [tab, setTab] = useState<BlockCatalogTab>("marketing");
  const categories = categoriesForTab(tab);

  return (
    <article className="w-full space-y-10">
      <header className="space-y-4">
        <nav aria-label="Breadcrumb" className="text-sm text-muted-foreground">
          <Link href="/docs/blocks" className="transition-colors hover:text-foreground">
            Home
          </Link>
          <span className="mx-2 opacity-50">/</span>
          <span className="font-medium text-foreground">Blocks</span>
        </nav>
        <div className="space-y-3">
          <h1 className="text-3xl font-bold tracking-tight md:text-4xl lg:text-[2.5rem]">
            Blocks for building modern UI
          </h1>
          <p className="max-w-3xl text-base leading-relaxed text-muted-foreground">
            Browse reusable @default/ui blocks for marketing and dashboard layouts. Built with
            React, Tailwind CSS, and design tokens — preview, copy, and customize each block in
            this catalog.
          </p>
        </div>
      </header>

      <div className="flex flex-wrap gap-2 border-b border-border pb-1">
        {BLOCK_CATALOG_TABS.map(({ id, label }) => (
          <button
            key={id}
            type="button"
            onClick={() => setTab(id)}
            className={cn(
              "rounded-t-md px-4 py-2 text-sm font-medium transition-colors",
              tab === id
                ? "border border-b-0 border-border bg-background text-foreground"
                : "text-muted-foreground hover:text-foreground",
            )}
          >
            {label}
          </button>
        ))}
      </div>

      <section className="space-y-6">
        <div className="space-y-2">
          <h2 className="text-xl font-semibold tracking-tight">{BLOCK_CATALOG_TABS.find((t) => t.id === tab)?.label}</h2>
          <p className="max-w-3xl text-sm text-muted-foreground">{BLOCK_TAB_INTRO[tab]}</p>
        </div>
        <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {categories.map((entry) => (
            <li key={entry.slug}>
              <DocsBlockCategoryCard entry={entry} />
            </li>
          ))}
        </ul>
      </section>
    </article>
  );
}
