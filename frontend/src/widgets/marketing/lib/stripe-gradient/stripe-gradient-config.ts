export const STRIPE_GRADIENT_DEFAULT_COLORS = [
  '#a960ee',
  '#ff333d',
  '#90e0ff',
  '#ffcb57',
] as const;

export const STRIPE_GRADIENT_DEFAULT_OPTIONS = {
  colors: [...STRIPE_GRADIENT_DEFAULT_COLORS],
  density: [0.06, 0.16] as [number, number],
  amplitude: 320,
  angle: 0,
  darkenTop: false,
  static: false,
} as const;

export interface StripeGradientOptions {
  colors?: string[];
  density?: [number, number];
  amplitude?: number;
  angle?: number;
  darkenTop?: boolean;
  static?: boolean;
}
