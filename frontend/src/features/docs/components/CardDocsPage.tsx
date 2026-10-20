"use client";

import { DocsComponentCatalogPage, type DocsCatalogVariant } from "./DocsComponentCatalogPage";

const VARIANTS: DocsCatalogVariant[] = [
  { label: "Card 26 - Notification", load: () => import("@default/ui/composed/card/card-26"), isNew: true },
  { label: "Card 25 - Music Player", load: () => import("@default/ui/composed/card/card-25"), isNew: true },
  { label: "Card 24 - Animated Event Card", load: () => import("@default/ui/composed/card/card-24"), isNew: true },
  { label: "Card 23 - Place Card", load: () => import("@default/ui/composed/card/card-23"), isNew: true },
  { label: "Card 21 - Highlighted Comparison Card", load: () => import("@default/ui/composed/card/card-21"), isNew: true },
  { label: "Card 20 - Testimonial Card", load: () => import("@default/ui/composed/card/card-20"), isNew: true },
  { label: "Card 19 - Integration Card", load: () => import("@default/ui/composed/card/card-19"), isNew: true },
  { label: "Card 18 - Credit Card", load: () => import("@default/ui/composed/card/card-18"), isNew: true },
  { label: "Card 17 - Ecommerce Product Variant Card", load: () => import("@default/ui/composed/card/card-17"), isNew: true },
  { label: "Card 16 - Ecommerce Product Rating Card", load: () => import("@default/ui/composed/card/card-16"), isNew: true },
  { label: "Card 13 - Contributed Card", load: () => import("@default/ui/composed/card/card-13"), isNew: true },
  { label: "Card 12 - Weekly Card", load: () => import("@default/ui/composed/card/card-12"), isNew: true },
  { label: "Card 11 - Assign Task Card", load: () => import("@default/ui/composed/card/card-11"), isNew: true },
  { label: "Card 10 - Appointment Card", load: () => import("@default/ui/composed/card/card-10"), isNew: true },
  { label: "Card 09 - Invite Member Card", load: () => import("@default/ui/composed/card/card-09"), isNew: true },
  { label: "Card 08 - Invite Card", load: () => import("@default/ui/composed/card/card-08"), isNew: true },
  { label: "Card 07 - Audio Frequency Visualizer", load: () => import("@default/ui/composed/card/card-07"), isNew: true },
  { label: "Card 06 - Statistics Card", load: () => import("@default/ui/composed/card/card-06"), isNew: true },
  { label: "Card 05 - Analytics Card", load: () => import("@default/ui/composed/card/card-05"), isNew: true },
  { label: "Card 04 - Welcome Card", load: () => import("@default/ui/composed/card/card-04"), isNew: true },
  { label: "Card 03 - Product Card", load: () => import("@default/ui/composed/card/card-03"), isNew: true },
  { label: "Card 02 - Preview Card", load: () => import("@default/ui/composed/card/card-02"), isNew: true },
  { label: "Card 01 - Article Preview Card", load: () => import("@default/ui/composed/card/card-01"), isNew: true },
];

export function CardDocsPage() {
  return (
    <DocsComponentCatalogPage
      componentSlug="card"
      title="Card"
      description="Card components synced from Default registry — preview variants and copy-ready demos."
      variants={VARIANTS}
      previewClassName="overflow-x-auto"
    />
  );
}
