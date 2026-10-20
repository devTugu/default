"use client";

import { cn } from "@default/ui/lib/cn";

type DocsPreviewSkeletonProps = {
  className?: string;
};

export function DocsPreviewSkeleton({ className }: DocsPreviewSkeletonProps) {
  return (
    <div
      className={cn(
        "min-h-[12rem] w-full animate-pulse rounded-md bg-muted/25",
        className,
      )}
      aria-hidden
    />
  );
}
