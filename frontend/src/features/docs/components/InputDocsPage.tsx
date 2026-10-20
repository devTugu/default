"use client";

import { DocsComponentCatalogPage, type DocsCatalogVariant } from "./DocsComponentCatalogPage";

const VARIANTS: DocsCatalogVariant[] = [
  { label: "Input 20 - Range", load: () => import("@default/ui/composed/input/input-20") },
  {
    label: "Input 19 - With Animated Checkmark",
    load: () => import("@default/ui/composed/input/input-19"),
    previewClassName: "items-start justify-center py-8 min-h-[17rem]",
  },
  { label: "Input 18 - Disabled", load: () => import("@default/ui/composed/input/input-18") },
  { label: "Input 17 - Input with label", load: () => import("@default/ui/composed/input/input-17") },
  { label: "Input 16 - Standard Input", load: () => import("@default/ui/composed/input/input-16") },
  { label: "Input 15 - Required Input", load: () => import("@default/ui/composed/input/input-15") },
  { label: "Input 14 - Input with error", load: () => import("@default/ui/composed/input/input-14") },
  { label: "Input 13 - Input with file", load: () => import("@default/ui/composed/input/input-13") },
  { label: "Input 12 - Input with end button", load: () => import("@default/ui/composed/input/input-12") },
  { label: "Input 11 - Input with end inline button", load: () => import("@default/ui/composed/input/input-11") },
  { label: "Input 10 - Input with clear button", load: () => import("@default/ui/composed/input/input-10") },
  { label: "Input 09 - Input with floating label", load: () => import("@default/ui/composed/input/input-09") },
  { label: "Input 08 - Input with add-ons", load: () => import("@default/ui/composed/input/input-08") },
  { label: "Input 07 - Input with controls", load: () => import("@default/ui/composed/input/input-07") },
  { label: "Input 06 - Input with character counter", load: () => import("@default/ui/composed/input/input-06") },
  { label: "Input 05 - Input with start select", load: () => import("@default/ui/composed/input/input-05") },
  { label: "Input 04 - Real Time Validation", load: () => import("@default/ui/composed/input/input-04") },
  { label: "Input 03 - Input with currency", load: () => import("@default/ui/composed/input/input-03") },
  { label: "Input 02 - Input with time", load: () => import("@default/ui/composed/input/input-02") },
  { label: "Input 01 - Input with date", load: () => import("@default/ui/composed/input/input-01") },
];

export function InputDocsPage() {
  return (
    <DocsComponentCatalogPage
      componentSlug="input"
      title="Input"
      description="Discover a curated collection of /ui Input components with 20+ customizable and interactive input variants built using React and Tailwind CSS."
      variants={VARIANTS}
    />
  );
}
