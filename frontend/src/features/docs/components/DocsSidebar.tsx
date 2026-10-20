"use client";

import { cn } from "@default/ui/lib/cn";
import { DocsSidebarNav } from "./DocsSidebarNav";

type DocsSidebarProps = {
  className?: string;
};

export function DocsSidebar({ className }: DocsSidebarProps) {
  return (
    <aside
      className={cn(
        "flex w-[280px] shrink-0 flex-col border-r border-border bg-background",
        className,
      )}
    >
      <DocsSidebarNav className="min-h-0 flex-1" />
    </aside>
  );
}
