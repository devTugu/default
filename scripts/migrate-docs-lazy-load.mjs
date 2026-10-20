#!/usr/bin/env node
/**
 * Converts *DocsPage.tsx static @default/ui/composed imports to load() factories.
 */
import fs from "node:fs";
import path from "node:path";

const root = path.resolve(import.meta.dirname, "..");
const docsDir = path.join(root, "frontend/src/features/docs/components");
const uiComposed = path.join(root, "packages/ui/src/composed");

const SKIP = new Set([
  "DocsComponentCatalogPage.tsx",
  "DocsMarketingBlockCatalogPage.tsx",
  "DocsDashboardBlockCatalogPage.tsx",
  "TopbarDocsPage.tsx",
  "SidebarDocsPage.tsx",
  "TableDocsPage.tsx",
  "NavbarDocsPage.tsx",
]);

function parseComposedIndex(moduleName) {
  const indexPath = path.join(uiComposed, moduleName, "index.ts");
  if (!fs.existsSync(indexPath)) {
    return null;
  }
  const map = new Map();
  const text = fs.readFileSync(indexPath, "utf8");
  for (const line of text.split("\n")) {
    const defaultAs = line.match(
      /export\s+\{\s*default\s+as\s+(\w+)\s*\}\s+from\s+"\.\/([^"]+)"/,
    );
    if (defaultAs) {
      map.set(defaultAs[1], { file: defaultAs[2], named: null });
      continue;
    }
    const named = line.match(/export\s+\{\s*(\w+)\s*\}\s+from\s+"\.\/([^"]+)"/);
    if (named) {
      map.set(named[1], { file: named[2], named: named[1] });
    }
  }
  return map;
}

function loadExpr(moduleName, entry) {
  const spec = `@default/ui/composed/${moduleName}/${entry.file}`;
  if (entry.named) {
    return `() => import("${spec}").then((m) => ({ default: m.${entry.named} }))`;
  }
  return `() => import("${spec}")`;
}

function migrateFile(filePath) {
  let content = fs.readFileSync(filePath, "utf8");
  if (content.includes("load: () => import(")) {
    return false;
  }

  const importMatch = content.match(
    /import\s+\{([^}]+)\}\s+from\s+"@default\/ui\/composed\/([^"]+)";/,
  );
  if (!importMatch) {
    return false;
  }

  const moduleName = importMatch[2];
  const exportNames = importMatch[1]
    .split(",")
    .map((s) => s.trim())
    .filter(Boolean);

  const map = parseComposedIndex(moduleName);
  if (!map) {
    console.warn(`Skip ${path.basename(filePath)}: no index for ${moduleName}`);
    return false;
  }

  for (const name of exportNames) {
    const entry = map.get(name);
    if (!entry) {
      console.warn(`Skip ${path.basename(filePath)}: ${name} not in index`);
      return false;
    }
  }

  content = content.replace(importMatch[0], "");

  for (const name of exportNames) {
    const entry = map.get(name);
    const expr = loadExpr(moduleName, entry);
    const componentRe = new RegExp(`Component:\\s*${name}\\b`, "g");
    content = content.replace(componentRe, `load: ${expr}`);
  }

  content = content.replace(/\n{3,}/g, "\n\n");
  fs.writeFileSync(filePath, content);
  return true;
}

const files = fs
  .readdirSync(docsDir)
  .filter((f) => f.endsWith("DocsPage.tsx") && !SKIP.has(f));

let changed = 0;
for (const file of files) {
  if (migrateFile(path.join(docsDir, file))) {
    changed += 1;
    console.log(`Migrated ${file}`);
  }
}

console.log(`Done: ${changed} files updated.`);
