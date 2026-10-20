"use client";

import { DocsComponentCatalogPage, type DocsCatalogVariant } from "./DocsComponentCatalogPage";

const VARIANTS: DocsCatalogVariant[] = [
  { label: "Shine Border 07 - Marching Dashes", load: () => import("@default/ui/composed/shine-border/shine-border-07") },
  { label: "Shine Border 06 - Focus Frame", load: () => import("@default/ui/composed/shine-border/shine-border-06") },
  { label: "Shine Border 05 - Aurora Glow", load: () => import("@default/ui/composed/shine-border/shine-border-05") },
  { label: "Shine Border 04 - Stats Card", load: () => import("@default/ui/composed/shine-border/shine-border-04") },
  { label: "Shine Border 03 - Feature Card", load: () => import("@default/ui/composed/shine-border/shine-border-03") },
  { label: "Shine Border 02 - Security Card", load: () => import("@default/ui/composed/shine-border/shine-border-02") },
  { label: "Shine Border 01 - Basic", load: () => import("@default/ui/composed/shine-border/shine-border-01") },
];

export function ShineBorderDocsPage() {
  return (
    <DocsComponentCatalogPage
      componentSlug="shine-border"
      title="Shine Border"
      description="Shine Border components synced from Default registry — preview variants and copy-ready demos."
      variants={VARIANTS}
    />
  );
}
