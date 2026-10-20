#!/usr/bin/env node
import fs from "node:fs";
import path from "node:path";

const composedRoot = path.join(
  path.resolve(import.meta.dirname, ".."),
  "packages/ui/src/composed",
);

const RENDER_HOST =
  /(?:Dialog|Sheet|Drawer|Popover|DropdownMenu|Collapsible|Tooltip|AlertDialog|HoverCard)\w*/;

function fixRenderProps(content) {
  let out = content;
  let prev;
  do {
    prev = out;
    // Base UI: <Trigger render={<Button attrs />}>label</Trigger>
    out = out.replace(
      new RegExp(
        `<(${RENDER_HOST.source})\\s+render=\\{<(\\w+)([^>]*)\\/?>\\}\\s*>\\s*([\\s\\S]*?)<\\/\\1>`,
        "g",
      ),
      "<$1 asChild>\n<$2$3>\n$4\n</$2>\n</$1>",
    );
    // Self-closing trigger: render={<Button ... />} />
    out = out.replace(
      /<(\w+Trigger)\s+render=\{\s*<(Button|button|a|span|Label|Badge|Input|AttachmentTrigger)(\s[^>]*)?\s*>\s*([\s\S]*?)<\/\2>\s*\}\s*\/>/g,
      "<$1 asChild>\n<$2$3>\n$4\n</$2>\n</$1>",
    );
    out = out.replace(
      /<(\w+Trigger)\s+render=\{\s*<(Button|button|a|span|Label|Badge|Input|AttachmentTrigger)(\s[^/>]*)\/>\s*\}\s*\/>/g,
      "<$1 asChild>\n<$2$3/>\n</$1>",
    );
    // DialogClose / SheetClose with render=
    out = out.replace(
      new RegExp(
        `<((?:Dialog|Sheet|Drawer)Close)\\s+render=\\{<(\\w+)([^>]*)\\/?>\\}\\s*>\\s*([\\s\\S]*?)<\\/\\1>`,
        "g",
      ),
      "<$1 asChild>\n<$2$3>\n$4\n</$2>\n</$1>",
    );
  } while (out !== prev);
  return out;
}

function walk(dir) {
  let n = 0;
  for (const ent of fs.readdirSync(dir, { withFileTypes: true })) {
    const p = path.join(dir, ent.name);
    if (ent.isDirectory()) n += walk(p);
    else if (ent.name.endsWith(".tsx")) {
      const before = fs.readFileSync(p, "utf8");
      if (!before.includes("render=")) continue;
      const after = fixRenderProps(before);
      if (after !== before) {
        fs.writeFileSync(p, after);
        n++;
      }
    }
  }
  return n;
}

console.log(`Patched render= in ${walk(composedRoot)} files`);
