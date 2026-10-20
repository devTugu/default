"use client";

import { DocsComponentCatalogPage, type DocsCatalogVariant } from "./DocsComponentCatalogPage";

const PREVIEW = "min-h-56 w-full py-10";

const VARIANTS: DocsCatalogVariant[] = [
  { label: "Tooltip 09 - Gooey Status Tooltip", load: () => import("@default/ui/composed/tooltip/tooltip-09"), previewClassName: PREVIEW },
  { label: "Tooltip 08 - Editor Toolbar Tooltip", load: () => import("@default/ui/composed/tooltip/tooltip-08"), previewClassName: PREVIEW },
  { label: "Tooltip 07 - Error Tooltip", load: () => import("@default/ui/composed/tooltip/tooltip-07"), previewClassName: PREVIEW },
  { label: "Tooltip 06 - Avatar Tooltip", load: () => import("@default/ui/composed/tooltip/tooltip-06"), previewClassName: PREVIEW },
  { label: "Tooltip 05 - Tooltip Position", load: () => import("@default/ui/composed/tooltip/tooltip-05"), previewClassName: PREVIEW },
  { label: "Tooltip 04 - Rounded Tooltip", load: () => import("@default/ui/composed/tooltip/tooltip-04"), previewClassName: PREVIEW },
  { label: "Tooltip 03 - Animated Tooltip", load: () => import("@default/ui/composed/tooltip/tooltip-03"), previewClassName: PREVIEW },
  { label: "Tooltip 02 - Content Tooltip", load: () => import("@default/ui/composed/tooltip/tooltip-02"), previewClassName: PREVIEW },
  {
    label: "Tooltip 01 - Hover Blog Card",
    load: () => import("@default/ui/composed/tooltip/tooltip-01"),
    previewClassName: "min-h-64 w-full max-w-sm py-10",
  },
];

export function TooltipDocsPage() {
  return (
    <DocsComponentCatalogPage
      componentSlug="tooltip"
      title="Tooltip"
      description="Explore the collection of awesome /ui Tooltip components, featuring 9+ tooltip variants designed for customizable and interactive UI elements built with React and Tailwind CSS."
      variants={VARIANTS}
    />
  );
}
