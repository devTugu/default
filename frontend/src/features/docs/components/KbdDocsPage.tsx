"use client";

import { DocsComponentCatalogPage, type DocsCatalogVariant } from "./DocsComponentCatalogPage";

const VARIANTS: DocsCatalogVariant[] = [
  { label: "KBD 05 - KBD Generator", load: () => import("@default/ui/composed/kbd/kbd-05") },
  { label: "KBD 04 - KBD in Search Input", load: () => import("@default/ui/composed/kbd/kbd-04") },
  { label: "KBD 03 - KBD in Tooltip", load: () => import("@default/ui/composed/kbd/kbd-03") },
  { label: "KBD 02 - KBD Group", load: () => import("@default/ui/composed/kbd/kbd-02") },
  { label: "KBD 01 - KBD in Button", load: () => import("@default/ui/composed/kbd/kbd-01") },
];

export function KbdDocsPage() {
  return (
    <DocsComponentCatalogPage
      componentSlug="kbd"
      title="KBD"
      description="KBD components synced from Default registry — preview variants and copy-ready demos."
      variants={VARIANTS}
    />
  );
}
