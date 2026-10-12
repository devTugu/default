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
        { type: "app", pattern: "app", mode: "folder" },
        { type: "app", pattern: "app/**" },
        { type: "widgets", pattern: "src/widgets", mode: "folder" },
        { type: "widgets", pattern: "src/widgets/**" },
        { type: "features", pattern: "src/features", mode: "folder" },
        { type: "features", pattern: "src/features/**" },
        { type: "entities", pattern: "src/entities", mode: "folder" },
        { type: "entities", pattern: "src/entities/**" },
        { type: "shared", pattern: "src/shared", mode: "folder" },
        { type: "shared", pattern: "src/shared/**" },
        { type: "processes", pattern: "src/processes", mode: "folder" },
        { type: "processes", pattern: "src/processes/**" },
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
          rules: [
            {
              from: { type: "app" },
              allow: [
                { to: { type: "widgets" } },
                { to: { type: "features" } },
                { to: { type: "entities" } },
                { to: { type: "shared" } },
                { to: { type: "processes" } },
                { to: { type: "app" } },
              ],
            },
            {
              from: { type: "widgets" },
              allow: [
                { to: { type: "widgets" } },
                { to: { type: "features" } },
                { to: { type: "entities" } },
                { to: { type: "shared" } },
              ],
            },
            {
              from: { type: "features" },
              allow: [
                { to: { type: "features" } },
                { to: { type: "entities" } },
                { to: { type: "shared" } },
              ],
            },
            {
              from: { type: "entities" },
              allow: [
                { to: { type: "entities" } },
                { to: { type: "shared" } },
              ],
            },
            {
              from: { type: "shared" },
              allow: [{ to: { type: "shared" } }],
            },
            {
              from: { type: "processes" },
              allow: [
                { to: { type: "shared" } },
                { to: { type: "processes" } },
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
