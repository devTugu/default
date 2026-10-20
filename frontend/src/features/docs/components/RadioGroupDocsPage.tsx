"use client";

import { DocsComponentCatalogPage, type DocsCatalogVariant } from "./DocsComponentCatalogPage";

const VARIANTS: DocsCatalogVariant[] = [
  { label: "Radio Group 08 - Hop Effect", load: () => import("@default/ui/composed/radio-group/radio-group-08") },
  {
    label: "Radio Group 07 - Ripple Effect",
    load: () => import("@default/ui/composed/radio-group/radio-group-07"),
    frameClassName: "overflow-visible",
    previewClassName: "overflow-visible py-8",
  },
  { label: "Radio Group 06 - Radio Group List Demo", load: () => import("@default/ui/composed/radio-group/radio-group-06") },
  { label: "Radio Group 05 - Radio Group Dashed Demo", load: () => import("@default/ui/composed/radio-group/radio-group-05") },
  { label: "Radio Group 04 - Radio Group Card Vertical Demo", load: () => import("@default/ui/composed/radio-group/radio-group-04") },
  { label: "Radio Group 03 - Radio Group with PlanCards", load: () => import("@default/ui/composed/radio-group/radio-group-03") },
  { label: "Radio Group 02 - Radio Group Colors Demo", load: () => import("@default/ui/composed/radio-group/radio-group-02") },
  { label: "Radio Group 01 - Radio Group Animated Demo", load: () => import("@default/ui/composed/radio-group/radio-group-01") },
];

export function RadioGroupDocsPage() {
  return (
    <DocsComponentCatalogPage
      componentSlug="radio-group"
      title="Radio Group"
      description="Explore /ui Radio Group components built with React, Tailwind CSS, and /ui. Ready to copy, customize, and use in real web projects."
      variants={VARIANTS}
    />
  );
}
