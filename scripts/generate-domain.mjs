#!/usr/bin/env node
/**
 * Scaffold a new vertical domain on the client stack (types → api → hooks).
 * Backend Nest module remains manual — see md/fork.md (add a domain).
 *
 * Usage: node scripts/generate-domain.mjs --name announcements
 */
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");

function parseArgs(argv) {
  const idx = argv.indexOf("--name");
  if (idx === -1 || !argv[idx + 1]) {
    console.error("Usage: node scripts/generate-domain.mjs --name <kebab-case>");
    process.exit(1);
  }
  return argv[idx + 1].trim().toLowerCase();
}

function assertKebab(name) {
  if (!/^[a-z][a-z0-9]*(-[a-z0-9]+)*$/.test(name)) {
    console.error(`Invalid domain name "${name}". Use kebab-case (e.g. job-postings).`);
    process.exit(1);
  }
}

function toPascal(kebab) {
  return kebab
    .split("-")
    .map((p) => p.charAt(0).toUpperCase() + p.slice(1))
    .join("");
}

function toCamel(kebab) {
  const pascal = toPascal(kebab);
  return pascal.charAt(0).toLowerCase() + pascal.slice(1);
}

function toScreaming(kebab) {
  return kebab.replace(/-/g, "_").toUpperCase();
}

function writeFile(relPath, content) {
  const abs = path.join(ROOT, relPath);
  if (fs.existsSync(abs)) {
    console.error(`Refusing to overwrite ${relPath}`);
    process.exit(1);
  }
  fs.mkdirSync(path.dirname(abs), { recursive: true });
  fs.writeFileSync(abs, content, "utf8");
  console.log(`Wrote ${relPath}`);
}

function patchJson(relPath, mutator) {
  const abs = path.join(ROOT, relPath);
  const json = JSON.parse(fs.readFileSync(abs, "utf8"));
  mutator(json);
  fs.writeFileSync(abs, `${JSON.stringify(json, null, 2)}\n`, "utf8");
  console.log(`Patched ${relPath}`);
}

function insertBeforeMarker(fileRel, marker, block) {
  const abs = path.join(ROOT, fileRel);
  let src = fs.readFileSync(abs, "utf8");
  const trimmed = block.trim();
  if (trimmed && src.includes(trimmed)) {
    console.log(`Skip ${fileRel} (already patched)`);
    return;
  }
  const insertAt = src.indexOf(marker);
  if (insertAt === -1) {
    console.error(`Marker not found in ${fileRel}: ${marker}`);
    process.exit(1);
  }
  src = `${src.slice(0, insertAt)}${block}\n${src.slice(insertAt)}`;
  fs.writeFileSync(abs, src, "utf8");
  console.log(`Patched ${fileRel}`);
}

function main() {
  const name = parseArgs(process.argv);
  assertKebab(name);
  const Pascal = toPascal(name);
  const camel = toCamel(name);
  const scream = toScreaming(name);
  const importPath = name;

  writeFile(
    `packages/types/src/${name}/schema.ts`,
    `import { z } from "zod";

export const ${Pascal}Schema = z.object({
  id: z.number(),
  title: z.string(),
  createdAt: z.string(),
});

export type ${Pascal} = z.infer<typeof ${Pascal}Schema>;

export const ${Pascal}ListOutputSchema = z.object({
  items: z.array(${Pascal}Schema),
});

export type ${Pascal}ListOutput = z.infer<typeof ${Pascal}ListOutputSchema>;
`,
  );

  writeFile(
    `packages/types/src/${name}/index.ts`,
    `export {
  ${Pascal}Schema,
  ${Pascal}ListOutputSchema,
  type ${Pascal},
  type ${Pascal}ListOutput,
} from "./schema";
`,
  );

  patchJson("packages/types/package.json", (pkg) => {
    pkg.exports[`./${importPath}`] = {
      types: `./src/${name}/index.ts`,
      require: `./dist/${name}/index.js`,
      import: `./dist/${name}/index.js`,
      default: `./dist/${name}/index.js`,
    };
    pkg.typesVersions["*"][importPath] = [`./src/${name}/index.ts`];
  });

  writeFile(
    `packages/api/src/${name}/api.ts`,
    `import {
  ${Pascal}ListOutputSchema,
  type ${Pascal}ListOutput,
} from "@default/types/${importPath}";
import { getApi } from "../client";
import { API_ENDPOINTS } from "../endpoints";
import { parseWith } from "../parse";

export async function list${Pascal}(): Promise<${Pascal}ListOutput> {
  const data = await getApi().get(API_ENDPOINTS.${scream}.LIST);
  return parseWith(
    ${Pascal}ListOutputSchema,
    API_ENDPOINTS.${scream}.LIST,
  )(data);
}
`,
  );

  insertBeforeMarker(
    "packages/api/src/index.ts",
    'export { API_ENDPOINTS } from "./endpoints";',
    `export * from "./${name}/api";`,
  );

  insertBeforeMarker(
    "packages/api/src/index.ts",
    "  auditLogKeys,",
    `  ${camel}Keys,`,
  );

  insertBeforeMarker(
    "packages/api/src/endpoints.ts",
    "} as const;",
    `  ${scream}: {
    LIST: "/admin/${name}",
  },
`,
  );

  insertBeforeMarker(
    "packages/api/src/query-keys.ts",
    "export const dashboardKeys = {",
    `export const ${camel}Keys = {
  all: ["${name}"] as const,
  lists: () => [...${camel}Keys.all, "list"] as const,
  list: () => [...${camel}Keys.lists()] as const,
};

`,
  );

  writeFile(
    `packages/hooks/src/${name}/use-${name}.ts`,
    `"use client";

import { useQuery } from "@tanstack/react-query";
import { ${camel}Keys, list${Pascal} } from "@default/api";

export { ${camel}Keys };

export function use${Pascal}List() {
  return useQuery({
    queryKey: ${camel}Keys.list(),
    queryFn: () => list${Pascal}(),
  });
}
`,
  );

  insertBeforeMarker(
    "packages/hooks/src/index.ts",
    "export {\n  siteSettingsKeys,",
    `export { ${camel}Keys, use${Pascal}List } from "./${name}/use-${name}";\n\n`,
  );

  writeFile(
    `frontend/src/features/${name}/README.md`,
    `# ${Pascal} (generated scaffold)

Client stack is scaffolded. Finish the backend and UI:

1. Add permission code in \`backend/src/infrastructure/database/seed/permissions.const.ts\`
2. Implement Clean Architecture module under \`backend/src/\` (domain → application → infrastructure → presentation)
3. Register Nest module and expose \`GET /api/v1/admin/${name}\` matching \`API_ENDPOINTS.${scream}.LIST\`
4. Add route \`/dashboard/${name}\` in \`frontend/app/dashboard/\` and sidebar entry
5. Run \`pnpm lint && pnpm typecheck && pnpm test\`

See \`md/fork.md\` in the repo docs folder.
`,
  );

  console.log("\nNext: implement backend module and dashboard page. Run pnpm lint && pnpm typecheck.");
}

main();
