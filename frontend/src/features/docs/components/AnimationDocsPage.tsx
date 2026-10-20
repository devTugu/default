"use client";

import { DocsComponentCatalogPage, type DocsCatalogVariant } from "./DocsComponentCatalogPage";

const VARIANTS: DocsCatalogVariant[] = [
  { label: "Animation 01 - Book Page Curl", isNew: true, load: () => import("@default/ui/composed/animation/animation-01") },
];

export function AnimationDocsPage() {
  return (
    <DocsComponentCatalogPage
      componentSlug="animation"
      title="Animation"
      description="Discover interactive animation components built with React, Motion, and Tailwind CSS. Physics-inspired effects like draggable page curls that respond to mouse and touch."
      variants={VARIANTS}
      previewClassName="min-h-[360px]"
    />
  );
}
