"use client";

import { DocsComponentCatalogPage, type DocsCatalogVariant } from "./DocsComponentCatalogPage";

const VARIANTS: DocsCatalogVariant[] = [
  { label: "Pagination 03 - Interactive Jump", load: () => import("@default/ui/composed/pagination/pagination-03") },
  { label: "Pagination 02 - Premium Ribbon", load: () => import("@default/ui/composed/pagination/pagination-02") },
  { label: "Pagination 01 - Floating Pill", load: () => import("@default/ui/composed/pagination/pagination-01") },
];

export function PaginationDocsPage() {
  return (
    <DocsComponentCatalogPage
      componentSlug="pagination"
      title="Pagination"
      description="Pagination components synced from Default registry — preview variants and copy-ready demos."
      variants={VARIANTS}
    />
  );
}
