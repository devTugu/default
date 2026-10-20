"use client";

import { DocsComponentCatalogPage, type DocsCatalogVariant } from "./DocsComponentCatalogPage";

const VARIANTS: DocsCatalogVariant[] = [
  { label: "Bubble 08 - Popover", load: () => import("@default/ui/composed/bubble/bubble-08"), isNew: true },
  { label: "Bubble 07 - Tooltip", load: () => import("@default/ui/composed/bubble/bubble-07"), isNew: true },
  { label: "Bubble 06 - Show More", load: () => import("@default/ui/composed/bubble/bubble-06"), isNew: true },
  { label: "Bubble 05 - Reactions", load: () => import("@default/ui/composed/bubble/bubble-05"), isNew: true },
  { label: "Bubble 04 - Links & Buttons", load: () => import("@default/ui/composed/bubble/bubble-04"), isNew: true },
  { label: "Bubble 03 - Bubble Group", load: () => import("@default/ui/composed/bubble/bubble-03"), isNew: true },
  { label: "Bubble 02 - Alignment", load: () => import("@default/ui/composed/bubble/bubble-02"), isNew: true },
  { label: "Bubble 01 - Variants", load: () => import("@default/ui/composed/bubble/bubble-01"), isNew: true },
];

export function BubbleDocsPage() {
  return (
    <DocsComponentCatalogPage
      componentSlug="bubble"
      title="Bubble"
      description="Bubble components for chat messages — variants, alignment, groups, reactions, links, show-more, tooltip, and popover patterns."
      variants={VARIANTS}
    />
  );
}
