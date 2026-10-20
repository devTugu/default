"use client";

import { DocsComponentCatalogPage, type DocsCatalogVariant } from "./DocsComponentCatalogPage";

const VARIANTS: DocsCatalogVariant[] = [
  { label: "Select 12 - Workspace Role Select", load: () => import("@default/ui/composed/select/select-12") },
  { label: "Select 11 - Alert Channels Multi-Select", load: () => import("@default/ui/composed/select/select-11") },
  { label: "Select 10 - Flip Clock Daypart Picker", load: () => import("@default/ui/composed/select/select-10") },
  { label: "Select 09 - Select with separator", load: () => import("@default/ui/composed/select/select-09") },
  { label: "Select 08 - Select with leading text", load: () => import("@default/ui/composed/select/select-08") },
  { label: "Select 07 - Select with avatars", load: () => import("@default/ui/composed/select/select-07") },
  { label: "Select 06 - Select with multiple options", load: () => import("@default/ui/composed/select/select-06") },
  { label: "Select 05 - Select with overlapping label", load: () => import("@default/ui/composed/select/select-05") },
  { label: "Select 04 - Select with timezone", load: () => import("@default/ui/composed/select/select-04") },
  { label: "Select 03 - Select with status", load: () => import("@default/ui/composed/select/select-03") },
  { label: "Select 02 - Select with icon", load: () => import("@default/ui/composed/select/select-02") },
  { label: "Select 01 - Required select", load: () => import("@default/ui/composed/select/select-01") },
];

export function SelectDocsPage() {
  return (
    <DocsComponentCatalogPage
      componentSlug="select"
      title="Select"
      description="Discover a curated collection of /ui Select components with 12+ customizable and interactive select variants built using React and Tailwind CSS."
      variants={VARIANTS}
    />
  );
}
