"use client";

import { DocsComponentCatalogPage, type DocsCatalogVariant } from "./DocsComponentCatalogPage";

const VARIANTS: DocsCatalogVariant[] = [
  { label: "Button 33 - Generate AI", load: () => import("@default/ui/composed/button/button-33") },
  { label: "Button 32 - Emoji Burst", load: () => import("@default/ui/composed/button/button-32") },
  { label: "Button 31 - Confetti", load: () => import("@default/ui/composed/button/button-31") },
  { label: "Button 30 - Multi-State Send", load: () => import("@default/ui/composed/button/button-30") },
  { label: "Button 29 - Hold to Charge", load: () => import("@default/ui/composed/button/button-29") },
  { label: "Button 28 - Slide to Confirm", load: () => import("@default/ui/composed/button/button-28") },
  { label: "Button 27 - Encrypt", load: () => import("@default/ui/composed/button/button-27") },
  { label: "Button 26 - Coupon reveal Button", load: () => import("@default/ui/composed/button/button-26"), isPro: true },
  { label: "Button 25 - Ripple Button", load: () => import("@default/ui/composed/button/button-25") },
  { label: "Button 24 - Copy Button", load: () => import("@default/ui/composed/button/button-24") },
  { label: "Button 23 - Permissions Button", load: () => import("@default/ui/composed/button/button-23") },
  { label: "Button 22 - Loading Button", load: () => import("@default/ui/composed/button/button-22") },
  { label: "Button 21 - Animated Upvote Button", load: () => import("@default/ui/composed/button/button-21") },
  { label: "Button 20 - Animated Like Button", load: () => import("@default/ui/composed/button/button-20") },
  { label: "Button 19 - Interactive Hover", load: () => import("@default/ui/composed/button/button-19") },
  { label: "Button 18 - Promo Code Copy", load: () => import("@default/ui/composed/button/button-18") },
  { label: "Button 17 - Blob Fill", load: () => import("@default/ui/composed/button/button-17") },
  { label: "Button 16 - Ripple Spotlight", load: () => import("@default/ui/composed/button/button-16") },
  { label: "Button 15 - Size lg", load: () => import("@default/ui/composed/button/button-15") },
  { label: "Button 14 - Size sm", load: () => import("@default/ui/composed/button/button-14") },
  { label: "Button 13 - Size xs", load: () => import("@default/ui/composed/button/button-13") },
  { label: "Button 12 - Default", load: () => import("@default/ui/composed/button/button-12") },
  { label: "Button 11 - Cancel", load: () => import("@default/ui/composed/button/button-11") },
  { label: "Button 10 - Save", load: () => import("@default/ui/composed/button/button-10") },
  { label: "Button 09 - Outline With Icon", load: () => import("@default/ui/composed/button/button-09") },
  { label: "Button 08 - Social Icon", load: () => import("@default/ui/composed/button/button-08") },
  { label: "Button 07 - Social", load: () => import("@default/ui/composed/button/button-07") },
  { label: "Button 06 - Animated Border", load: () => import("@default/ui/composed/button/button-06") },
  { label: "Button 05 - Get Figma File", load: () => import("@default/ui/composed/button/button-05") },
  { label: "Button 04 - Heartbeat Effect", load: () => import("@default/ui/composed/button/button-04") },
  { label: "Button 03 - Shine Hover", load: () => import("@default/ui/composed/button/button-03") },
  { label: "Button 02 - Shiny Text", load: () => import("@default/ui/composed/button/button-02") },
  { label: "Button 01 - With Icon", load: () => import("@default/ui/composed/button/button-01") },
];

export function ButtonDocsPage() {
  return (
    <DocsComponentCatalogPage
      componentSlug="button"
      title="Button"
      description="Button components synced from Default registry — preview variants and copy-ready demos."
      variants={VARIANTS}
    />
  );
}
