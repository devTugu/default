"use client";

import { DocsComponentCatalogPage, type DocsCatalogVariant } from "./DocsComponentCatalogPage";

const VARIANTS: DocsCatalogVariant[] = [
  { label: "Command 07 - Filter Search", load: () => import("@default/ui/composed/command/command-07") },
  { label: "Command 06 - Search Files", load: () => import("@default/ui/composed/command/command-06") },
  { label: "Command 05 - Developer Actions", load: () => import("@default/ui/composed/command/command-05") },
  { label: "Command 04 - Team Member Search", load: () => import("@default/ui/composed/command/command-04") },
  { label: "Command 03 - Palette", load: () => import("@default/ui/composed/command/command-03") },
  { label: "Command 02 - Scrollable", load: () => import("@default/ui/composed/command/command-02") },
  { label: "Command 01 - Shortcut Menu", load: () => import("@default/ui/composed/command/command-01") },
];

export function CommandDocsPage() {
  return (
    <DocsComponentCatalogPage
      componentSlug="command"
      title="Command"
      description="Command components synced from Default registry — preview variants and copy-ready demos."
      variants={VARIANTS}
    />
  );
}
