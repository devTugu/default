"use client";

import { DocsComponentCatalogPage, type DocsCatalogVariant } from "./DocsComponentCatalogPage";

const VARIANTS: DocsCatalogVariant[] = [
  {
    label: "Carousel 08 - Apple Card",
    load: () => import("@default/ui/composed/carousel/carousel-08"),
    isPro: true,
    previewClassName: "items-stretch justify-start overflow-x-auto px-0 py-4",
  },
  {
    label: "Carousel 07 - Stacked Card",
    load: () => import("@default/ui/composed/carousel/carousel-07"),
    isPro: true,
    previewClassName: "items-stretch justify-center overflow-visible px-0 py-6",
  },
  {
    label: "Carousel 06 - Cards With Detail",
    load: () => import("@default/ui/composed/carousel/carousel-06"),
    isPro: true,
  },
  {
    label: "Carousel 05 - Previews",
    load: () => import("@default/ui/composed/carousel/carousel-05"),
    isPro: true,
  },
  { label: "Carousel 04 - Cards", load: () => import("@default/ui/composed/carousel/carousel-04") },
  { label: "Carousel 03 - Index", load: () => import("@default/ui/composed/carousel/carousel-03") },
  { label: "Carousel 02 - Custom Navigation", load: () => import("@default/ui/composed/carousel/carousel-02") },
  { label: "Carousel 01 - Custom Dots", load: () => import("@default/ui/composed/carousel/carousel-01") },
];

export function CarouselDocsPage() {
  return (
    <DocsComponentCatalogPage
      componentSlug="carousel"
      title="Carousel"
      description="Carousel components synced from Default registry — preview variants and copy-ready demos."
      variants={VARIANTS}
    />
  );
}
