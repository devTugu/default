"use client";

import { DocsComponentCatalogPage, type DocsCatalogVariant } from "./DocsComponentCatalogPage";

const PREVIEW = "w-full max-w-md !items-stretch justify-center py-8";

const VARIANTS: DocsCatalogVariant[] = [
  { label: "Textarea 09 - Disabled Textarea", load: () => import("@default/ui/composed/textarea/textarea-09"), previewClassName: PREVIEW },
  { label: "Textarea 08 - Textarea with helper text", load: () => import("@default/ui/composed/textarea/textarea-08"), previewClassName: PREVIEW },
  { label: "Textarea 07 - Textarea with floating label", load: () => import("@default/ui/composed/textarea/textarea-07"), previewClassName: PREVIEW },
  { label: "Textarea 06 - Textarea with characters left", load: () => import("@default/ui/composed/textarea/textarea-06"), previewClassName: PREVIEW },
  { label: "Textarea 05 - Auto growing textarea", load: () => import("@default/ui/composed/textarea/textarea-05"), previewClassName: PREVIEW },
  { label: "Textarea 04 - Textarea with button", load: () => import("@default/ui/composed/textarea/textarea-04"), previewClassName: PREVIEW },
  { label: "Textarea 03 - Required Textarea", load: () => import("@default/ui/composed/textarea/textarea-03"), previewClassName: PREVIEW },
  { label: "Textarea 02 - Textarea with icon", load: () => import("@default/ui/composed/textarea/textarea-02"), previewClassName: PREVIEW },
  { label: "Textarea 01 - Feedback Textarea", load: () => import("@default/ui/composed/textarea/textarea-01"), previewClassName: PREVIEW },
];

export function TextareaDocsPage() {
  return (
    <DocsComponentCatalogPage
      componentSlug="textarea"
      title="Textarea"
      description="Browse our 9+ /ui UI textarea components built with Next.js, React, Tailwind CSS, and /ui. Ready to copy, customize, and use in real web projects."
      variants={VARIANTS}
    />
  );
}
