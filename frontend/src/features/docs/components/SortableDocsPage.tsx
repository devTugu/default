"use client";

import { DocsComponentCatalogPage, type DocsCatalogVariant } from "./DocsComponentCatalogPage";

const VARIANTS: DocsCatalogVariant[] = [
  { label: "Sortable 06 - Sortable Music Queue", load: () => import("@default/ui/composed/sortable/sortable-06") },
  { label: "Sortable 05 - Sortable Numbered Checklist", load: () => import("@default/ui/composed/sortable/sortable-05") },
  { label: "Sortable 04 - Sortable Media Library Grid", load: () => import("@default/ui/composed/sortable/sortable-04") },
  { label: "Sortable 03 - Sortable Grouped List", load: () => import("@default/ui/composed/sortable/sortable-03") },
  { label: "Sortable 02 - Sortable Asset Grid", load: () => import("@default/ui/composed/sortable/sortable-02") },
  { label: "Sortable 01 - Sortable Asset List", load: () => import("@default/ui/composed/sortable/sortable-01") },
];

export function SortableDocsPage() {
  return (
    <DocsComponentCatalogPage
      componentSlug="sortable"
      title="Sortable"
      description="Sortable components synced from Default registry — preview variants and copy-ready demos."
      variants={VARIANTS}
    />
  );
}
