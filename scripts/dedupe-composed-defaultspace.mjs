#!/usr/bin/env node
/**
 * When composed/<cat>/<file>.tsx matches default-space/<cat>/<file>.tsx, replace with re-export.
 */
import crypto from "node:crypto";
import fs from "node:fs";
import path from "node:path";

const root = path.resolve(import.meta.dirname, "..");
const composedRoot = path.join(root, "packages/ui/src/composed");
const defaultSpaceRoot = path.join(root, "packages/ui/src/default-space");

const SKIP_DIRS = new Set(["topbar", "footer", "navbar", "sidebar", "table", "form"]);

function hash(content) {
  return crypto.createHash("sha256").update(content).digest("hex");
}

function normalize(content) {
  return content.replace(/\r\n/g, "\n").trim();
}

function walkComposed(dir, rel = "") {
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    if (entry.name === "index.ts") continue;
    const relPath = path.join(rel, entry.name);
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      if (SKIP_DIRS.has(entry.name) && rel === "") continue;
      walkComposed(full, relPath);
      continue;
    }
    if (!entry.name.endsWith(".tsx")) continue;

    const category = rel.split(path.sep)[0] ?? path.basename(path.dirname(full));
    if (SKIP_DIRS.has(category)) continue;

    const ssPath = path.join(defaultSpaceRoot, category, entry.name);
    if (!fs.existsSync(ssPath)) continue;

    const composedBody = normalize(fs.readFileSync(full, "utf8"));
    const ssBody = normalize(fs.readFileSync(ssPath, "utf8"));
    if (hash(composedBody) !== hash(ssBody)) continue;

    const base = entry.name.replace(/\.tsx$/, "");
    const reexport = `export { default } from "@default/ui/default-space/${category}/${base}";\n`;
    const named = ssBody.match(/^export (?:function|const) (\w+)/m);
    const out = named
      ? `export { ${named[1]} } from "@default/ui/default-space/${category}/${base}";\n`
      : reexport;

    fs.writeFileSync(full, out);
    console.log(`Re-export ${relPath}`);
  }
}

walkComposed(composedRoot);
console.log("Dedupe complete.");
