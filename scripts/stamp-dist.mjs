import { mkdirSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const pkgRoot = process.cwd();
const dist = join(pkgRoot, "dist");
mkdirSync(dist, { recursive: true });
writeFileSync(join(dist, ".build"), `${new Date().toISOString()}\n`);
// silence unused in some editors
void dirname(fileURLToPath(import.meta.url));
