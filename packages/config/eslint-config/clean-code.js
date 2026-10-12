/**
 * Numeric and style limits from `.cursor/rules/clean-code.mdc`.
 * Size/complexity are errors (CI: 0 warnings). Nest DI / specs / vendor UI
 * use app-level overrides where framework patterns require it.
 */
const skip = { skipBlankLines: true, skipComments: true };

/** @type {import("eslint").Linter.Config[]} */
export default [
  {
    files: ["**/*.{ts,tsx,js,jsx,mts,cts}"],
    rules: {
      "max-lines": ["error", { max: 300, ...skip }],
      "max-lines-per-function": ["error", { max: 80, ...skip, IIFEs: true }],
      "max-params": ["error", { max: 4 }],
      "max-depth": ["error", { max: 4 }],
      complexity: ["error", { max: 15 }],
      "max-nested-callbacks": ["error", { max: 3 }],
      "no-else-return": ["error", { allowElseIf: false }],
      "no-console": ["error", { allow: ["warn", "error"] }],
    },
  },
  {
    files: ["**/*.{tsx,jsx}"],
    rules: {
      "max-lines-per-function": ["error", { max: 150, ...skip, IIFEs: true }],
    },
  },
];
