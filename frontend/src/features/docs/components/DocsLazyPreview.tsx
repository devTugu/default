"use client";

import type { ComponentType } from "react";
import { useEffect, useState } from "react";
import type { DocsDemoLoad } from "./docs-preview-types";
import { DocsPreviewSkeleton } from "./DocsPreviewSkeleton";

type DocsLazyPreviewInnerProps = {
  load: DocsDemoLoad;
  skeletonClassName?: string;
};

function DocsLazyPreviewInner({ load, skeletonClassName }: DocsLazyPreviewInnerProps) {
  const [Demo, setDemo] = useState<ComponentType | null>(null);
  const [loadError, setLoadError] = useState<string | null>(null);

  useEffect(() => {
    let active = true;
    void load()
      .then((mod) => {
        if (!active || typeof mod !== "object" || mod === null) {
          return;
        }
        const record = mod as Record<string, unknown>;
        const candidate = record.default;
        if (typeof candidate === "function") {
          setDemo(() => candidate as ComponentType);
          return;
        }
        setLoadError("Preview module has no default export.");
      })
      .catch((error: unknown) => {
        if (!active) {
          return;
        }
        const message = error instanceof Error ? error.message : "Failed to load preview.";
        setLoadError(message);
      });
    return () => {
      active = false;
    };
  }, [load]);

  if (loadError) {
    return (
      <p className="rounded-md border border-destructive/30 bg-destructive/5 px-4 py-6 text-sm text-destructive">
        {loadError}
      </p>
    );
  }

  if (!Demo) {
    return <DocsPreviewSkeleton className={skeletonClassName} />;
  }

  return <Demo />;
}

type DocsLazyPreviewProps = {
  load: DocsDemoLoad;
  skeletonClassName?: string;
  /** Remount when the lazy target changes (resets demo state without sync setState in effects). */
  previewKey?: string;
};

export function DocsLazyPreview({
  load,
  skeletonClassName,
  previewKey,
}: DocsLazyPreviewProps) {
  return (
    <DocsLazyPreviewInner
      key={previewKey ?? "docs-lazy-preview"}
      load={load}
      skeletonClassName={skeletonClassName}
    />
  );
}

type DocsDemoPreviewProps = {
  Component?: ComponentType;
  load?: DocsDemoLoad;
  skeletonClassName?: string;
  previewKey?: string;
};

/** Renders a static demo or code-splits via `load`. */
export function DocsDemoPreview({
  Component,
  load,
  skeletonClassName,
  previewKey,
}: DocsDemoPreviewProps) {
  if (load) {
    return (
      <DocsLazyPreview
        load={load}
        skeletonClassName={skeletonClassName}
        previewKey={previewKey}
      />
    );
  }

  if (Component) {
    return <Component />;
  }

  return null;
}
