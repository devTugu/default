"use client";

import { DocsComponentCatalogPage, type DocsCatalogVariant } from "./DocsComponentCatalogPage";

const VARIANTS: DocsCatalogVariant[] = [
  { label: "Date Picker 04 - Multi-language", load: () => import("@default/ui/composed/date-picker/date-picker-04"), isPro: true },
  { label: "Date Picker 03 - Time Picker", load: () => import("@default/ui/composed/date-picker/date-picker-03") },
  { label: "Date Picker 02 - Date Range", load: () => import("@default/ui/composed/date-picker/date-picker-02") },
  { label: "Date Picker 01 - Data & Time Picker", load: () => import("@default/ui/composed/date-picker/date-picker-01") },
];

export function DatePickerDocsPage() {
  return (
    <DocsComponentCatalogPage
      componentSlug="date-picker"
      title="Date Picker"
      description="Date Picker components synced from Default registry — preview variants and copy-ready demos."
      variants={VARIANTS}
    />
  );
}
