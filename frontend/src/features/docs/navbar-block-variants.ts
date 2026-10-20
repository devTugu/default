import type { DocsMarketingBlockVariant } from "./components/DocsMarketingBlockCatalogPage";
import type { DocsDemoLoad } from "./components/docs-preview-types";
import { NAVBAR_BLOCK_DEFS } from "./navbar-block-variant-defs";

const PREVIEW = "min-h-0 w-full p-0";

export function createNavbarBlockVariants(
  loadNavbar: (id: string) => DocsDemoLoad,
): DocsMarketingBlockVariant[] {
  return NAVBAR_BLOCK_DEFS.map((def) => ({
    title: def.title,
    description: def.description,
    load: loadNavbar(def.id),
    isPro: "isPro" in def ? def.isPro : undefined,
    isFree: "isFree" in def ? def.isFree : undefined,
    unclipPreview: "unclipPreview" in def ? def.unclipPreview : undefined,
    blockPreview: "blockPreview" in def ? def.blockPreview : undefined,
    previewClassName: `${PREVIEW} ${def.previewClassName}`,
  }));
}
