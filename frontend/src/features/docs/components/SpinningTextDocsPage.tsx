"use client";

import { DocsComponentCatalogPage, type DocsCatalogVariant } from "./DocsComponentCatalogPage";

const VARIANTS: DocsCatalogVariant[] = [
  { label: "Spinning Text 02 - With Icon", load: () => import("@default/ui/composed/spinning-text/spinning-text-02") },
  { label: "Spinning Text 01 - Basic", load: () => import("@default/ui/composed/spinning-text/spinning-text-01") },
];

export function SpinningTextDocsPage() {
  return (
    <DocsComponentCatalogPage
      componentSlug="spinning-text"
      title="Spinning Text"
      description="Spinning Text components synced from Default registry — preview variants and copy-ready demos."
      variants={VARIANTS}
    />
  );
}
