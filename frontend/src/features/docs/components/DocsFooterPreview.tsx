"use client";

import type { ReactNode } from "react";
import { cn } from "@default/ui/lib/cn";

/** Full-width footer blocks inside marketing preview cards (block catalog). */
export function DocsFooterPreview({
  className,
  children,
}: {
  className?: string;
  children: ReactNode;
}) {
  return (
    <div
      className={cn(
        "relative isolate w-full min-w-0 transform-gpu bg-background",
        className,
      )}
    >
      {children}
    </div>
  );
}
