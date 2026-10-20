"use client";

import { DocsComponentCatalogPage, type DocsCatalogVariant } from "./DocsComponentCatalogPage";

const VARIANTS: DocsCatalogVariant[] = [
  { label: "Progress 04 - Shimmer Status Progress", load: () => import("@default/ui/composed/progress/progress-04") },
  { label: "Progress 03 - Skills Dashboard", load: () => import("@default/ui/composed/progress/progress-03") },
  { label: "Progress 02 - Onboarding Stepper", load: () => import("@default/ui/composed/progress/progress-02") },
  { label: "Progress 01 - Simple Upload", load: () => import("@default/ui/composed/progress/progress-01") },
];

export function ProgressDocsPage() {
  return (
    <DocsComponentCatalogPage
      componentSlug="progress"
      title="Progress"
      description="Progress components synced from Default registry — preview variants and copy-ready demos."
      variants={VARIANTS}
    />
  );
}
