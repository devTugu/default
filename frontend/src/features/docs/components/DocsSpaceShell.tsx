"use client";

import { PanelLeft } from "lucide-react";
import { useState, type ReactNode } from "react";
import { Button } from "@default/ui/primitives/button";
import { Sheet, SheetContent, SheetTitle, SheetTrigger } from "@default/ui/primitives/sheet";
import { cn } from "@default/ui/lib/cn";
import { DocsHeader } from "./DocsHeader";
import { DocsSidebar } from "./DocsSidebar";

type DocsSpaceShellProps = {
  children: ReactNode;
};

export function DocsSpaceShell({ children }: DocsSpaceShellProps) {
  const [desktopSidebarOpen, setDesktopSidebarOpen] = useState(true);

  return (
    <div className="flex min-h-screen flex-col bg-background text-foreground">
      <DocsHeader
        sidebarControl={
          <>
            <Sheet>
              <SheetTrigger asChild>
                <Button
                  type="button"
                  variant="ghost"
                  size="icon-sm"
                  className="lg:hidden"
                  aria-label="Open docs navigation"
                >
                  <PanelLeft className="size-4" />
                </Button>
              </SheetTrigger>
              <SheetContent side="left" className="w-[min(100vw,300px)] p-0">
                <SheetTitle className="sr-only">Docs navigation</SheetTitle>
                <DocsSidebar className="flex h-full w-full border-0" />
              </SheetContent>
            </Sheet>
            <Button
              type="button"
              variant="ghost"
              size="icon-sm"
              className="hidden lg:inline-flex"
              onClick={() => setDesktopSidebarOpen((open) => !open)}
              aria-label="Toggle sidebar"
              aria-expanded={desktopSidebarOpen}
            >
              <PanelLeft className="size-4" />
            </Button>
          </>
        }
      />
      <div className="mx-auto flex w-full max-w-[1600px] flex-1 items-stretch">
        <DocsSidebar className={cn("hidden lg:flex", !desktopSidebarOpen && "lg:hidden")} />
        <main className="docs-content-surface relative min-w-0 flex-1 px-4 py-8 sm:px-8 sm:pe-6 md:py-10">
          {children}
        </main>
      </div>
    </div>
  );
}
