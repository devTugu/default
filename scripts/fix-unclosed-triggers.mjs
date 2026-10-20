#!/usr/bin/env node
import fs from "node:fs";
import path from "node:path";

const composedRoot = path.join(
  path.resolve(import.meta.dirname, ".."),
  "packages/ui/src/composed",
);

const PAIRS = [
  ["PopoverTrigger", "PopoverContent"],
  ["DialogTrigger", "DialogContent"],
  ["DrawerTrigger", "DrawerContent"],
  ["SheetTrigger", "SheetContent"],
  ["TooltipTrigger", "TooltipContent"],
  ["DropdownMenuTrigger", "DropdownMenuContent"],
];

function fixContent(content) {
  let out = content;
  for (const [trigger, next] of PAIRS) {
    const close = `</${trigger}>`;
    if (!out.includes(`<${trigger} asChild>`)) continue;
    const re = new RegExp(
      `(<${trigger}\\s+asChild>[\\s\\S]*?)(\\n\\s*<${next})`,
      "g",
    );
    out = out.replace(re, (full, before, nextLine) => {
      if (before.includes(close)) return full;
      return `${before}\n      ${close}${nextLine}`;
    });
  }
  return out;
}

function walk(dir) {
  let n = 0;
  for (const ent of fs.readdirSync(dir, { withFileTypes: true })) {
    const p = path.join(dir, ent.name);
    if (ent.isDirectory()) n += walk(p);
    else if (ent.name.endsWith(".tsx")) {
      const before = fs.readFileSync(p, "utf8");
      const after = fixContent(before);
      if (after !== before) {
        fs.writeFileSync(p, after);
        console.log("fixed", path.relative(composedRoot, p));
        n++;
      }
    }
  }
  return n;
}

console.log(`Fixed ${walk(composedRoot)} files`);
