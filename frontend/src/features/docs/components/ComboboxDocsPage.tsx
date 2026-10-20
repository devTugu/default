"use client";

import { DocsComponentCatalogPage, type DocsCatalogVariant } from "./DocsComponentCatalogPage";

const VARIANTS: DocsCatalogVariant[] = [
  { label: "Combobox 10 - Creatable", load: () => import("@default/ui/composed/combobox/combobox-10") },
  { label: "Combobox 09 - Multiple Count Badge", load: () => import("@default/ui/composed/combobox/combobox-09"), isPro: true },
  { label: "Combobox 08 - Multiple Expandable", load: () => import("@default/ui/composed/combobox/combobox-08"), isPro: true },
  { label: "Combobox 07 - Multiple", load: () => import("@default/ui/composed/combobox/combobox-07"), isPro: true },
  { label: "Combobox 06 - With Flag", load: () => import("@default/ui/composed/combobox/combobox-06") },
  { label: "Combobox 05 - Users", load: () => import("@default/ui/composed/combobox/combobox-05") },
  { label: "Combobox 04 - Timezone", load: () => import("@default/ui/composed/combobox/combobox-04") },
  { label: "Combobox 03 - With Add Button", load: () => import("@default/ui/composed/combobox/combobox-03") },
  { label: "Combobox 02 - With Custom Check Icon", load: () => import("@default/ui/composed/combobox/combobox-02") },
  { label: "Combobox 01 - With Icons", load: () => import("@default/ui/composed/combobox/combobox-01") },
];

export function ComboboxDocsPage() {
  return (
    <DocsComponentCatalogPage
      componentSlug="combobox"
      title="Combobox"
      description="Combobox components synced from Default registry — preview variants and copy-ready demos."
      variants={VARIANTS}
    />
  );
}
