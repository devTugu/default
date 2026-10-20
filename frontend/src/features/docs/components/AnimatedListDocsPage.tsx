"use client";

import { DocsComponentCatalogPage, type DocsCatalogVariant } from "./DocsComponentCatalogPage";

const VARIANTS: DocsCatalogVariant[] = [
  { label: "Animated List 03 - Expandable Stack", load: () => import("@default/ui/composed/animated-list/animated-list-03") },
  { label: "Animated List 02 - Setup Steps", load: () => import("@default/ui/composed/animated-list/animated-list-02") },
  { label: "Animated List 01 - Default", load: () => import("@default/ui/composed/animated-list/animated-list-01") },
];

export function AnimatedListDocsPage() {
  return (
    <DocsComponentCatalogPage
      componentSlug="animated-list"
      title="Animated List"
      description="Discover our 3+ /ui Animated List components built with React and Tailwind CSS. Add fade, slide, or stagger effects to notifications, menus, and dashboards."
      variants={VARIANTS}
    />
  );
}
