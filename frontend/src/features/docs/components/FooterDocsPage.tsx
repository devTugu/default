"use client";

import type { ComponentType } from "react";
import {
  DocsMarketingBlockCatalogPage,
  type DocsMarketingBlockVariant,
} from "./DocsMarketingBlockCatalogPage";
import { DocsFooterPreview } from "./DocsFooterPreview";
import { DocsMarketingBlockCategoryPage } from "./DocsMarketingBlockCategoryPage";
import type { DocsDemoLoad } from "./docs-preview-types";

const PREVIEW = "min-h-0 w-full p-0";

function footerPreview(Component: ComponentType): ComponentType {
  function FooterBlockPreview() {
    return (
      <DocsFooterPreview>
        <Component />
      </DocsFooterPreview>
    );
  }
  FooterBlockPreview.displayName = `FooterPreview(${Component.displayName ?? Component.name ?? "Block"})`;
  return FooterBlockPreview;
}

const FOOTER_LOADERS: Record<string, DocsDemoLoad> = {
  "footer-01": () =>
    import("@default/ui/composed/footer/footer-01").then((mod) => ({
      default: footerPreview(mod.default),
    })),
  "footer-02": () =>
    import("@default/ui/composed/footer/footer-02").then((mod) => ({
      default: footerPreview(mod.default),
    })),
  "footer-03": () =>
    import("@default/ui/composed/footer/footer-03").then((mod) => ({
      default: footerPreview(mod.default),
    })),
  "footer-04": () =>
    import("@default/ui/composed/footer/footer-04").then((mod) => ({
      default: footerPreview(mod.default),
    })),
  "footer-05": () =>
    import("@default/ui/composed/footer/footer-05").then((mod) => ({
      default: footerPreview(mod.default),
    })),
  "footer-06": () =>
    import("@default/ui/composed/footer/footer-06").then((mod) => ({
      default: footerPreview(mod.default),
    })),
  "footer-07": () =>
    import("@default/ui/composed/footer/footer-07").then((mod) => ({
      default: footerPreview(mod.default),
    })),
};

function loadFooter(file: keyof typeof FOOTER_LOADERS): DocsDemoLoad {
  return FOOTER_LOADERS[file];
}

const VARIANTS: DocsMarketingBlockVariant[] = [
  {
    title: "Footer 07 - SaaS Footer with Nav Columns",
    description:
      "A clean SaaS footer with a logo and social icons column, three grouped nav link columns (Platform, Solutions, Resources), a separator, a legal links and copyright bar, and a large decorative wordmark subfooter.",
    load: loadFooter("footer-07"),
    isPro: true,
    previewClassName: PREVIEW,
  },
  {
    title: "Footer 06 - Creative Contact Footer",
    description:
      "A bold, conversion-focused footer that highlights your contact details, personal brand, and social presence—encouraging visitors to connect, collaborate, and turn ideas into extraordinary digital experiences.",
    load: loadFooter("footer-06"),
    isPro: true,
    previewClassName: PREVIEW,
  },
  {
    title: "Footer 02 - Dark Conversion Footer",
    description:
      "A bold dark themed footer with newsletter signup, strong contact CTA, navigation links, and legal pages, ideal for real estate or SaaS websites to drive engagement at the page end.",
    load: loadFooter("footer-02"),
    previewClassName: PREVIEW,
  },
  {
    title: "Footer 01 - Agency Footer Layout",
    description:
      "A clean multi column footer with brand summary, sitemap links, legal pages, contact details, and social icons, perfect for agencies to provide clarity, trust, and easy navigation.",
    load: loadFooter("footer-01"),
    previewClassName: PREVIEW,
  },
  {
    title: "Footer 03 - Footer with Newsletter",
    description:
      "A modern footer combining quick navigation, policy links, and a newsletter signup, designed to improve accessibility, encourage subscriptions, and provide a polished closing experience.",
    load: loadFooter("footer-03"),
    isPro: true,
    previewClassName: PREVIEW,
  },
  {
    title: "Footer 04 - Multi-Column Mega Footer",
    description:
      "A structured mega footer with categorized links, service listings, social connections, and newsletter signup—helping users navigate faster, discover resources easily, and stay engaged beyond the page.",
    load: loadFooter("footer-04"),
    isPro: true,
    previewClassName: PREVIEW,
  },
  {
    title: "Footer 05 - Minimal Navigation Footer",
    description:
      "A clean, minimal footer featuring essential navigation links, brand identity, and copyright details—designed to provide quick access while maintaining a polished and distraction-free layout.",
    load: loadFooter("footer-05"),
    isPro: true,
    previewClassName: PREVIEW,
  },
];

export function FooterDocsPage() {
  return (
    <DocsMarketingBlockCategoryPage tab="marketing" segment="Footer section">
      <DocsMarketingBlockCatalogPage
        title="Footer section"
        description="Explore 7+ clean footer blocks for links, navigation, and site information. Preview layouts and copy ready-to-use blocks for website footers."
        variants={VARIANTS}
      />
    </DocsMarketingBlockCategoryPage>
  );
}
