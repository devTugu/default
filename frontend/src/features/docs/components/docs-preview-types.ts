import type { ComponentType } from "react";

/** Dynamic import may expose `default` or a named export resolved at runtime. */
export type DocsDemoLoad = () => Promise<unknown>;

export type DocsDemoSource =
  | { Component: ComponentType; load?: never }
  | { load: DocsDemoLoad; Component?: never };

export function hasDemoLoad(
  source: DocsDemoSource,
): source is { load: DocsDemoLoad } {
  return typeof source.load === "function";
}
