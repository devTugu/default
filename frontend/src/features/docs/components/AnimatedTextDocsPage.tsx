"use client";

import { DocsComponentCatalogPage, type DocsCatalogVariant } from "./DocsComponentCatalogPage";

const VARIANTS: DocsCatalogVariant[] = [
  { label: "Animated Text 12 - Origami Fold", load: () => import("@default/ui/composed/animated-text/animated-text-12") },
  { label: "Animated Text 11 - Light Leak", load: () => import("@default/ui/composed/animated-text/animated-text-11") },
  { label: "Animated Text 10 - Scanner", load: () => import("@default/ui/composed/animated-text/animated-text-10") },
  { label: "Animated Text 09 - Text Decoder", load: () => import("@default/ui/composed/animated-text/animated-text-09") },
  { label: "Animated Text 08 - Marker Highlight", load: () => import("@default/ui/composed/animated-text/animated-text-08") },
  { label: "Animated Text 07 - Morph Text", load: () => import("@default/ui/composed/animated-text/animated-text-07") },
  { label: "Animated Text 06 - Reveal Text", load: () => import("@default/ui/composed/animated-text/animated-text-06") },
  { label: "Animated Text 05 - Shimmer Text", load: () => import("@default/ui/composed/animated-text/animated-text-05") },
  { label: "Animated Text 04 - Rolling Text", load: () => import("@default/ui/composed/animated-text/animated-text-04") },
  { label: "Animated Text 03 - Typing", load: () => import("@default/ui/composed/animated-text/animated-text-03") },
  { label: "Animated Text 02 - Gradient Text", load: () => import("@default/ui/composed/animated-text/animated-text-02") },
  { label: "Animated Text 01 - Shiny Text", load: () => import("@default/ui/composed/animated-text/animated-text-01") },
];

export function AnimatedTextDocsPage() {
  return (
    <DocsComponentCatalogPage
      componentSlug="animated-text"
      title="Animated Text"
      description="Discover 12+ animated text components built with React and Tailwind CSS. Smooth, eye-catching typography animations that stay accessible and customizable."
      variants={VARIANTS}
    />
  );
}
