import type { Transition, Variants } from "motion/react";

/** Motion demos use loose literals from registry sync; narrow at the boundary. */
export function defineVariants(variants: Record<string, unknown>): Variants {
  return variants as Variants;
}

export function defineTransition(transition: Record<string, unknown>): Transition {
  return transition as Transition;
}
