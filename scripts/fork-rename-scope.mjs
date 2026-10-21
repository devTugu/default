#!/usr/bin/env node
/**
 * After fork: rename workspace scope @default → @yourorg (dry-run by default).
 *
 * Usage:
 *   node scripts/fork-rename-scope.mjs --scope @acme --apply
 */
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const FROM = "@default/";
const IGNORE_DIRS = new Set([
  "node_modules",
  ".git",
  ".next",
  "dist",
  "coverage",
  ".turbo",
]);

function parseArgs(argv) {
  const scopeIdx = argv.indexOf("--scope");
  const apply = argv.includes("--apply");
  if (scopeIdx === -1 || !argv[scopeIdx + 1]) {
    console.error("Usage: node scripts/fork-rename-scope.mjs --scope @acme [--apply]");
    process.exit(1);
  }
  const scope = argv[scopeIdx + 1].trim();
  if (!scope.startsWith("@") || scope.endsWith("/")) {
    console.error("Scope must look like @acme (no trailing slash).");
    process.exit(1);
  }
  return { scope: `${scope}/`, apply };
}

function walkFiles(dir, out = []) {
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    if (IGNORE_DIRS.has(entry.name)) continue;
    const abs = path.join(dir, entry.name);
    if (entry.isDirectory()) walkFiles(abs, out);
    else if (/\.(json|md|mdc|ts|tsx|mjs|yml|yaml|sh)$/.test(entry.name)) out.push(abs);
  }
  return out;
}

function main() {
  const { scope, apply } = parseArgs(process.argv);
  const files = walkFiles(ROOT);
  let hits = 0;

  for (const abs of files) {
    const rel = path.relative(ROOT, abs);
    if (rel.startsWith("scripts/fork-rename-scope.mjs")) continue;
    const text = fs.readFileSync(abs, "utf8");
    if (!text.includes(FROM)) continue;
    hits += 1;
    if (apply) {
      fs.writeFileSync(abs, text.split(FROM).join(scope), "utf8");
    }
  }

  console.log(
    apply
      ? `Updated ${hits} files: ${FROM} → ${scope}`
      : `Dry run: ${hits} files would change (${FROM} → ${scope}). Re-run with --apply.`,
  );
  if (!apply) {
    console.log("Also rename GitHub repo, APP names in .env.example, and site-settings after scope rename.");
  }
}

main();
