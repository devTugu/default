"use client";

import { DocsComponentCatalogPage, type DocsCatalogVariant } from "./DocsComponentCatalogPage";

const WIDE = "w-full max-w-md !items-stretch justify-center py-6";

const VARIANTS: DocsCatalogVariant[] = [
  { label: "Switch 08 - Role Picker", load: () => import("@default/ui/composed/switch/switch-08"), previewClassName: "py-6" },
  { label: "Switch 07 - Labeled Toggle", load: () => import("@default/ui/composed/switch/switch-07"), previewClassName: "py-6" },
  { label: "Switch 06 - Custom Colors", load: () => import("@default/ui/composed/switch/switch-06"), previewClassName: "py-6" },
  { label: "Switch 05 - With label", load: () => import("@default/ui/composed/switch/switch-05"), previewClassName: "py-6" },
  {
    label: "Switch 04 - With Description",
    load: () => import("@default/ui/composed/switch/switch-04"),
    previewClassName: WIDE,
  },
  { label: "Switch 03 - Toggle theme", load: () => import("@default/ui/composed/switch/switch-03"), previewClassName: "py-6" },
  { label: "Switch 02 - With Icon", load: () => import("@default/ui/composed/switch/switch-02"), previewClassName: "py-6" },
  {
    label: "Switch 01 - Active effect",
    load: () => import("@default/ui/composed/switch/switch-01"),
    previewClassName: WIDE,
  },
];

export function SwitchDocsPage() {
  return (
    <DocsComponentCatalogPage
      componentSlug="switch"
      title="Switch"
      description="Explore a set of 8+ /ui Switch components for Next.js and React apps, styled with Tailwind CSS and /ui. Ready to copy, customize, and use in real web projects."
      variants={VARIANTS}
    />
  );
}
