"use client";

import { DocsComponentCatalogPage, type DocsCatalogVariant } from "./DocsComponentCatalogPage";

const VARIANTS: DocsCatalogVariant[] = [
  { label: "Slider 08 - Circular Volume Dial", load: () => import("@default/ui/composed/slider/slider-08") },
  { label: "Slider 07 - Slingshot Launch Power", load: () => import("@default/ui/composed/slider/slider-07") },
  { label: "Slider 06 - Animated Price Range Filter", load: () => import("@default/ui/composed/slider/slider-06") },
  { label: "Slider 05 - Equalizer Bar", load: () => import("@default/ui/composed/slider/slider-05"), isPro: true },
  { label: "Slider 04 - Modern Volume", load: () => import("@default/ui/composed/slider/slider-04") },
  { label: "Slider 03 - Temperature Control", load: () => import("@default/ui/composed/slider/slider-03") },
  { label: "Slider 02 - Emoji Rating", load: () => import("@default/ui/composed/slider/slider-02") },
  { label: "Slider 01 - Volume Control", load: () => import("@default/ui/composed/slider/slider-01") },
];

export function SliderDocsPage() {
  return (
    <DocsComponentCatalogPage
      componentSlug="slider"
      title="Slider"
      description="Discover our 8+ collection of /ui Slider components with customizable and interactive slider variants built using React and Tailwind CSS."
      variants={VARIANTS}
    />
  );
}
