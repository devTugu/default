#!/usr/bin/env node
import fs from "node:fs";
import path from "node:path";

const root = path.join(
  path.resolve(import.meta.dirname, ".."),
  "packages/ui/src",
);

const IMPORT =
  'import { TopbarLogo } from "@default/ui/default-space/blocks/shared/topbar-logo";';

const logoBlock =
  /<a href="#"[^>]*>[\s\S]*?shadcnspace-white\.svg"[\s\S]*?<\/a>/g;

function patch(file) {
  let content = fs.readFileSync(file, "utf8");
  if (!content.includes("images.shadcnspace.com/assets/logo")) return false;
  content = content.replace(logoBlock, "<TopbarLogo />");
  if (!content.includes("TopbarLogo")) return false;
  if (!content.includes("topbar-logo")) {
    const useClient = content.startsWith('"use client"');
    if (useClient) {
      content = content.replace(
        /("use client";?\n\n)/,
        `$1${IMPORT}\n`,
      );
    } else {
      content = `${IMPORT}\n\n${content}`;
    }
  }
  fs.writeFileSync(file, content);
  return true;
}

function walk(dir) {
  for (const name of fs.readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, name.name);
    if (name.isDirectory()) walk(full);
    else if (name.name.endsWith(".tsx") && full.includes("topbar")) patch(full);
  }
}

walk(path.join(root, "composed/topbar"));
walk(path.join(root, "default-space/blocks"));
console.log("Topbar logo replacement done.");
