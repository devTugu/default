"use client";

import { DocsComponentCatalogPage, type DocsCatalogVariant } from "./DocsComponentCatalogPage";

const VARIANTS: DocsCatalogVariant[] = [
  { label: "Aspect Ratio 06 - Product Card", load: () => import("@default/ui/composed/aspect-ratio/aspect-ratio-06") },
  { label: "Aspect Ratio 05 - Ratio Switcher", load: () => import("@default/ui/composed/aspect-ratio/aspect-ratio-05") },
  { label: "Aspect Ratio 04 - Video Thumbnail", load: () => import("@default/ui/composed/aspect-ratio/aspect-ratio-04") },
  { label: "Aspect Ratio 03 - Caption Overlay", load: () => import("@default/ui/composed/aspect-ratio/aspect-ratio-03") },
  { label: "Aspect Ratio 02 - Square Grid", load: () => import("@default/ui/composed/aspect-ratio/aspect-ratio-02") },
  { label: "Aspect Ratio 01 - Default", load: () => import("@default/ui/composed/aspect-ratio/aspect-ratio-01") },
];

export function AspectRatioDocsPage() {
  return (
    <DocsComponentCatalogPage
      componentSlug="aspect-ratio"
      title="Aspect Ratio"
      description="Explore ready-to-use /ui Aspect Ratio components for Next.js and React apps, built with Radix UI and Tailwind CSS."
      variants={VARIANTS}
    />
  );
}
