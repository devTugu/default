"use client";

import { DocsComponentCatalogPage, type DocsCatalogVariant } from "./DocsComponentCatalogPage";

const VARIANTS: DocsCatalogVariant[] = [
  { label: "Toggle 03 - Animated Upvote Button", load: () => import("@default/ui/composed/toggle/toggle-03") },
  { label: "Toggle 02 - Animated Like Button", load: () => import("@default/ui/composed/toggle/toggle-02") },
  { label: "Toggle 01 - Animated Sun/Moon", load: () => import("@default/ui/composed/toggle/toggle-01") },
];

export function ToggleDocsPage() {
  return (
    <DocsComponentCatalogPage
      componentSlug="toggle"
      title="Toggle"
      description="Toggle components synced from Default registry — preview variants and copy-ready demos."
      variants={VARIANTS}
    />
  );
}
