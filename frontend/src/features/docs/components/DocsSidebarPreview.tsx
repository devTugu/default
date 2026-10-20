"use client";

import type { ReactNode } from "react";
import { cn } from "@default/ui/lib/cn";

/**
 * Scopes default Sidebar demos inside docs preview cards.
 * Sidebar uses `fixed` + `min-h-svh`; transform + explicit height keep it from covering the docs shell.
 */
export function DocsSidebarPreview({
  className,
  children,
}: {
  className?: string;
  children: ReactNode;
}) {
  return (
    <div
      className={cn(
        "relative isolate h-[32rem] w-full min-h-[28rem] transform-gpu overflow-hidden bg-background",
        "[&_[data-slot=sidebar-wrapper]]:!min-h-0 [&_[data-slot=sidebar-wrapper]]:h-full",
        "[&_[data-slot=sidebar-container]]:!h-full [&_[data-slot=sidebar-container]]:max-h-full",
        className,
      )}
    >
      {children}
    </div>
  );
}
