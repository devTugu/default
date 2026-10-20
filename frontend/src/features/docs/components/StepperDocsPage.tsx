"use client";

import { DocsComponentCatalogPage, type DocsCatalogVariant } from "./DocsComponentCatalogPage";

const VARIANTS: DocsCatalogVariant[] = [
  { label: "Stepper 04 - Segmented Progress Pill", load: () => import("@default/ui/composed/stepper/stepper-04") },
  { label: "Stepper 03 - Animated Progress Indicators", load: () => import("@default/ui/composed/stepper/stepper-03") },
  { label: "Stepper 02 - Multi-Step Wizards", load: () => import("@default/ui/composed/stepper/stepper-02") },
  { label: "Stepper 01 - Custom Square Badges", load: () => import("@default/ui/composed/stepper/stepper-01") },
];

export function StepperDocsPage() {
  return (
    <DocsComponentCatalogPage
      componentSlug="stepper"
      title="Stepper"
      description="Stepper components synced from Default registry — preview variants and copy-ready demos."
      variants={VARIANTS}
    />
  );
}
