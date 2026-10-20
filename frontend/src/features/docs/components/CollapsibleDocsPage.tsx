"use client";

import { DocsComponentCatalogPage, type DocsCatalogVariant } from "./DocsComponentCatalogPage";

const VARIANTS: DocsCatalogVariant[] = [
  { label: "Collapsible 05 - Token Usage", load: () => import("@default/ui/composed/collapsible/collapsible-05") },
  { label: "Collapsible 04 - User Profile", load: () => import("@default/ui/composed/collapsible/collapsible-04") },
  { label: "Collapsible 03 - API Keys Manager", load: () => import("@default/ui/composed/collapsible/collapsible-03") },
  { label: "Collapsible 02 - Dashboard Sidebar", load: () => import("@default/ui/composed/collapsible/collapsible-02") },
  { label: "Collapsible 01 - Release Changelog", load: () => import("@default/ui/composed/collapsible/collapsible-01") },
];

export function CollapsibleDocsPage() {
  return (
    <DocsComponentCatalogPage
      componentSlug="collapsible"
      title="Collapsible"
      description="Collapsible components synced from Default registry — preview variants and copy-ready demos."
      variants={VARIANTS}
    />
  );
}
