"use client";

import { DocsComponentCatalogPage, type DocsCatalogVariant } from "./DocsComponentCatalogPage";

const VARIANTS: DocsCatalogVariant[] = [
  { label: "Sonner 07 - Failed Payout", load: () => import("@default/ui/composed/sonner/sonner-07") },
  { label: "Sonner 06 - Success Payout", load: () => import("@default/ui/composed/sonner/sonner-06") },
  { label: "Sonner 05 - Custom Sync Status", load: () => import("@default/ui/composed/sonner/sonner-05") },
  { label: "Sonner 04 - Custom PR Merge", load: () => import("@default/ui/composed/sonner/sonner-04") },
  { label: "Sonner 03 - Invite Member", load: () => import("@default/ui/composed/sonner/sonner-03") },
  { label: "Sonner 02 - Delete Project", load: () => import("@default/ui/composed/sonner/sonner-02") },
  { label: "Sonner 01 - Upload File", load: () => import("@default/ui/composed/sonner/sonner-01") },
];

export function SonnerDocsPage() {
  return (
    <DocsComponentCatalogPage
      componentSlug="sonner"
      title="Sonner"
      description="Sonner components synced from Default registry — preview variants and copy-ready demos."
      variants={VARIANTS}
    />
  );
}
