"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Github, Menu } from "lucide-react";
import { useState, type ReactNode } from "react";
import { cn } from "@default/ui/lib/cn";
import { ThemeToggle } from "@/shared/ui/theme-toggle";
import { Button } from "@default/ui/primitives/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@default/ui/primitives/sheet";
import { DOCS_PRIMARY_NAV } from "../docs-primary-nav";
type DocsHeaderProps = {
  /** Sidebar toggle + mobile nav (rendered beside logo). */
  sidebarControl?: ReactNode;
};

function activePrimaryNav(pathname: string, label: string): boolean {
  if (label === "Components") {
    return pathname.startsWith("/docs/components");
  }
  if (label === "Blocks") {
    return pathname.startsWith("/docs/blocks");
  }
  return false;
}

export function DocsHeader({ sidebarControl }: DocsHeaderProps) {
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-30 border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/80">
      <div className="mx-auto flex h-14 max-w-[1600px] items-center justify-between gap-3 px-4 md:px-6">
        <div className="flex min-w-0 items-center gap-2">
          {sidebarControl}
          <Link href="/docs/blocks" className="flex min-w-0 items-center gap-0.5">
          <span className="relative inline-flex items-center">
            <span
              aria-hidden
              className="absolute -left-1 size-7 rounded-full bg-primary opacity-90"
            />
            <span className="relative text-lg font-semibold tracking-tight">
              default<span className="text-muted-foreground">.</span>
            </span>
          </span>
          </Link>
        </div>

        <div className="flex items-center gap-1 sm:gap-2">
          <ThemeToggle className="size-9" />
          <Button variant="ghost" size="icon-sm" asChild>
            <Link href="https://github.com/devTugu/default" aria-label="GitHub">
              <Github className="size-4" />
            </Link>
          </Button>
          <Sheet open={menuOpen} onOpenChange={setMenuOpen}>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon-sm" className="md:hidden" aria-label="Menu">
                <Menu className="size-4" />
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-[min(100vw,320px)]">
              <SheetHeader>
                <SheetTitle>Menu</SheetTitle>
              </SheetHeader>
              <nav className="mt-4 flex flex-col gap-1">
                {DOCS_PRIMARY_NAV.map((item) => (
                  <Link
                    key={item.label}
                    href={item.href}
                    onClick={() => setMenuOpen(false)}
                    className="rounded-md px-3 py-2 text-sm font-medium hover:bg-muted"
                  >
                    {item.label}
                  </Link>
                ))}
              </nav>
            </SheetContent>
          </Sheet>
        </div>
      </div>
      <nav
        aria-label="Primary"
        className="hidden border-t border-border md:block"
      >
        <div className="mx-auto flex max-w-[1600px] gap-1 overflow-x-auto px-4 py-2 md:px-6">
          {DOCS_PRIMARY_NAV.map((item) => {
            const active = activePrimaryNav(pathname, item.label);
            return (
              <Link
                key={item.label}
                href={item.href}
                className={cn(
                  "shrink-0 rounded-md px-3 py-1.5 text-sm transition-colors",
                  active
                    ? "bg-muted font-medium text-foreground"
                    : "text-muted-foreground hover:bg-muted hover:text-foreground",
                )}
              >
                {item.label}
              </Link>
            );
          })}
        </div>
      </nav>
    </header>
  );
}
