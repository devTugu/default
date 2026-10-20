"use client";

import { DocsComponentCatalogPage, type DocsCatalogVariant } from "./DocsComponentCatalogPage";

const VARIANTS: DocsCatalogVariant[] = [
  { label: "Dots 12 - Pebble", load: () => import("@default/ui/composed/dots/dots-12"), isNew: true },
  { label: "Dots 11 - Cloud", load: () => import("@default/ui/composed/dots/dots-11"), isNew: true },
  { label: "Dots 10 - Circle", load: () => import("@default/ui/composed/dots/dots-10"), isNew: true },
  { label: "Dots 09 - Hexagon", load: () => import("@default/ui/composed/dots/dots-09"), isNew: true },
  { label: "Dots 08 - Squircle", load: () => import("@default/ui/composed/dots/dots-08"), isNew: true },
  { label: "Dots 07 - Clover", load: () => import("@default/ui/composed/dots/dots-07"), isNew: true },
  { label: "Dots 06 - Triangle", load: () => import("@default/ui/composed/dots/dots-06"), isNew: true },
  { label: "Dots 05 - Diamond", load: () => import("@default/ui/composed/dots/dots-05"), isNew: true },
  { label: "Dots 04 - Teardrop", load: () => import("@default/ui/composed/dots/dots-04"), isNew: true },
  { label: "Dots 03 - Scalloped", load: () => import("@default/ui/composed/dots/dots-03"), isNew: true },
  { label: "Dots 02 - Eared Blob", load: () => import("@default/ui/composed/dots/dots-02"), isNew: true },
  { label: "Dots 01 - Flower", load: () => import("@default/ui/composed/dots/dots-01"), isNew: true },
];

export function DotsDocsPage() {
  return (
    <DocsComponentCatalogPage
      componentSlug="dots"
      title="Dots"
      description="Dots components synced from Default registry — preview variants and copy-ready demos."
      variants={VARIANTS}
    />
  );
}
