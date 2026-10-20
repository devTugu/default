"use client";

import { DocsComponentCatalogPage, type DocsCatalogVariant } from "./DocsComponentCatalogPage";

const VARIANTS: DocsCatalogVariant[] = [
  { label: "Questionnaire 01 - Topic-Based Assessment", load: () => import("@default/ui/composed/questionnaire/questionnaire-01") },
];

export function QuestionnaireDocsPage() {
  return (
    <DocsComponentCatalogPage
      componentSlug="questionnaire"
      title="Questionnaire"
      description="Questionnaire components synced from Default registry — preview variants and copy-ready demos."
      variants={VARIANTS}
    />
  );
}
