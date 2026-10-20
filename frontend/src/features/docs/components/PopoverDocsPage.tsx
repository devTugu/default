"use client";

import { DocsComponentCatalogPage, type DocsCatalogVariant } from "./DocsComponentCatalogPage";

const VARIANTS: DocsCatalogVariant[] = [
  { label: "Popover 09 - Status Picker", load: () => import("@default/ui/composed/popover/popover-09") },
  { label: "Popover 08 - Product Tour", load: () => import("@default/ui/composed/popover/popover-08") },
  { label: "Popover 07 - Color Picker", load: () => import("@default/ui/composed/popover/popover-07") },
  { label: "Popover 06 - Location", load: () => import("@default/ui/composed/popover/popover-06") },
  { label: "Popover 05 - Download Progress", load: () => import("@default/ui/composed/popover/popover-05") },
  { label: "Popover 04 - Volume Control", load: () => import("@default/ui/composed/popover/popover-04") },
  { label: "Popover 03 - Notifications", load: () => import("@default/ui/composed/popover/popover-03") },
  { label: "Popover 02 - User Profile Card", load: () => import("@default/ui/composed/popover/popover-02") },
  { label: "Popover 01 - About Us", load: () => import("@default/ui/composed/popover/popover-01") },
];

export function PopoverDocsPage() {
  return (
    <DocsComponentCatalogPage
      componentSlug="popover"
      title="Popover"
      description="Popover components synced from Default registry — preview variants and copy-ready demos."
      variants={VARIANTS}
    />
  );
}
