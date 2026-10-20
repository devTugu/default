"use client";

import Link from "next/link";
import { DOCS_COMPONENTS_NAV } from "../docs-components-nav";

export function DocsComponentsIndexPage() {
  return (
    <article className="w-full space-y-8">
      <header className="space-y-3">
        <h1 className="text-3xl font-bold tracking-tight md:text-4xl">@default/ui Components</h1>
        <p className="max-w-3xl text-base text-muted-foreground">
          Explore open-source component demos — preview variants, copy from{" "}
          <code className="text-sm">@default/ui</code>, and customize with your design tokens.
        </p>
      </header>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {DOCS_COMPONENTS_NAV.map((item) => (
          <Link
            key={item.slug}
            href={item.href.startsWith("#") ? `/docs/components/${item.slug}` : item.href}
            className="group rounded-lg border border-primary/10 bg-card p-4 transition-colors hover:border-primary/25"
          >
            <div className="flex items-center justify-between gap-2">
              <h2 className="font-semibold group-hover:text-primary">{item.label}</h2>
              {item.isNew ? (
                <span className="rounded-full bg-primary/10 px-2 py-0.5 text-xs font-medium text-primary">
                  +{item.isNew} New
                </span>
              ) : (
                <span className="text-sm text-muted-foreground">{item.count}</span>
              )}
            </div>
            <p className="mt-1 text-sm text-muted-foreground">View all variants</p>
          </Link>
        ))}
      </div>
    </article>
  );
}
