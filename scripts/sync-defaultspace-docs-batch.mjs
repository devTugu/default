#!/usr/bin/env node
/**
 * Sync block registry component categories from docs nav (href "#" or --all).
 * Downloads registry JSON, writes composed + registry-meta, generates docs routes.
 */
import fs from "node:fs";
import path from "node:path";
import { execFileSync } from "node:child_process";

const root = path.resolve(import.meta.dirname, "..");
const uiRoot = path.join(root, "packages/ui/src");
const navPath = path.join(root, "frontend/src/features/docs/docs-components-nav.ts");
const syncScript = path.join(root, "scripts/sync-defaultspace-composed.mjs");
const cacheDir = path.join(root, ".cache/defaultspace-registry");

const onlySlug = process.argv.find((a) => a.startsWith("--slug="))?.slice("--slug=".length);
const syncAll = process.argv.includes("--all");

/** Nav slug → registry prefix (e.g. dashboard forms blocks use `forms-01`). */
const REGISTRY_SLUG_ALIAS = {
  form: "forms",
};

/** Keep hand-authored marketing block docs pages (DocsMarketingBlockCatalogPage). */
const SKIP_GENERIC_DOCS_PAGE = new Set([
  "footer",
  "navbar",
  "sidebar",
  "table",
  "topbar",
]);

const navSource = fs.readFileSync(navPath, "utf8");
const navItems = [
  ...navSource.matchAll(
    /\{\s*slug:\s*"([^"]+)",\s*label:\s*"([^"]+)",\s*count:\s*(\d+),\s*href:\s*"([^"]+)"(?:,\s*isNew:\s*(\d+))?\s*\}/g,
  ),
].map((m) => ({
  slug: m[1],
  label: m[2],
  count: Number(m[3]),
  href: m[4],
  isNew: m[5] ? Number(m[5]) : undefined,
}));

const targets = navItems.filter((item) => {
  if (onlySlug) return item.slug === onlySlug;
  if (syncAll) return true;
  return item.href === "#";
});

fs.mkdirSync(cacheDir, { recursive: true });

const forceFetch = process.argv.includes("--force");

function loadDotEnvLocal() {
  const envPath = path.join(root, ".env.local");
  if (!fs.existsSync(envPath)) {
    return;
  }
  for (const line of fs.readFileSync(envPath, "utf8").split("\n")) {
    const trimmed = line.trim();
    if (!trimmed || trimmed.startsWith("#")) {
      continue;
    }
    const eq = trimmed.indexOf("=");
    if (eq <= 0) {
      continue;
    }
    const key = trimmed.slice(0, eq).trim();
    let value = trimmed.slice(eq + 1).trim();
    if (
      (value.startsWith('"') && value.endsWith('"')) ||
      (value.startsWith("'") && value.endsWith("'"))
    ) {
      value = value.slice(1, -1);
    }
    if (process.env[key] === undefined) {
      process.env[key] = value;
    }
  }
}

loadDotEnvLocal();

function defaultSpaceCredentials() {
  const email = process.env.SHADCN_SPACE_EMAIL?.trim();
  const licenseKey = process.env.SHADCN_SPACE_LICENSE_KEY?.trim();
  if (!email || !licenseKey) {
    return null;
  }
  return { email, licenseKey };
}

function downloadRegistryJson(name, cacheFile) {
  const creds = defaultSpaceCredentials();
  const url = new URL(`https://shadcnspace.com/r/${name}.json`);
  const curlArgs = ["-sL", "-o", cacheFile];
  if (creds) {
    url.searchParams.set("email", creds.email);
    // Registry API expects snake_case (licenseKey alone returns "License required").
    url.searchParams.set("license_key", creds.licenseKey);
    curlArgs.push(
      "-H",
      `Authorization: Bearer ${creds.email}:${creds.licenseKey}`,
    );
  }
  curlArgs.push(url.toString());
  execFileSync("curl", curlArgs, { stdio: "pipe" });
}

