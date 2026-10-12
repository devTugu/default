import { mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

type TokenGroup = Record<string, string>;
type TokenTree = Record<string, TokenGroup>;

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const tokens = JSON.parse(
  readFileSync(join(root, "tokens.json"), "utf8"),
) as TokenTree;

function cssVars(prefix: string, values: TokenGroup): string {
  return Object.entries(values)
    .map(([key, value]) => `  --${prefix}-${key}: ${value};`)
    .join("\n");
}

function block(selector: string, body: string): string {
  return `${selector} {\n${body}\n}\n`;
}

const lightColor = tokens.color ?? {};
const darkColor = tokens["color-dark"] ?? {};
const radius = tokens.radius ?? {};
const space = tokens.space ?? {};
const marketing = tokens.marketing ?? {};
const marketingDark = tokens["marketing-dark"] ?? {};

const rootBody = [
  cssVars("color", lightColor),
  cssVars("radius", radius),
  cssVars("space", space),
  cssVars("marketing", marketing),
]
  .filter(Boolean)
  .join("\n");

const darkBody = [
  cssVars("color", darkColor),
  cssVars("marketing", marketingDark),
]
  .filter(Boolean)
  .join("\n");

const css = `/* Generated from tokens.json — do not edit by hand. */
${block(":root", rootBody)}
${darkBody ? block(".dark", darkBody) : ""}`;

const theme = `/* Generated from tokens.json — do not edit by hand. */
export const theme = ${JSON.stringify(tokens, null, 2)} as const;

export type DesignTokens = typeof theme;
`;

const srcDir = join(root, "src");
mkdirSync(srcDir, { recursive: true });
writeFileSync(join(srcDir, "tokens.css"), css);
writeFileSync(join(srcDir, "theme.ts"), theme);

console.warn("Generated tokens.css and theme.ts from tokens.json");