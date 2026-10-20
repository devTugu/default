"use client";

import type { ComponentType } from "react";
import { cn } from "@default/ui/lib/cn";
import { getDocsVariantGridClassName } from "../docs-component-grid";
import type { DocsDemoLoad } from "./docs-preview-types";
import { DocsDemoPreview } from "./DocsLazyPreview";
import { DocsInViewMount } from "./DocsInViewMount";
import { DocsVariantFrame } from "./DocsVariantFrame";

export type DocsCatalogVariant = {
  label: string;
  isPro?: boolean;
  isNew?: boolean;
  Component?: ComponentType;
  load?: DocsDemoLoad;
  /** Grid cell classes (e.g. `lg:col-span-2` for wide previews). */
  frameClassName?: string;
  previewClassName?: string;
  skeletonClassName?: string;
};

type DocsComponentCatalogPageProps = {
  /** Nav slug — picks grid layout to match block catalog */
  componentSlug: string;
  title: string;
  description: string;
  variants: DocsCatalogVariant[];
  previewClassName?: string;
  /** Override grid columns when a page needs a custom layout. */
  variantsGridClassName?: string;
};

export function DocsComponentCatalogPage({
  componentSlug,
  title,
  description,
  variants,
  previewClassName,
  variantsGridClassName,
}: DocsComponentCatalogPageProps) {
  const gridClassName =
    variantsGridClassName ?? getDocsVariantGridClassName(componentSlug);
  return (
    <article className="w-full space-y-5">
      <header className="space-y-3">
        <h1 className="text-3xl font-bold tracking-tight md:text-4xl">{title}</h1>
        <p className="text-base text-muted-foreground">{description}</p>
      </header>

      <div className={cn("grid min-w-0 gap-5", gridClassName)}>
        {variants.map(
          ({
            label,
            isPro,
            isNew,
            Component,
            load,
            frameClassName,
            previewClassName: variantPreviewClassName,
            skeletonClassName,
          }) => (
            <DocsVariantFrame
              key={label}
              label={label}
              isPro={isPro}
              isNew={isNew}
              className={frameClassName}
              previewClassName={cn(previewClassName, variantPreviewClassName)}
            >
              <DocsInViewMount skeletonClassName={skeletonClassName}>
                <DocsDemoPreview
                  Component={Component}
                  load={load}
                  skeletonClassName={skeletonClassName}
                />
              </DocsInViewMount>
            </DocsVariantFrame>
          ),
        )}
      </div>
    </article>
  );
}
