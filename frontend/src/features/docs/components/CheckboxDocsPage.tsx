"use client";

import { DocsComponentCatalogPage, type DocsCatalogVariant } from "./DocsComponentCatalogPage";

const VARIANTS: DocsCatalogVariant[] = [
  { label: "Checkbox 10 - Checkbox with avatar and group", load: () => import("@default/ui/composed/checkbox/checkbox-10") },
  { label: "Checkbox 09 - Checkbox with tree", load: () => import("@default/ui/composed/checkbox/checkbox-09") },
  { label: "Checkbox 08 - Checkbox with dashed border", load: () => import("@default/ui/composed/checkbox/checkbox-08") },
  { label: "Checkbox 07 - Checkbox with custom icons", load: () => import("@default/ui/composed/checkbox/checkbox-07") },
  { label: "Checkbox 06 - Checkbox with form", load: () => import("@default/ui/composed/checkbox/checkbox-06") },
  { label: "Checkbox 05 - Checkbox with list group", load: () => import("@default/ui/composed/checkbox/checkbox-05") },
  { label: "Checkbox 04 - Checkbox with todo list", load: () => import("@default/ui/composed/checkbox/checkbox-04") },
  { label: "Checkbox 03 - Checkbox with colors", load: () => import("@default/ui/composed/checkbox/checkbox-03") },
  { label: "Checkbox 02 - Checkbox with vertical group", load: () => import("@default/ui/composed/checkbox/checkbox-02") },
  { label: "Checkbox 01 - Checkbox with sizes", load: () => import("@default/ui/composed/checkbox/checkbox-01") },
];

export function CheckboxDocsPage() {
  return (
    <DocsComponentCatalogPage
      componentSlug="checkbox"
      title="Checkbox"
      description="Checkbox components synced from Default registry — preview variants and copy-ready demos."
      variants={VARIANTS}
    />
  );
}