function fetchRegistry(slug, id) {
  const idPadded = String(id).padStart(2, "0");
  const registrySlug = REGISTRY_SLUG_ALIAS[slug] ?? slug;
  const name = `${registrySlug}-${idPadded}`;
  const cacheFile = path.join(cacheDir, `${name}.json`);
  const shouldDownload =
    forceFetch || !fs.existsSync(cacheFile) || (defaultSpaceCredentials() && isLicenseCache(cacheFile));
  if (shouldDownload) {
    downloadRegistryJson(name, cacheFile);
  }
  let raw;
  try {
    raw = JSON.parse(fs.readFileSync(cacheFile, "utf8"));
  } catch {
    return { ok: false, name, error: "invalid json" };
  }
  if (raw.error) {
    return { ok: false, name, error: raw.error };
  }
  return { ok: true, name, raw, cacheFile };
}

function isLicenseCache(cacheFile) {
  try {
    const parsed = JSON.parse(fs.readFileSync(cacheFile, "utf8"));
    return parsed?.error === "License required";
  } catch {
    return false;
  }
}

function pascalCase(slug) {
  return slug
    .split("-")
    .map((s) => s.charAt(0).toUpperCase() + s.slice(1))
    .join("");
}

/** Registry still references lucide `LayersPlus`; current lucide exports `Layers2`. */
function patchTopbarLucideIcons() {
  const blocksRoot = path.join(uiRoot, "default-space/blocks");
  if (!fs.existsSync(blocksRoot)) return;
  for (const dir of fs.readdirSync(blocksRoot)) {
    if (!dir.startsWith("topbar-")) continue;
    const dataPath = path.join(blocksRoot, dir, "data.ts");
    if (!fs.existsSync(dataPath)) continue;
    const src = fs.readFileSync(dataPath, "utf8");
    if (!src.includes("LayersPlus")) continue;
    fs.writeFileSync(dataPath, src.replaceAll("LayersPlus", "Layers2"));
  }
}

function syncCategory(item) {
  const { slug, count } = item;
  const composedRel = `composed/${slug}`;
  const composedDir = path.join(uiRoot, composedRel);
  fs.mkdirSync(composedDir, { recursive: true });

  const meta = [];
  let synced = 0;
  let failed = 0;

  for (let i = 1; i <= count; i++) {
    const idPadded = String(i).padStart(2, "0");
    const result = fetchRegistry(slug, i);
    if (!result.ok) {
      failed++;
      console.warn(`  skip ${result.name}: ${result.error}`);
      continue;
    }
    try {
      const registryBase = `${REGISTRY_SLUG_ALIAS[slug] ?? slug}-${idPadded}`;
      execFileSync(
        "node",
        [
          syncScript,
          `${slug}-${idPadded}`,
          result.cacheFile,
          composedRel,
          registryBase,
          "--no-fail",
        ],
        { stdio: "pipe" },
      );
      synced++;
      meta.push({
        id: idPadded,
        fname: `${slug}-${idPadded}.tsx`,
        title: result.raw.title ?? `${pascalCase(slug)} ${idPadded}`,
        isNew: result.raw.title?.includes("New") ?? false,
        isPro: result.raw.meta?.isPro === true || result.raw.isPro === true,
      });
    } catch (e) {
      failed++;
      console.warn(`  sync failed ${slug}-${idPadded}`);
    }
  }

  if (synced === 0) {
    console.error(`Category ${slug}: nothing synced`);
    return false;
  }

  meta.sort((a, b) => b.id.localeCompare(a.id));

  const indexLines = meta.map((m) => {
    const exportName = `${pascalCase(slug)}${m.id}`;
    return `export { default as ${exportName} } from "./${slug}-${m.id}";`;
  });
  fs.writeFileSync(path.join(composedDir, "index.ts"), `${indexLines.join("\n")}\n`);

  fs.writeFileSync(path.join(composedDir, "registry-meta.json"), `${JSON.stringify(meta, null, 2)}\n`);

  writeDocsFiles(item, meta);
  updateNavHref(slug);
  appendPackageExport(slug);
  if (slug === "topbar") {
    patchTopbarLucideIcons();
  }

  console.log(`✓ ${slug}: ${synced} variants (${failed} skipped)`);
  return true;
}

