"use client";

import { DocsComponentCatalogPage, type DocsCatalogVariant } from "./DocsComponentCatalogPage";

const VARIANTS: DocsCatalogVariant[] = [
  { label: "Skeleton 03 - List with Icons", load: () => import("@default/ui/composed/skeleton/skeleton-03") },
  { label: "Skeleton 02 - Table with Avatars", load: () => import("@default/ui/composed/skeleton/skeleton-02") },
  { label: "Skeleton 01 - Profile with Stats", load: () => import("@default/ui/composed/skeleton/skeleton-01") },
];

export function SkeletonDocsPage() {
  return (
    <DocsComponentCatalogPage
      componentSlug="skeleton"
      title="Skeleton"
      description="Skeleton components synced from Default registry — preview variants and copy-ready demos."
      variants={VARIANTS}
    />
  );
}
