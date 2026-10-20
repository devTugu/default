"use client";

import type { ComponentType } from "react";
import { DocsMarketingBlockCatalogPage } from "./DocsMarketingBlockCatalogPage";
import { DocsMarketingBlockCategoryPage } from "./DocsMarketingBlockCategoryPage";
import { DocsNavbarPreview } from "./DocsNavbarPreview";
import { createNavbarBlockVariants } from "../navbar-block-variants";

function wrapNavbarPreview(Component: ComponentType): ComponentType {
  function NavbarBlockPreview() {
    return (
      <DocsNavbarPreview>
        <Component />
      </DocsNavbarPreview>
    );
  }
  NavbarBlockPreview.displayName = `NavbarPreview(${Component.displayName ?? Component.name ?? "Block"})`;
  return NavbarBlockPreview;
}

const NAVBAR_LOADERS = {
  "navbar-01": () =>
    import("@default/ui/composed/navbar/navbar-01").then((mod) => ({
      default: wrapNavbarPreview(mod.default),
    })),
  "navbar-02": () =>
    import("@default/ui/composed/navbar/navbar-02").then((mod) => ({
      default: wrapNavbarPreview(mod.default),
    })),
  "navbar-03": () =>
    import("@default/ui/composed/navbar/navbar-03").then((mod) => ({
      default: wrapNavbarPreview(mod.default),
    })),
  "navbar-04": () =>
    import("@default/ui/composed/navbar/navbar-04").then((mod) => ({
      default: wrapNavbarPreview(mod.default),
    })),
  "navbar-05": () =>
    import("@default/ui/composed/navbar/navbar-05").then((mod) => ({
      default: wrapNavbarPreview(mod.default),
    })),
  "navbar-06": () =>
    import("@default/ui/composed/navbar/navbar-06").then((mod) => ({
      default: wrapNavbarPreview(mod.default),
    })),
  "navbar-07": () =>
    import("@default/ui/composed/navbar/navbar-07").then((mod) => ({
      default: wrapNavbarPreview(mod.default),
    })),
  "navbar-08": () =>
    import("@default/ui/composed/navbar/navbar-08").then((mod) => ({
      default: wrapNavbarPreview(mod.default),
    })),
  "navbar-09": () =>
    import("@default/ui/composed/navbar/navbar-09").then((mod) => ({
      default: wrapNavbarPreview(mod.default),
    })),
  "navbar-10": () =>
    import("@default/ui/composed/navbar/navbar-10").then((mod) => ({
      default: wrapNavbarPreview(mod.default),
    })),
  "navbar-11": () =>
    import("@default/ui/composed/navbar/navbar-11").then((mod) => ({
      default: wrapNavbarPreview(mod.default),
    })),
  "navbar-12": () =>
    import("@default/ui/composed/navbar/navbar-12").then((mod) => ({
      default: wrapNavbarPreview(mod.default),
    })),
  "navbar-13": () =>
    import("@default/ui/composed/navbar/navbar-13").then((mod) => ({
      default: wrapNavbarPreview(mod.default),
    })),
};

const VARIANTS = createNavbarBlockVariants(
  (id) => NAVBAR_LOADERS[id as keyof typeof NAVBAR_LOADERS],
);

export function NavbarDocsPage() {
  return (
    <DocsMarketingBlockCategoryPage tab="marketing" segment="Navbar section">
      <DocsMarketingBlockCatalogPage
        title="Navbar section"
        description="Explore 13+ responsive navbar blocks for navigation menus and headers. Preview layouts and copy ready-to-use blocks for website navigation."
        variants={VARIANTS}
      />
    </DocsMarketingBlockCategoryPage>
  );
}
