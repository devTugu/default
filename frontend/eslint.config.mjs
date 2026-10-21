import { defineConfig, globalIgnores } from "eslint/config";
import nextVitals from "eslint-config-next/core-web-vitals";
import nextTs from "eslint-config-next/typescript";
import boundaries from "eslint-plugin-boundaries";
import cleanCode from "@default/eslint-config/clean-code";

const eslintConfig = defineConfig([
  ...nextVitals,
  ...nextTs,
  ...cleanCode,
  {
    plugins: {
      boundaries,
    },
    settings: {
      "boundaries/elements": [
        { type: "app", pattern: "app" },
        { type: "app", pattern: "app/**", partialMatch: false },
        { type: "widgets", pattern: "src/widgets" },
        { type: "widgets", pattern: "src/widgets/**", partialMatch: false },
        { type: "features", pattern: "src/features" },
        { type: "features", pattern: "src/features/**", partialMatch: false },
        { type: "entities", pattern: "src/entities" },
        { type: "entities", pattern: "src/entities/**", partialMatch: false },
        { type: "shared", pattern: "src/shared" },
        { type: "shared", pattern: "src/shared/**", partialMatch: false },
        { type: "processes", pattern: "src/processes" },
        { type: "processes", pattern: "src/processes/**", partialMatch: false },
      ],
      "boundaries/ignore": [
        "**/*.test.ts",
        "**/*.test.tsx",
        "**/*.spec.ts",
        "**/*.spec.tsx",
      ],
      "boundaries/dependency-nodes": ["import"],
    },
    rules: {
      "boundaries/dependencies": [
        "error",
        {
          default: "disallow",
          message:
            "FSD layer violation: {{ from.type }} cannot import {{ to.type }}",
          policies: [
            {
              from: { element: { type: "app" } },
              allow: [
                { to: { element: { type: "widgets" } } },
                { to: { element: { type: "features" } } },
                { to: { element: { type: "entities" } } },
                { to: { element: { type: "shared" } } },
                { to: { element: { type: "processes" } } },
                { to: { element: { type: "app" } } },
              ],
            },
            {
              from: { element: { type: "widgets" } },
              allow: [
                { to: { element: { type: "widgets" } } },
                { to: { element: { type: "features" } } },
                { to: { element: { type: "entities" } } },
                { to: { element: { type: "shared" } } },
              ],
            },
            {
              from: { element: { type: "features" } },
              allow: [
                { to: { element: { type: "features" } } },
                { to: { element: { type: "entities" } } },
                { to: { element: { type: "shared" } } },
              ],
            },
            {
              from: { element: { type: "entities" } },
              allow: [
                { to: { element: { type: "entities" } } },
                { to: { element: { type: "shared" } } },
              ],
            },
            {
              from: { element: { type: "shared" } },
              allow: [{ to: { element: { type: "shared" } } }],
            },
            {
              from: { element: { type: "processes" } },
              allow: [
                { to: { element: { type: "shared" } } },
                { to: { element: { type: "processes" } } },
              ],
            },
          ],
        },
      ],
    },
  },
  {
    files: ["src/features/**/*.{ts,tsx}", "src/widgets/**/*.{ts,tsx}"],
    rules: {
      "no-restricted-imports": [
        "error",
        {
          paths: [
            {
              name: "axios",
              message:
                "Use @default/hooks for Nest API data — do not call axios from features/widgets.",
            },
          ],
          patterns: [
            {
              group: [
                "@/shared/api/client",
                "@/shared/api/axiosInstance",
                "@/shared/api/axiosInstance*",
              ],
              message:
                "Use @default/hooks (or @default/api after app wire) — do not import the axios client from features/widgets.",
            },
          ],
        },
      ],
    },
  },
  // Vendored shadcn sidebar (generated composition)
  {
    files: ["src/shared/ui/sidebar.tsx"],
    rules: {
      "max-lines": "off",
    },
  },
  // Canvas / WebGL helpers — param bags would obscure math
  {
    files: [
      "src/widgets/marketing/lib/marketing/ribbon-wave.ts",
      "src/widgets/marketing/lib/stripe-gradient/mini-gl.ts",
    ],
    rules: {
      "max-params": "off",
    },
  },
  {
    files: ["**/*.{spec,test}.{ts,tsx}"],
    rules: {
      "max-nested-callbacks": "off",
      "max-lines-per-function": "off",
      complexity: "off",
    },
  },
  globalIgnores([
    ".next/**",
    "out/**",
    "build/**",
    "next-env.d.ts",
    "scripts/**",
    "e2e/**",
  ]),
]);

export default eslintConfig;
