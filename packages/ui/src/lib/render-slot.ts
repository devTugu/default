import * as React from "react";

type RenderSlotInput = {
  render?: React.ReactElement;
  asChild?: boolean;
  children?: React.ReactNode;
};

/** Map shadcn-style `asChild` / Base UI `render` to a single child element. */
export function resolveRenderElement({
  render,
  asChild,
  children,
}: RenderSlotInput): React.ReactElement | undefined {
  if (render) {
    return render;
  }
  if (asChild && React.isValidElement(children)) {
    return children;
  }
  return undefined;
}
