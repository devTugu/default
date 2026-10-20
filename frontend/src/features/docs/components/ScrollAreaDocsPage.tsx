"use client";

import { DocsComponentCatalogPage, type DocsCatalogVariant } from "./DocsComponentCatalogPage";

const PREVIEW =
  "min-h-0 w-full !items-start justify-center px-4 py-8 sm:px-6";

const VARIANTS: DocsCatalogVariant[] = [
  {
    label: "Scroll Area 04 - Animated Notification Feed",
    load: () => import("@default/ui/composed/scroll-area/scroll-area-04"),
    previewClassName: PREVIEW,
  },
  {
    label: "Scroll Area 03 - Vertical Image Gallery",
    load: () => import("@default/ui/composed/scroll-area/scroll-area-03"),
    previewClassName: PREVIEW,
  },
  {
    label: "Scroll Area 02 - Horizontal Profile Stories",
    load: () => import("@default/ui/composed/scroll-area/scroll-area-02"),
    previewClassName: PREVIEW,
  },
  {
    label: "Scroll Area 01 - Custom File Explorer",
    load: () => import("@default/ui/composed/scroll-area/scroll-area-01"),
    previewClassName: PREVIEW,
  },
];

export function ScrollAreaDocsPage() {
  return (
    <DocsComponentCatalogPage
      componentSlug="scroll-area"
      title="Scroll Area"
      description="Explore our 4+ /ui Scroll Area components built using React and Tailwind CSS, made to create clean, customizable scrollable sections in your UI."
      variants={VARIANTS}
    />
  );
}
