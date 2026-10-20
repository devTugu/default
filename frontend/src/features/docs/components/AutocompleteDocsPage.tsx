"use client";

import { DocsComponentCatalogPage, type DocsCatalogVariant } from "./DocsComponentCatalogPage";

const VARIANTS: DocsCatalogVariant[] = [
  { label: "Autocomplete 06 - With Icon", load: () => import("@default/ui/composed/autocomplete/autocomplete-06") },
  { label: "Autocomplete 05 - Async Search", load: () => import("@default/ui/composed/autocomplete/autocomplete-05") },
  { label: "Autocomplete 04 - Team Member Search", load: () => import("@default/ui/composed/autocomplete/autocomplete-04") },
  { label: "Autocomplete 03 - Vanish Animation", load: () => import("@default/ui/composed/autocomplete/autocomplete-03") },
  { label: "Autocomplete 02 - Size variants", load: () => import("@default/ui/composed/autocomplete/autocomplete-02") },
  { label: "Autocomplete 01 - Default", load: () => import("@default/ui/composed/autocomplete/autocomplete-01") },
];

export function AutocompleteDocsPage() {
  return (
    <DocsComponentCatalogPage
      componentSlug="autocomplete"
      title="Autocomplete"
      description="Ready-to-use /ui Autocomplete components with async search, team member search, icons, and smart suggestions. Built with React, Next.js, and Tailwind CSS."
      variants={VARIANTS}
    />
  );
}
