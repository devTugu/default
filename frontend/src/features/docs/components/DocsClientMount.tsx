"use client";

import { useSyncExternalStore, type ReactNode } from "react";

function subscribe() {
  return () => {};
}

function getClientSnapshot() {
  return true;
}

function getServerSnapshot() {
  return false;
}

/**
 * Radix navigation menus / sidebars on one docs page can mismatch SSR markup.
 * Render block previews after mount to avoid hydration errors (layout shell stays SSR).
 */
export function DocsClientMount({
  children,
  fallback,
}: {
  children: ReactNode;
  fallback?: ReactNode;
}) {
  const mounted = useSyncExternalStore(
    subscribe,
    getClientSnapshot,
    getServerSnapshot,
  );

  if (!mounted) {
    return (
      fallback ?? (
        <div
          className="min-h-[28rem] w-full animate-pulse bg-muted/20"
          aria-hidden
        />
      )
    );
  }

  return children;
}
