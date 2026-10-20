"use client";

import { DocsComponentCatalogPage, type DocsCatalogVariant } from "./DocsComponentCatalogPage";

const VARIANTS: DocsCatalogVariant[] = [
  { label: "Item 02 - Model Grid Cards", load: () => import("@default/ui/composed/item/item-02") },
  { label: "Item 01 - Team Members List", load: () => import("@default/ui/composed/item/item-01") },
];

export function ItemDocsPage() {
  return (
    <DocsComponentCatalogPage
      componentSlug="item"
      title="Item"
      description="Item components synced from Default registry — preview variants and copy-ready demos."
      variants={VARIANTS}
    />
  );
}
