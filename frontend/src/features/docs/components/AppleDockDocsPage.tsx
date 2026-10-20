"use client";

import { DocsComponentCatalogPage, type DocsCatalogVariant } from "./DocsComponentCatalogPage";

const VARIANTS: DocsCatalogVariant[] = [
  { label: "Apple Dock 02 - With Panel", isPro: true, load: () => import("@default/ui/composed/apple-dock/apple-dock-02") },
  { label: "Apple Dock 01 - Default", load: () => import("@default/ui/composed/apple-dock/apple-dock-01") },
];

export function AppleDockDocsPage() {
  return (
    <DocsComponentCatalogPage
      componentSlug="apple-dock"
      title="Apple Dock"
      description="Discover Our 2+ Apple Dock component, a floating and interactive navigation bar inspired by macOS. Built with /ui, Next.js, React and Tailwind CSS."
      variants={VARIANTS}
      previewClassName="min-h-[320px] items-end"
    />
  );
}
