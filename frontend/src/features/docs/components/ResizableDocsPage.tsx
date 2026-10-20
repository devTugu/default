"use client";

import { DocsComponentCatalogPage, type DocsCatalogVariant } from "./DocsComponentCatalogPage";

const VARIANTS: DocsCatalogVariant[] = [
  { label: "Resizable 04 - Nested Panels", load: () => import("@default/ui/composed/resizable/resizable-04") },
  { label: "Resizable 03 - Vertical Split", load: () => import("@default/ui/composed/resizable/resizable-03") },
  { label: "Resizable 02 - Horizontal Split", load: () => import("@default/ui/composed/resizable/resizable-02") },
  { label: "Resizable 01 - Master-Detail Split Pane", load: () => import("@default/ui/composed/resizable/resizable-01") },
];

export function ResizableDocsPage() {
  return (
    <DocsComponentCatalogPage
      componentSlug="resizable"
      title="Resizable"
      description="Resizable components synced from Default registry — preview variants and copy-ready demos."
      variants={VARIANTS}
    />
  );
}
