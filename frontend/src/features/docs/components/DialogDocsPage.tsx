"use client";

import { DocsComponentCatalogPage, type DocsCatalogVariant } from "./DocsComponentCatalogPage";

const VARIANTS: DocsCatalogVariant[] = [
  { label: "Dialog 08 - Connectors", load: () => import("@default/ui/composed/dialog/dialog-08") },
  { label: "Dialog 07 - Connect Integration", load: () => import("@default/ui/composed/dialog/dialog-07") },
  { label: "Dialog 06 - Zoom Out", load: () => import("@default/ui/composed/dialog/dialog-06") },
  { label: "Dialog 05 - Zoom In", load: () => import("@default/ui/composed/dialog/dialog-05") },
  { label: "Dialog 04 - Slide from Right", load: () => import("@default/ui/composed/dialog/dialog-04") },
  { label: "Dialog 03 - Slide from Left", load: () => import("@default/ui/composed/dialog/dialog-03") },
  { label: "Dialog 02 - Slide from Bottom", load: () => import("@default/ui/composed/dialog/dialog-02") },
  { label: "Dialog 01 - Slide from Top", load: () => import("@default/ui/composed/dialog/dialog-01") },
];

export function DialogDocsPage() {
  return (
    <DocsComponentCatalogPage
      componentSlug="dialog"
      title="Dialog"
      description="Dialog components synced from Default registry — preview variants and copy-ready demos."
      variants={VARIANTS}
    />
  );
}
