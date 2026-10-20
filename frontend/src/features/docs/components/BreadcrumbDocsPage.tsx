"use client";

import { DocsComponentCatalogPage, type DocsCatalogVariant } from "./DocsComponentCatalogPage";

const VARIANTS: DocsCatalogVariant[] = [
  { label: "Breadcrumb 06 - Collapsed Breadcrumb", load: () => import("@default/ui/composed/breadcrumb/breadcrumb-06") },
  { label: "Breadcrumb 05 - Chip Breadcrumb", load: () => import("@default/ui/composed/breadcrumb/breadcrumb-05") },
  { label: "Breadcrumb 04 - Icon-Based Breadcrumb", load: () => import("@default/ui/composed/breadcrumb/breadcrumb-04") },
  { label: "Breadcrumb 03 - Interactive Breadcrumb", load: () => import("@default/ui/composed/breadcrumb/breadcrumb-03") },
  { label: "Breadcrumb 02 - Text Breadcrumb", load: () => import("@default/ui/composed/breadcrumb/breadcrumb-02") },
  { label: "Breadcrumb 01 - Pill Breadcrumb", load: () => import("@default/ui/composed/breadcrumb/breadcrumb-01") },
];

export function BreadcrumbDocsPage() {
  return (
    <DocsComponentCatalogPage
      componentSlug="breadcrumb"
      title="Breadcrumb"
      description="Breadcrumb navigation components — pill, text, interactive, icon, chip, and collapsed patterns for React and Next.js."
      variants={VARIANTS}
    />
  );
}
