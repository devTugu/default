"use client";

import { useLayoutEffect, useRef, type ReactNode } from "react";
import { cn } from "@default/ui/lib/cn";

/** Marketing navbar blocks — wide layouts, mega menus, sticky nav in docs cards. */
export function DocsNavbarPreview({
  className,
  children,
  minWidthClassName = "min-w-[64rem]",
}: {
  className?: string;
  children: ReactNode;
  minWidthClassName?: string | false;
}) {
  const rootRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const el = rootRef.current;
    if (!el) {
      return;
    }
    el.scrollTo({ left: 0, top: 0 });
    el.parentElement?.scrollTo({ left: 0, top: 0 });
  }, [children]);

  return (
    <div
      ref={rootRef}
      className={cn(
        "docs-navbar-preview relative isolate z-0 w-full overflow-x-auto overflow-y-visible bg-background transform-gpu",
        minWidthClassName,
        "min-h-[10rem] py-2",
        "[&_[data-slot=navigation-menu-viewport]]:z-[60]",
        "[&_[data-slot=navigation-menu-viewport-wrapper]]:z-[60]",
        className,
      )}
    >
      {children}
    </div>
  );
}
