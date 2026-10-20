"use client";

import { DocsComponentCatalogPage, type DocsCatalogVariant } from "./DocsComponentCatalogPage";

const VARIANTS: DocsCatalogVariant[] = [
  { label: "Button Group 13 - Star Rating", load: () => import("@default/ui/composed/button-group/button-group-13") },
  { label: "Button Group 12 - Action Dropdown", load: () => import("@default/ui/composed/button-group/button-group-12") },
  { label: "Button Group 11 - Deploy Environment", load: () => import("@default/ui/composed/button-group/button-group-11") },
  { label: "Button Group 10 - Editor Toolbar", load: () => import("@default/ui/composed/button-group/button-group-10") },
  { label: "Button Group 09 - Follow", load: () => import("@default/ui/composed/button-group/button-group-09") },
  { label: "Button Group 08 - Github star bar", load: () => import("@default/ui/composed/button-group/button-group-08") },
  { label: "Button Group 07 - Alignment", load: () => import("@default/ui/composed/button-group/button-group-07") },
  { label: "Button Group 06 - Vercel", load: () => import("@default/ui/composed/button-group/button-group-06") },
  { label: "Button Group 05 - Currency", load: () => import("@default/ui/composed/button-group/button-group-05") },
  { label: "Button Group 04 - Separator", load: () => import("@default/ui/composed/button-group/button-group-04") },
  { label: "Button Group 03 - Pagination", load: () => import("@default/ui/composed/button-group/button-group-03") },
  { label: "Button Group 02 - Vertical", load: () => import("@default/ui/composed/button-group/button-group-02") },
  { label: "Button Group 01 - Basic", load: () => import("@default/ui/composed/button-group/button-group-01") },
];

export function ButtonGroupDocsPage() {
  return (
    <DocsComponentCatalogPage
      componentSlug="button-group"
      title="Button Group"
      description="Button Group components synced from Default registry — preview variants and copy-ready demos."
      variants={VARIANTS}
    />
  );
}
