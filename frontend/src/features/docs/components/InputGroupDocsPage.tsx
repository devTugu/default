"use client";

import { DocsComponentCatalogPage, type DocsCatalogVariant } from "./DocsComponentCatalogPage";

const VARIANTS: DocsCatalogVariant[] = [
  {
    label: "Input Group 04 - Animated Message Composer",
    load: () => import("@default/ui/composed/input-group/input-group-04"),
    isPro: true,
    previewClassName: "items-start justify-center py-8 min-h-[11rem]",
  },
  {
    label: "Input Group 03 - Shareable Link with Visibility",
    load: () => import("@default/ui/composed/input-group/input-group-03"),
    isPro: true,
    previewClassName: "items-start justify-center py-8",
  },
  { label: "Input Group 02 - Email Validation Indicator", load: () => import("@default/ui/composed/input-group/input-group-02") },
  { label: "Input Group 01 - Autosave Typing Indicator", load: () => import("@default/ui/composed/input-group/input-group-01") },
];

export function InputGroupDocsPage() {
  return (
    <DocsComponentCatalogPage
      componentSlug="input-group"
      title="Input Group"
      description="Explore a set of /ui Input Group components for Next.js and React apps, styled with Tailwind CSS and /ui. Ready to copy, customize, and use in real web projects."
      variants={VARIANTS}
    />
  );
}
