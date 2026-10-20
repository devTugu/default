"use client";

import { DocsComponentCatalogPage, type DocsCatalogVariant } from "./DocsComponentCatalogPage";

const VARIANTS: DocsCatalogVariant[] = [
  { label: "Alert 08 - Evaporate Dismiss", load: () => import("@default/ui/composed/alert/alert-08") },
  { label: "Alert 07 - With Hover-Fill Dismiss", load: () => import("@default/ui/composed/alert/alert-07") },
  { label: "Alert 06 - Animated Gradient Alert", load: () => import("@default/ui/composed/alert/alert-06") },
  { label: "Alert 05 - Dark Alert", load: () => import("@default/ui/composed/alert/alert-05") },
  { label: "Alert 04 - Indicator Destructive Alert", load: () => import("@default/ui/composed/alert/alert-04") },
  { label: "Alert 03 - Social Alert", load: () => import("@default/ui/composed/alert/alert-03") },
  { label: "Alert 02 - Alert with User Detail", load: () => import("@default/ui/composed/alert/alert-02") },
  { label: "Alert 01 - Alert with Password Detail", load: () => import("@default/ui/composed/alert/alert-01") },
];

export function AlertDocsPage() {
  return (
    <DocsComponentCatalogPage
      componentSlug="alert"
      title="Alert"
      description="Discover our /ui Alert component, designed to show important messages clearly in your interface. Built with React, Next.js, and Tailwind CSS."
      variants={VARIANTS}
    />
  );
}