function writeDocsFiles(item, meta) {
  const { slug } = item;
  if (SKIP_GENERIC_DOCS_PAGE.has(slug)) {
    return;
  }
  const pascal = pascalCase(slug);
  const titleLabel = item.label ?? pascal;
  const docsFeatureDir = path.join(root, "frontend/src/features/docs/components");
  const routeDir = path.join(root, "frontend/app/docs/components", slug);

  const imports = meta
    .map((m) => `${pascalCase(slug)}${m.id}`)
    .join(",\n  ");

  const newBadgeCount = item.isNew ?? 0;
  const variantLines = meta.map((m, index) => {
    const exportName = `${pascalCase(slug)}${m.id}`;
    const showNew =
      newBadgeCount > 0 ? index < newBadgeCount : m.isNew === true;
    const parts = [`label: ${JSON.stringify(m.title)}`, `Component: ${exportName}`];
    if (m.isPro) parts.push("isPro: true");
    if (showNew) parts.push("isNew: true");
    return `  { ${parts.join(", ")} },`;
  });

  const docsPage = `"use client";

import {
  ${imports},
} from "@default/ui/composed/${slug}";
import { DocsComponentCatalogPage, type DocsCatalogVariant } from "./DocsComponentCatalogPage";

const VARIANTS: DocsCatalogVariant[] = [
${variantLines.join("\n")}
];

export function ${pascal}DocsPage() {
  return (
    <DocsComponentCatalogPage
      componentSlug=${JSON.stringify(slug)}
      title=${JSON.stringify(titleLabel)}
      description=${JSON.stringify(`${titleLabel} components — preview variants and copy-ready demos from @default/ui.`)}
      variants={VARIANTS}
    />
  );
}
`;

  fs.mkdirSync(docsFeatureDir, { recursive: true });
  fs.writeFileSync(path.join(docsFeatureDir, `${pascal}DocsPage.tsx`), docsPage);

  fs.mkdirSync(routeDir, { recursive: true });
  fs.writeFileSync(
    path.join(routeDir, "page.tsx"),
    `import { ${pascal}DocsPage } from "@/features/docs/components/${pascal}DocsPage";

export default function ${pascal}DocsRoute() {
  return <${pascal}DocsPage />;
}
`,
  );
}

function updateNavHref(slug) {
  let src = fs.readFileSync(navPath, "utf8");
  const re = new RegExp(
    `(\\{\\s*slug:\\s*"${slug}"[\\s\\S]*?href:\\s*)"#"`,
  );
  if (!re.test(src)) return;
  src = src.replace(re, `$1"/docs/components/${slug}"`);
  fs.writeFileSync(navPath, src);
}

function appendPackageExport(slug) {
  const pkgPath = path.join(root, "packages/ui/package.json");
  const pkg = JSON.parse(fs.readFileSync(pkgPath, "utf8"));
  const base = `./composed/${slug}`;
  if (pkg.exports[`${base}`]) return;
  const entries = Object.entries(pkg.exports);
  const insertBefore = entries.findIndex(([k]) => k === "./package.json");
  const newExports = { ...pkg.exports };
  newExports[base] = `./src/composed/${slug}/index.ts`;
  newExports[`${base}/*`] = `./src/composed/${slug}/*.tsx`;
  const ordered = {};
  for (const [k, v] of Object.entries(newExports).sort(([a], [b]) => {
    if (a === "./package.json") return 1;
    if (b === "./package.json") return -1;
    return a.localeCompare(b);
  })) {
    ordered[k] = v;
  }
  pkg.exports = ordered;
  fs.writeFileSync(pkgPath, `${JSON.stringify(pkg, null, 2)}\n`);
}

console.log(`Syncing ${targets.length} categories…`);
for (const item of targets) {
  console.log(`\n→ ${item.slug} (${item.count})`);
  syncCategory(item);
}

console.log("\nDone. Run: pnpm --filter @default/ui typecheck");
