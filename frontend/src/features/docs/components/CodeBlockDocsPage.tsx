"use client";

import { DocsComponentCatalogPage, type DocsCatalogVariant } from "./DocsComponentCatalogPage";

const VARIANTS: DocsCatalogVariant[] = [
  { label: "Code Block 07 - Install Command", load: () => import("@default/ui/composed/code-block/code-block-07") },
  { label: "Code Block 06 - Language Tabs", load: () => import("@default/ui/composed/code-block/code-block-06") },
  { label: "Code Block 05 - Multi File", load: () => import("@default/ui/composed/code-block/code-block-05") },
  { label: "Code Block 04 - Highlighted Line", load: () => import("@default/ui/composed/code-block/code-block-04") },
  { label: "Code Block 03 - Custom Background", load: () => import("@default/ui/composed/code-block/code-block-03") },
  { label: "Code Block 02 - Scrollable", load: () => import("@default/ui/composed/code-block/code-block-02") },
  { label: "Code Block 01 - Default", load: () => import("@default/ui/composed/code-block/code-block-01") },
];

export function CodeBlockDocsPage() {
  return (
    <DocsComponentCatalogPage
      componentSlug="code-block"
      title="Code Block"
      description="Code Block components synced from Default registry — preview variants and copy-ready demos."
      variants={VARIANTS}
    />
  );
}
