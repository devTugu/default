"use client";

import { DocsComponentCatalogPage, type DocsCatalogVariant } from "./DocsComponentCatalogPage";

const VARIANTS: DocsCatalogVariant[] = [
  { label: "Rating 03 - NPS Scale Rating", load: () => import("@default/ui/composed/rating/rating-03") },
  { label: "Rating 02 - Emoji Rating", load: () => import("@default/ui/composed/rating/rating-02") },
  { label: "Rating 01 - Star Rating", load: () => import("@default/ui/composed/rating/rating-01") },
];

export function RatingDocsPage() {
  return (
    <DocsComponentCatalogPage
      componentSlug="rating"
      title="Rating"
      description="Rating components synced from Default registry — preview variants and copy-ready demos."
      variants={VARIANTS}
    />
  );
}
