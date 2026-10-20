"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { ExternalLink, Search } from "lucide-react";
import { useMemo, useState } from "react";
import { Badge } from "@default/ui/primitives/badge";
import { Button } from "@default/ui/primitives/button";
import { Input } from "@default/ui/primitives/input";
import { cn } from "@default/ui/lib/cn";
import { DOCS_BLOCKS_NAV } from "../docs-blocks-nav";
import { DOCS_COMPONENTS_NAV } from "../docs-components-nav";

type DocsSidebarNavProps = {
  className?: string;
};

function matchesQuery(label: string, query: string): boolean {
  const q = query.trim().toLowerCase();
  if (!q) {
    return true;
  }
  return label.toLowerCase().includes(q);
}

export function DocsSidebarNav({ className }: DocsSidebarNavProps) {
  const pathname = usePathname();
  const [query, setQuery] = useState("");

  const blocksNav = useMemo(
    () => DOCS_BLOCKS_NAV.filter((item) => matchesQuery(item.label, query)),
    [query],
  );
  const componentsNav = useMemo(
    () => DOCS_COMPONENTS_NAV.filter((item) => matchesQuery(item.label, query)),
    [query],
  );

  return (
    <div className={cn("flex flex-col", className)}>
      <div className="space-y-3 border-b border-border p-4">
        <Button variant="outline" className="h-10 w-full justify-between gap-2 font-normal" asChild>
          <Link
            href="https://github.com/devTugu/default/issues/new/choose"
            target="_blank"
            rel="noopener noreferrer"
          >
            <span className="flex items-center gap-2">Request a component</span>
            <ExternalLink className="size-4 text-muted-foreground" />
          </Link>
        </Button>
        <div className="relative">
          <Search className="pointer-events-none absolute top-1/2 left-3 size-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            className="h-10 pl-9"
            placeholder="Filter sidebar…"
            aria-label="Filter docs navigation"
            value={query}
            onChange={(event) => setQuery(event.target.value)}
          />
        </div>
      </div>
      <div className="flex-1 overflow-y-auto p-3">
        {blocksNav.length ? (
          <>
            <p className="px-2 pb-2 text-xs font-medium text-muted-foreground">Blocks</p>
            <nav className="mb-4 flex flex-col gap-0.5">
              {blocksNav.map((item) => {
                const active =
                  item.slug === "all" ? pathname === item.href : pathname.startsWith(item.href);
                return (
                  <Link
                    key={item.slug}
                    href={item.href}
                    className={cn(
                      "rounded-md px-2 py-2 text-sm transition-colors",
                      active && "bg-muted font-medium text-foreground",
                      !active && "text-foreground hover:bg-muted",
                    )}
                  >
                    {item.label}
                  </Link>
                );
              })}
            </nav>
          </>
        ) : null}
        {componentsNav.length ? (
          <>
            <p className="px-2 pb-2 text-xs font-medium text-muted-foreground">Components</p>
            <nav className="flex flex-col gap-0.5">
              {componentsNav.map((item) => {
                const active = pathname === item.href || pathname.startsWith(`${item.href}/`);
                const isDisabled = item.href === "#";
                return (
                  <Link
                    key={item.slug}
                    href={item.href}
                    aria-disabled={isDisabled}
                    className={cn(
                      "flex items-center gap-2 rounded-md px-2 py-2 text-sm transition-colors",
                      active && "bg-muted font-medium text-foreground",
                      !active && !isDisabled && "text-foreground hover:bg-muted",
                      isDisabled && "pointer-events-none text-muted-foreground opacity-60",
                    )}
                  >
                    <span className="min-w-0 flex-1 truncate">{item.label}</span>
                    {item.isNew ? (
                      <Badge variant="default" className="h-5 shrink-0 px-1.5 text-[10px]">
                        +{item.isNew} New
                      </Badge>
                    ) : (
                      <span className="shrink-0 tabular-nums text-muted-foreground">
                        {item.count}
                      </span>
                    )}
                  </Link>
                );
              })}
            </nav>
          </>
        ) : null}
        {!blocksNav.length && !componentsNav.length ? (
          <p className="px-2 py-4 text-sm text-muted-foreground">No matches for “{query.trim()}”.</p>
        ) : null}
      </div>
    </div>
  );
}
