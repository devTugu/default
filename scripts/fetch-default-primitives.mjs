#!/usr/bin/bin/node
/**
 * Fetch shadcn v4 (new-york) primitives into packages/ui/src/primitives.
 */
import fs from "node:fs";
import path from "node:path";
import { execFileSync } from "node:child_process";

const root = path.resolve(import.meta.dirname, "..");
const primitivesDir = path.join(root, "packages/ui/src/primitives");
const cacheDir = path.join(root, ".cache/shadcn-primitives");

const names = process.argv.slice(2).length
  ? process.argv.slice(2)
  : [
      "button-group",
      "calendar",
      "carousel",
      "combobox",
      "command",
      "drawer",
      "empty",
      "field",
      "hover-card",
      "input-group",
      "input-otp",
      "item",
      "kbd",
      "pagination",
      "radio-group",
      "resizable",
      "sidebar",
      "slider",
      "toggle-group",
      "sonner",
      "context-menu",
      "toggle",
      "chart",
    ];

fs.mkdirSync(cacheDir, { recursive: true });
fs.mkdirSync(primitivesDir, { recursive: true });

function rewrite(content) {
  return content
    .replace(/\r\n/g, "\n")
    .replace(/from ["']@\/lib\/utils["']/g, 'from "@default/ui/lib/cn"')
    .replace(
      /from ["']@\/components\/ui\/([^"']+)["']/g,
      'from "@default/ui/primitives/$1"',
    );
}

for (const name of names) {
  const dest = path.join(primitivesDir, `${name}.tsx`);
  if (fs.existsSync(dest)) {
    console.log(`skip existing ${name}`);
    continue;
  }
  const cacheFile = path.join(cacheDir, `${name}.json`);
  execFileSync(
    "curl",
    ["-sL", `https://ui.shadcn.com/r/styles/new-york-v4/${name}.json`, "-o", cacheFile],
    { stdio: "pipe" },
  );
  let raw;
  try {
    raw = JSON.parse(fs.readFileSync(cacheFile, "utf8"));
  } catch {
    console.warn(`bad json ${name}`);
    continue;
  }
  const uiFile =
    raw.files?.find((f) => f.path.includes(`/ui/${name}.tsx`)) ?? raw.files?.[0];
  if (!uiFile?.content) {
    console.warn(`no content ${name}`);
    continue;
  }
  let content = rewrite(uiFile.content);
  if (
    !content.startsWith('"use client"') &&
    (content.includes("useState") || content.includes("useEffect") || name === "sidebar")
  ) {
    content = `"use client";\n\n${content}`;
  }
  fs.writeFileSync(dest, content);
  console.log(`wrote ${name}.tsx`);
  if (raw.dependencies?.length) {
    console.log(`  deps: ${raw.dependencies.join(", ")}`);
  }
}
