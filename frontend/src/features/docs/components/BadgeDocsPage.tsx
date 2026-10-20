"use client";

import { DocsComponentCatalogPage, type DocsCatalogVariant } from "./DocsComponentCatalogPage";

const VARIANTS: DocsCatalogVariant[] = [
  { label: "Badge 13 - Streak Display", load: () => import("@default/ui/composed/badge/badge-13") },
  { label: "Badge 12 - Removable Filter Chip", load: () => import("@default/ui/composed/badge/badge-12") },
  { label: "Badge 11 - Count Pop", load: () => import("@default/ui/composed/badge/badge-11") },
  { label: "Badge 10 - With Avatar", load: () => import("@default/ui/composed/badge/badge-10") },
  { label: "Badge 09 - Failed", load: () => import("@default/ui/composed/badge/badge-09") },
  { label: "Badge 08 - Pending", load: () => import("@default/ui/composed/badge/badge-08") },
  { label: "Badge 07 - Success", load: () => import("@default/ui/composed/badge/badge-07") },
  { label: "Badge 06 - Error", load: () => import("@default/ui/composed/badge/badge-06") },
  { label: "Badge 05 - Link", load: () => import("@default/ui/composed/badge/badge-05") },
  { label: "Badge 04 - With Icon", load: () => import("@default/ui/composed/badge/badge-04") },
  { label: "Badge 03 - Outline", load: () => import("@default/ui/composed/badge/badge-03") },
  { label: "Badge 02 - Count", load: () => import("@default/ui/composed/badge/badge-02") },
  { label: "Badge 01 - Default", load: () => import("@default/ui/composed/badge/badge-01") },
];

export function BadgeDocsPage() {
  return (
    <DocsComponentCatalogPage
      componentSlug="badge"
      title="Badge"
      description="Badge variants for status labels, counts, filter chips, avatars, and animated streak displays — built with React and Tailwind CSS."
      variants={VARIANTS}
    />
  );
}
