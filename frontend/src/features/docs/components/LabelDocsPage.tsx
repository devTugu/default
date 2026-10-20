"use client";

import { DocsComponentCatalogPage, type DocsCatalogVariant } from "./DocsComponentCatalogPage";

const VARIANTS: DocsCatalogVariant[] = [
  { label: "Label 06 - Floating Label", load: () => import("@default/ui/composed/label/label-06") },
  { label: "Label 05 - With Switch", load: () => import("@default/ui/composed/label/label-05") },
  { label: "Label 04 - With Textarea", load: () => import("@default/ui/composed/label/label-04") },
  { label: "Label 03 - With Badge", load: () => import("@default/ui/composed/label/label-03") },
  { label: "Label 02 - With Input", load: () => import("@default/ui/composed/label/label-02") },
  { label: "Label 01 - With Checkbox", load: () => import("@default/ui/composed/label/label-01") },
];

export function LabelDocsPage() {
  return (
    <DocsComponentCatalogPage
      componentSlug="label"
      title="Label"
      description="Label components synced from Default registry — preview variants and copy-ready demos."
      variants={VARIANTS}
    />
  );
}
