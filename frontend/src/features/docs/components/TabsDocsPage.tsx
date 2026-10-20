"use client";

import { DocsComponentCatalogPage, type DocsCatalogVariant } from "./DocsComponentCatalogPage";

const WIDE = "w-full max-w-2xl !items-stretch justify-center py-6";

const VARIANTS: DocsCatalogVariant[] = [
  {
    label: "Tabs 10 - Assistant Tabs",
    load: () => import("@default/ui/composed/tabs/tabs-10"),
    isPro: true,
    previewClassName: "w-full max-w-md py-8",
  },
  {
    label: "Tabs 09 - Seasonal PixelSnow Tabs",
    load: () => import("@default/ui/composed/tabs/tabs-09"),
    previewClassName: WIDE,
  },
  {
    label: "Tabs 08 - Animated Dashboard Tabs",
    load: () => import("@default/ui/composed/tabs/tabs-08"),
    previewClassName: WIDE,
  },
  { label: "Tabs 07 - Icon & Description", load: () => import("@default/ui/composed/tabs/tabs-07"), previewClassName: WIDE },
  { label: "Tabs 06 - Vertical", load: () => import("@default/ui/composed/tabs/tabs-06"), previewClassName: "py-6" },
  { label: "Tabs 05 - Underline", load: () => import("@default/ui/composed/tabs/tabs-05"), previewClassName: WIDE },
  { label: "Tabs 04 - With Count", load: () => import("@default/ui/composed/tabs/tabs-04"), previewClassName: WIDE },
  { label: "Tabs 03 - With Icon", load: () => import("@default/ui/composed/tabs/tabs-03"), previewClassName: WIDE },
  { label: "Tabs 02 - Transition", load: () => import("@default/ui/composed/tabs/tabs-02"), previewClassName: WIDE },
  { label: "Tabs 01 - Animated", load: () => import("@default/ui/composed/tabs/tabs-01"), previewClassName: WIDE },
];

export function TabsDocsPage() {
  return (
    <DocsComponentCatalogPage
      componentSlug="tabs"
      title="Tabs"
      description="Discover a curated collection of /ui Tabs components with 10+ customizable and interactive tab variants built using React and Tailwind CSS."
      variants={VARIANTS}
    />
  );
}
