"use client";

import { DocsComponentCatalogPage, type DocsCatalogVariant } from "./DocsComponentCatalogPage";

const VARIANTS: DocsCatalogVariant[] = [
  { label: "Field 04 - Shipping Address", load: () => import("@default/ui/composed/field/field-04") },
  { label: "Field 03 - Choose a Plan", load: () => import("@default/ui/composed/field/field-03") },
  { label: "Field 02 - Notification Settings", load: () => import("@default/ui/composed/field/field-02") },
  { label: "Field 01 - Sign In Form", load: () => import("@default/ui/composed/field/field-01") },
];

export function FieldDocsPage() {
  return (
    <DocsComponentCatalogPage
      componentSlug="field"
      title="Field"
      description="Explore ready-to-use /ui Field components built with React and Tailwind CSS — composable labels, descriptions, and validation layout for sign-in, settings, plans, and checkout forms."
      variants={VARIANTS}
      previewClassName="min-h-56 items-start justify-start bg-background px-8 py-8"
    />
  );
}
