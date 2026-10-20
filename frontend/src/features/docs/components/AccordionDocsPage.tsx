"use client";

import { DocsComponentCatalogPage, type DocsCatalogVariant } from "./DocsComponentCatalogPage";

const VARIANTS: DocsCatalogVariant[] = [
  { label: "Accordion-09 - Animated Line", isPro: true, load: () => import("@default/ui/composed/accordion/accordion-09").then((m) => ({ default: m.Accordion09AnimatedLine })) },
  { label: "Accordion 08 - Animated Line", isPro: true, load: () => import("@default/ui/composed/accordion/accordion-08").then((m) => ({ default: m.Accordion08AnimatedLine })) },
  { label: "Accordion 07 - Motion Services", load: () => import("@default/ui/composed/accordion/accordion-07") },
  { label: "Accordion 06 - Filled Trigger", load: () => import("@default/ui/composed/accordion/accordion-06") },
  { label: "Accordion 05 - Media", load: () => import("@default/ui/composed/accordion/accordion-05") },
  { label: "Accordion 04 - Card", load: () => import("@default/ui/composed/accordion/accordion-04") },
  { label: "Accordion 03 - Numbered FAQ", load: () => import("@default/ui/composed/accordion/accordion-03") },
  { label: "Accordion 02 - Multi-Level", load: () => import("@default/ui/composed/accordion/accordion-02") },
  { label: "Accordion 01 - With Icon & Subtitle", load: () => import("@default/ui/composed/accordion/accordion-01") },
];

export function AccordionDocsPage() {
  return (
    <DocsComponentCatalogPage
      componentSlug="accordion"
      title="Accordion"
      description="Discover a curated collection of /ui Accordion components with 9+ customizable and interactive accordion variants built using React and Tailwind CSS."
      variants={VARIANTS}
    />
  );
}
