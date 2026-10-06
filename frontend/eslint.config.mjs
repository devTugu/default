import { defineConfig, globalIgnores } from "eslint/config";
import nextVitals from "eslint-config-next/core-web-vitals";
import nextTs from "eslint-config-next/typescript";
import boundaries from "eslint-plugin-boundaries";

const eslintConfig = defineConfig([
  ...nextVitals,
  ...nextTs,
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
      "boundaries/ignore": ["**/*.test.ts", "**/*.test.tsx", "**/*.spec.ts", "**/*.spec.tsx"],
    },
    rules: {
      "boundaries/dependencies": [
        "error",
        {
          default: "disallow",
          message:
            "FSD layer violation: ${file.type} cannot import from ${dependency.type}",
          rules: [
            {
              from: ["app"],
              allow: ["widgets", "features", "entities", "shared", "processes", "app"],
            },
            {
              from: ["widgets"],
              allow: ["widgets", "features", "entities", "shared"],
            },
            {
              from: ["features"],
              allow: ["features", "entities", "shared"],
            },
            {
              from: ["entities"],
              allow: ["entities", "shared"],
            },
            {
              from: ["shared"],
              allow: ["shared"],
            },
            {
              from: ["processes"],
              allow: ["shared", "processes"],
            },
          ],
        },
      ],
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
