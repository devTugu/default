"use client";

import { DocsComponentCatalogPage, type DocsCatalogVariant } from "./DocsComponentCatalogPage";

const VARIANTS: DocsCatalogVariant[] = [
  { label: "Input Mask 03 - MAC Address", load: () => import("@default/ui/composed/input-mask/input-mask-03") },
  { label: "Input Mask 02 - Card Expiry Date", load: () => import("@default/ui/composed/input-mask/input-mask-02") },
  { label: "Input Mask 01 - Card Number", load: () => import("@default/ui/composed/input-mask/input-mask-01") },
];

export function InputMaskDocsPage() {
  return (
    <DocsComponentCatalogPage
      componentSlug="input-mask"
      title="Input Mask"
      description="Input Mask components synced from Default registry — preview variants and copy-ready demos."
      variants={VARIANTS}
    />
  );
}
