"use client";

import { DocsComponentCatalogPage, type DocsCatalogVariant } from "./DocsComponentCatalogPage";

const VARIANTS: DocsCatalogVariant[] = [
  { label: "Sheet 04 - Filter Panel", load: () => import("@default/ui/composed/sheet/sheet-04") },
  { label: "Sheet 03 - Shopping Cart", load: () => import("@default/ui/composed/sheet/sheet-03") },
  { label: "Sheet 02 - Scrollable Content", load: () => import("@default/ui/composed/sheet/sheet-02") },
  { label: "Sheet 01 - Different Directions", load: () => import("@default/ui/composed/sheet/sheet-01") },
];

export function SheetDocsPage() {
  return (
    <DocsComponentCatalogPage
      componentSlug="sheet"
      title="Sheet"
      description="Sheet components synced from Default registry — preview variants and copy-ready demos."
      variants={VARIANTS}
    />
  );
}
