"use client";

import { DocsComponentCatalogPage, type DocsCatalogVariant } from "./DocsComponentCatalogPage";

const VARIANTS: DocsCatalogVariant[] = [
  { label: "Number Ticker 08 - Segmented LCD", load: () => import("@default/ui/composed/number-ticker/number-ticker-08") },
  { label: "Number Ticker 07 - Trading", load: () => import("@default/ui/composed/number-ticker/number-ticker-07") },
  { label: "Number Ticker 06 - Social Proof", load: () => import("@default/ui/composed/number-ticker/number-ticker-06") },
  { label: "Number Ticker 05 - Real-Time Metrics Counter", load: () => import("@default/ui/composed/number-ticker/number-ticker-05") },
  { label: "Number Ticker 04 - Growth Metrics Counter", load: () => import("@default/ui/composed/number-ticker/number-ticker-04") },
  { label: "Number Ticker 03 - Countdown Counter", load: () => import("@default/ui/composed/number-ticker/number-ticker-03") },
  { label: "Number Ticker 02 - Currency Counter", load: () => import("@default/ui/composed/number-ticker/number-ticker-02") },
  { label: "Number Ticker 01 - Basic", load: () => import("@default/ui/composed/number-ticker/number-ticker-01") },
];

export function NumberTickerDocsPage() {
  return (
    <DocsComponentCatalogPage
      componentSlug="number-ticker"
      title="Number Ticker"
      description="Number Ticker components synced from Default registry — preview variants and copy-ready demos."
      variants={VARIANTS}
    />
  );
}
