"use client";

import { DocsComponentCatalogPage, type DocsCatalogVariant } from "./DocsComponentCatalogPage";

const VARIANTS: DocsCatalogVariant[] = [
  { label: "Separator 09 - Animated Pulse Release", load: () => import("@default/ui/composed/separator/separator-09") },
  { label: "Separator 08 - With Icon", load: () => import("@default/ui/composed/separator/separator-08") },
  { label: "Separator 07 - With Badge", load: () => import("@default/ui/composed/separator/separator-07") },
  { label: "Separator 06 - Gradient Faded", load: () => import("@default/ui/composed/separator/separator-06") },
  { label: "Separator 05 - Dashed", load: () => import("@default/ui/composed/separator/separator-05") },
  { label: "Separator 04 - Vertical Label Placement", load: () => import("@default/ui/composed/separator/separator-04") },
  { label: "Separator 03 - Horizontal Label Placement", load: () => import("@default/ui/composed/separator/separator-03") },
  { label: "Separator 02 - Vertical", load: () => import("@default/ui/composed/separator/separator-02") },
  { label: "Separator 01 - Default", load: () => import("@default/ui/composed/separator/separator-01") },
];

export function SeparatorDocsPage() {
  return (
    <DocsComponentCatalogPage
      componentSlug="separator"
      title="Separator"
      description="Separator components synced from Default registry — preview variants and copy-ready demos."
      variants={VARIANTS}
    />
  );
}
