"use client";

import { useLayoutEffect, useRef, type ReactNode } from "react";
import { cn } from "@default/ui/lib/cn";

/**
 * Scopes dashboard topbar block demos inside docs preview cards.
 * Sidebar uses `fixed` + `h-svh`; transform + min width match block catalog iframes.
 * Viewport `lg:` breakpoints are forced so nav rows match /ui desktop previews in narrow doc columns.
 */
export function DocsTopbarPreview({
  className,
  children,
  minWidthClassName = "min-w-[56rem]",
}: {
  className?: string;
  children: ReactNode;
  /** Prevent header nav/search overlap (horizontal scroll like /ui preview). */
  minWidthClassName?: string | false;
}) {
  const rootRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const el = rootRef.current;
    if (!el) return;
    el.scrollTo({ left: 0, top: 0 });
    el.parentElement?.scrollTo({ left: 0, top: 0 });
  }, [children]);

  return (
    <div
      ref={rootRef}
      className={cn(
        "docs-topbar-preview relative isolate z-0 w-full overflow-x-auto overflow-y-visible bg-background",
        minWidthClassName,
        "h-[32rem] min-h-[28rem]",
        "[&_[data-slot=sidebar-wrapper]]:!min-h-full [&_[data-slot=sidebar-wrapper]]:!h-full",
        "[&_[data-slot=sidebar-container]]:!top-0 [&_[data-slot=sidebar-container]]:!bottom-0",
        "[&_[data-slot=sidebar-container]]:!h-full [&_[data-slot=sidebar-container]]:!max-h-full",
        "[&_.min-h-dvh]:!min-h-full [&_.min-h-dvh]:!h-full",
        "[&_.min-h-screen]:!min-h-full [&_.min-h-screen]:!h-full",
        "[&_.h-svh]:!h-full",
        "[&_[data-slot=navigation-menu-viewport]]:z-[60]",
        className,
      )}
    >
      {children}
    </div>
  );
}
