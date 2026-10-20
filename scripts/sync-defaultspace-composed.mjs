#!/usr/bin/env node
/**
 * Converts shadcnspace registry JSON → @default/ui composed files.
 */
import fs from "node:fs";
import path from "node:path";

const RENDER_HOST =
  /(?:Dialog|Sheet|Drawer|Popover|DropdownMenu|Collapsible|Tooltip|AlertDialog|HoverCard)\w*/;

function rewriteImports(content) {
  let out = content;
  out = out.replace(/from ["']@\/lib\/utils["']/g, 'from "@default/ui/lib/cn"');
  out = out.replace(
    /from ["']@\/components\/ui\/([^"']+)["']/g,
    'from "@default/ui/primitives/$1"',
  );
  out = out.replace(
    /from ["']@\/hooks\/([^"']+)["']/g,
    'from "@default/ui/hooks/$1"',
  );
  out = out.replace(
    /from ["']@\/components\/(?:shadcn-space|default-space)\//g,
    'from "@default/ui/default-space/',
  );
  out = out.replace(
    /import ["']@\/components\/(?:shadcn-space|default-space)\//g,
    'import "@default/ui/default-space/',
  );
  out = out.replace(
    /from ["']@\/assets\/([^"']+)["']/g,
    'from "@default/ui/default-space/assets/$1"',
  );
  return out;
}

function fixClientDirective(content) {
  if (content.startsWith('"use client"') || content.startsWith("'use client")) {
    return content;
  }
  const needsClient =
    content.includes("useState") ||
    content.includes("useEffect") ||
    content.includes("useRef") ||
    content.includes("useCallback") ||
    content.includes("useMemo") ||
    content.includes("motion") ||
    content.includes("useMotionValue") ||
    content.includes("Popover") ||
    content.includes("Tooltip") ||
    content.includes("Dialog") ||
    content.includes("Drawer") ||
    content.includes("Sheet") ||
    content.includes("DropdownMenu") ||
    content.includes("Collapsible");
  if (needsClient) {
    return `"use client";\n\n${content}`;
  }
  return content;
}

function fixVaulDrawer(content) {
  let out = content;
  out = out.replace(/<Drawer(\s+)swipeDirection=/g, "<Drawer$1direction=");
  out = out.replace(
    /className="data-\[swipe-direction=right\]:rounded-none data-\[swipe-axis=x\]:sm:\[--drawer-content-width:30rem\] \*\*:data-\[slot=drawer-content\]:w-full"/g,
    'className="h-full max-h-none rounded-none data-[vaul-drawer-direction=right]:w-full data-[vaul-drawer-direction=right]:sm:max-w-[30rem]"',
  );
  return out;
}

function fixRenderProps(content) {
  let out = content;
  // render={<Button ... />}>label</DialogTrigger>
  out = out.replace(
    new RegExp(
      `<(${RENDER_HOST.source})\\s+render=\\{<(Button|button|a|span)([^>]*)\\/>\\}\\s*>\\s*([\\s\\S]*?)<\\/\\1>`,
      "g",
    ),
    "<$1 asChild>\n<$2$3>\n$4\n</$2>\n</$1>",
  );
  out = out.replace(
    new RegExp(
      `<((?:Dialog|Sheet|Drawer)Close)\\s+render=\\{<(Button|button|a|span)([^>]*)\\/>\\}\\s*>\\s*([\\s\\S]*?)<\\/\\1>`,
      "g",
    ),
    "<$1 asChild>\n<$2$3>\n$4\n</$2>\n</$1>",
  );
  // render={<Button>…</Button>}</Trigger> (non-self-closing inner)
  out = out.replace(
    new RegExp(
      `<(${RENDER_HOST.source})\\s+render=\\{<(\\w+)([^>]*)>\\s*([\\s\\S]*?)<\\/\\2>\\s*\\}\\s*>\\s*([\\s\\S]*?)<\\/\\1>`,
      "g",
    ),
    "<$1 asChild>\n<$2$3>\n$4\n</$2>\n</$1>",
  );
  out = out.replace(
    /<DialogTrigger\s+render=\{\s*<AttachmentTrigger([\s\S]*?)\/>\s*\}\s*\/>/g,
    "<DialogTrigger asChild>\n        <AttachmentTrigger$1/>",
  );
  out = out.replace(
    /(<DialogTrigger asChild>\s*<AttachmentTrigger[\s\S]*?\/>)\s*\/>/g,
    "$1\n      </DialogTrigger>",
  );
  out = out.replace(
    /<PopoverTrigger\s+render=\{\s*<Button([\s\S]*?)\/>\s*\}\s*\/>/g,
    "<PopoverTrigger asChild>\n              <Button$1/>",
  );
  out = out.replace(
    /(<PopoverTrigger asChild>\s*<Button[\s\S]*?\/>)\s*\/>/g,
    "$1\n            </PopoverTrigger>",
  );
  out = out.replace(
    /<(\w+Trigger)\s+render=\{\s*<(Button|button|a|span|Label|Badge|Input|AttachmentTrigger)(\s[^>]*)?\s*>\s*([\s\S]*?)<\/\2>\s*\}\s*\/>/g,
    "<$1 asChild>\n<$2$3>\n$4\n</$2>\n</$1>",
  );
  out = out.replace(
    /<(\w+Trigger)\s+render=\{\s*<(Button|button|a|span|Label|Badge|Input|AttachmentTrigger)(\s[^/>]*)\/>\s*\}\s*\/>/g,
    "<$1 asChild>\n<$2$3/>\n</$1>",
  );
  out = out.replace(
    /<DropdownMenuTrigger\s+render=\{\s*<(Button)([\s\S]*?)\/>\s*\}\s*>\s*([\s\S]*?)<\/DropdownMenuTrigger>/g,
    "<DropdownMenuTrigger asChild>\n<$1$2>\n$3\n</$1>\n</DropdownMenuTrigger>",
  );
  out = out.replace(
    /<Badge\s+render=\{\s*<(\w+)([\s\S]*?)>\s*([\s\S]*?)<\/\1>\s*\}\s*\/>/g,
    "<Badge asChild>\n<$1$2>\n$3\n</$1>",
  );
  out = out.replace(
    /<BubbleContent\s+render=\{\s*<(\w+)([^>]*)\/>\s*\}\s*>([\s\S]*?)<\/BubbleContent>/g,
    "<BubbleContent asChild>\n<$1$2>\n$3\n</$1>\n</BubbleContent>",
  );
  return out;
}

const argv = process.argv.slice(2);
const noFail = argv.includes("--no-fail");
const positional = argv.filter((a) => !a.startsWith("--"));
const [outName, jsonPath, composedDir, registryBaseArg] = positional;

if (!outName || !jsonPath || !composedDir) {
  console.error(
    "Usage: node scripts/sync-defaultspace-composed.mjs <out-base-name> <registry.json> <composed-dir-relative-to-ui> [registry-base-name] [--no-fail]",
  );
  process.exit(1);
}

const root = path.resolve(import.meta.dirname, "..");
const uiRoot = path.join(root, "packages/ui/src");
const primitivesDir = path.join(uiRoot, "primitives");
const outDir = path.join(uiRoot, composedDir);

let raw;
try {
  raw = JSON.parse(fs.readFileSync(jsonPath, "utf8"));
} catch (e) {
  console.error(`Invalid JSON: ${jsonPath}`);
  if (!noFail) process.exit(1);
  process.exit(0);
}

if (raw.error) {
  console.error(`Registry error (${outName}): ${raw.message ?? raw.error}`);
  if (!noFail) process.exit(1);
  process.exit(0);
}

/** Write missing primitives from registry (first ui/*.tsx that is not default-space demo). */
for (const file of raw.files ?? []) {
  const p = file.path?.replace(/\\/g, "/") ?? "";
  if (!p.includes("/components/ui/") || p.includes("shadcn-space") || p.includes("default-space")) continue;
  const primitiveName = path.basename(p, ".tsx");
  const dest = path.join(primitivesDir, `${primitiveName}.tsx`);
  if (fs.existsSync(dest)) continue;
  let prim = file.content.replace(/\r\n/g, "\n");
  prim = rewriteImports(prim);
  fs.mkdirSync(primitivesDir, { recursive: true });
  fs.writeFileSync(dest, prim);
  console.log(`Primitive ${primitiveName}.tsx ← registry`);
}

const base = outName.replace(/\.tsx$/, "");
const categorySlug = composedDir.split("/").pop();

const defaultSpaceRoot = path.join(uiRoot, "default-space");
for (const file of raw.files ?? []) {
  const p = file.path?.replace(/\\/g, "/") ?? "";
  if (p.startsWith("src/assets/")) {
    const rel = p.replace(/^src\/assets\//, "");
    const dest = path.join(defaultSpaceRoot, "assets", rel);
    fs.mkdirSync(path.dirname(dest), { recursive: true });
    let body = file.content.replace(/\r\n/g, "\n");
    body = rewriteImports(body);
    fs.writeFileSync(dest, body);
    continue;
  }
  if (!p.includes("shadcn-space/") && !p.includes("default-space/")) continue;
  const rel = p.replace(/^src\/components\/(?:shadcn-space|default-space)\//, "");
  const dest = path.join(defaultSpaceRoot, rel);
  fs.mkdirSync(path.dirname(dest), { recursive: true });
  let body = rewriteImports(file.content.replace(/\r\n/g, "\n"));
  body = fixClientDirective(body);
  body = fixRenderProps(body);
  body = fixVaulDrawer(body);
  body = body.replace(
    /from ["']@\/components\/(?:shadcn-space|default-space)\//g,
    'from "@default/ui/default-space/',
  );
  body = body.replace(
    /import ["']@\/components\/(?:shadcn-space|default-space)\//g,
    'import "@default/ui/default-space/',
  );
  fs.writeFileSync(dest, body);
}

const registryBase = registryBaseArg ?? base;
const demoFile =
  raw.files.find((f) => f.path.includes(`blocks/${registryBase}/page.tsx`)) ??
  raw.files.find((f) => f.path.includes(`default-space/${categorySlug}/${base}.tsx`)) ??
  raw.files.find((f) => f.path.includes("default-space") && f.path.endsWith(".tsx")) ??
  raw.files[raw.files.length - 1];

let content = demoFile.content.replace(/\r\n/g, "\n");
content = rewriteImports(content);
content = fixClientDirective(content);
content = fixRenderProps(content);
content = fixVaulDrawer(content);

const outFile = path.join(outDir, `${base}.tsx`);
fs.mkdirSync(outDir, { recursive: true });

const ssMirror = path.join(defaultSpaceRoot, categorySlug, `${base}.tsx`);
if (fs.existsSync(ssMirror)) {
  const normalize = (s) => s.replace(/\r\n/g, "\n").trim();
  if (normalize(content) === normalize(fs.readFileSync(ssMirror, "utf8"))) {
    fs.writeFileSync(
      outFile,
      `export { default } from "@default/ui/default-space/${categorySlug}/${base}";\n`,
    );
    console.log(`Re-export ${outFile} (identical to default-space)`);
    process.exit(0);
  }
}

fs.writeFileSync(outFile, content);
console.log(`Wrote ${outFile}`);
