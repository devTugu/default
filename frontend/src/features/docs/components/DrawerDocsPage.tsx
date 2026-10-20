"use client";

import { DocsComponentCatalogPage, type DocsCatalogVariant } from "./DocsComponentCatalogPage";

const VARIANTS: DocsCatalogVariant[] = [
  { label: "Drawer 02 - Shopping Cart", load: () => import("@default/ui/composed/drawer/drawer-02") },
  { label: "Drawer 01 - Onboarding Checklist", load: () => import("@default/ui/composed/drawer/drawer-01") },
];

export function DrawerDocsPage() {
  return (
    <DocsComponentCatalogPage
      componentSlug="drawer"
      title="Drawer"
      description="Drawer components synced from Default registry — preview variants and copy-ready demos."
      variants={VARIANTS}
      previewClassName="min-h-56 items-center justify-center"
    />
  );
}
