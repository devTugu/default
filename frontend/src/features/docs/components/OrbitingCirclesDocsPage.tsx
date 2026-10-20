"use client";

import { DocsComponentCatalogPage, type DocsCatalogVariant } from "./DocsComponentCatalogPage";

const VARIANTS: DocsCatalogVariant[] = [
  { label: "Orbiting Circles 04 - Stack Reveal", load: () => import("@default/ui/composed/orbiting-circles/orbiting-circles-04"), isNew: true },
  { label: "Orbiting Circles 03 - Spotlight", load: () => import("@default/ui/composed/orbiting-circles/orbiting-circles-03"), isNew: true },
  {
    label: "Orbiting Circles 02 - with Globe",
    load: () => import("@default/ui/composed/orbiting-circles/orbiting-circles-02"),
    isPro: true,
    previewClassName: "min-h-[28rem] overflow-x-auto py-8",
  },
  { label: "Orbiting Circles 01 - Default", load: () => import("@default/ui/composed/orbiting-circles/orbiting-circles-01") },
];

export function OrbitingCirclesDocsPage() {
  return (
    <DocsComponentCatalogPage
      componentSlug="orbiting-circles"
      title="Orbiting Circles"
      description="Explore our /ui Orbiting Circles component, built using React, Tailwind CSS, and /ui. Works well for dashboards, landing pages, and small visual highlights where static UI feels boring."
      variants={VARIANTS}
    />
  );
}
