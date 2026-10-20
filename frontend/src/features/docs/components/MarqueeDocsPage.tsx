"use client";

import { DocsComponentCatalogPage, type DocsCatalogVariant } from "./DocsComponentCatalogPage";

const VARIANTS: DocsCatalogVariant[] = [
  { label: "Marquee 05 - Trending Stocks", load: () => import("@default/ui/composed/marquee/marquee-05") },
  { label: "Marquee 04 - Fashion Video Showcase", load: () => import("@default/ui/composed/marquee/marquee-04") },
  { label: "Marquee 03 - Vertical Testimonials", load: () => import("@default/ui/composed/marquee/marquee-03") },
  { label: "Marquee 02 - Brands", load: () => import("@default/ui/composed/marquee/marquee-02") },
  { label: "Marquee 01 - Testimonials", load: () => import("@default/ui/composed/marquee/marquee-01") },
];

export function MarqueeDocsPage() {
  return (
    <DocsComponentCatalogPage
      componentSlug="marquee"
      title="Marquee"
      description="Marquee components synced from Default registry — preview variants and copy-ready demos."
      variants={VARIANTS}
    />
  );
}
