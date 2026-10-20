"use client";

import type { ReactNode } from "react";
import { DocsClientMount } from "./DocsClientMount";
import { DocsSidebarPreview } from "./DocsSidebarPreview";
import { DocsTopbarPreview } from "./DocsTopbarPreview";

export type DocsBlockPreviewKind = "default" | "topbar" | "sidebar";

type DocsBlockPreviewShellProps = {
  kind?: DocsBlockPreviewKind;
  shellClassName?: string;
  minWidthClassName?: string | false;
  children: ReactNode;
};

export function DocsBlockPreviewShell({
  kind = "default",
  shellClassName,
  minWidthClassName,
  children,
}: DocsBlockPreviewShellProps) {
  if (kind === "topbar") {
    return (
      <DocsClientMount>
        <DocsTopbarPreview
          className={shellClassName}
          minWidthClassName={minWidthClassName}
        >
          {children}
        </DocsTopbarPreview>
      </DocsClientMount>
    );
  }

  if (kind === "sidebar") {
    return (
      <DocsClientMount>
        <DocsSidebarPreview className={shellClassName}>{children}</DocsSidebarPreview>
      </DocsClientMount>
    );
  }

  return <DocsClientMount>{children}</DocsClientMount>;
}
