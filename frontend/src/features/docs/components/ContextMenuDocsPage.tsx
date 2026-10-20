"use client";

import { DocsComponentCatalogPage, type DocsCatalogVariant } from "./DocsComponentCatalogPage";

const VARIANTS: DocsCatalogVariant[] = [
  { label: "Context Menu 02 - Radial Bubble", load: () => import("@default/ui/composed/context-menu/context-menu-02") },
  { label: "Context Menu 01 - Animated Actions", load: () => import("@default/ui/composed/context-menu/context-menu-01") },
];

export function ContextMenuDocsPage() {
  return (
    <DocsComponentCatalogPage
      componentSlug="context-menu"
      title="Context Menu"
      description="Context Menu components synced from Default registry — preview variants and copy-ready demos."
      variants={VARIANTS}
    />
  );
}
