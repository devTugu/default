"use client";

import { DocsComponentCatalogPage, type DocsCatalogVariant } from "./DocsComponentCatalogPage";

const VARIANTS: DocsCatalogVariant[] = [
  { label: "Spinner 10 - Liquid Wave", load: () => import("@default/ui/composed/spinner/spinner-10") },
  { label: "Spinner 09 - Ripple", load: () => import("@default/ui/composed/spinner/spinner-09") },
  { label: "Spinner 08 - Clock Ring", load: () => import("@default/ui/composed/spinner/spinner-08") },
  { label: "Spinner 07 - Orbital Spinner", load: () => import("@default/ui/composed/spinner/spinner-07") },
  { label: "Spinner 06 - Bars", load: () => import("@default/ui/composed/spinner/spinner-06") },
  { label: "Spinner 05 - Ellipsis", load: () => import("@default/ui/composed/spinner/spinner-05") },
  { label: "Spinner 04 - Circle Filled", load: () => import("@default/ui/composed/spinner/spinner-04") },
  { label: "Spinner 03 - Pinwheel", load: () => import("@default/ui/composed/spinner/spinner-03") },
  { label: "Spinner 02 - Throbber", load: () => import("@default/ui/composed/spinner/spinner-02") },
  { label: "Spinner 01 - Default", load: () => import("@default/ui/composed/spinner/spinner-01") },
];

export function SpinnerDocsPage() {
  return (
    <DocsComponentCatalogPage
      componentSlug="spinner"
      title="Spinner"
      description="Spinner components synced from Default registry — preview variants and copy-ready demos."
      variants={VARIANTS}
    />
  );
}
