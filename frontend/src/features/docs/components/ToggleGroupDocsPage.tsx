"use client";

import { DocsComponentCatalogPage, type DocsCatalogVariant } from "./DocsComponentCatalogPage";

const PREVIEW = "py-10";

const VARIANTS: DocsCatalogVariant[] = [
  {
    label: "Toggle Group 02 - Animated Social Reactions Widget",
    load: () => import("@default/ui/composed/toggle-group/toggle-group-02"),
    previewClassName: PREVIEW,
  },
  {
    label: "Toggle Group 01 - Animated Formatting Toolbar",
    load: () => import("@default/ui/composed/toggle-group/toggle-group-01"),
    previewClassName: PREVIEW,
  },
];

export function ToggleGroupDocsPage() {
  return (
    <DocsComponentCatalogPage
      componentSlug="toggle-group"
      title="Toggle Group"
      description="Explore a set of 2+ /ui Toggle Group components for Next.js and React apps, styled with Tailwind CSS and /ui. Ready to copy, customize, and use in real web projects."
      variants={VARIANTS}
    />
  );
}
