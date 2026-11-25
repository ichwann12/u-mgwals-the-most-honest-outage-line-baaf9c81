import { mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

// The Most Honest Outage Line: copy the entry line from entry.txt to
// the harness output directory as entry.txt. Stdlib only, no network,
// no wall clock, no randomness — the output is exactly the stored line.
const botDir = process.env.MAKEFUN_BOT_DIR ?? dirname(fileURLToPath(import.meta.url));
const outputDir = process.env.MAKEFUN_OUTPUT_DIR ?? join(botDir, "output");

const line = readFileSync(join(botDir, "entry.txt"), "utf8").trim();

if (line.length < 1 || line.length > 160) {
  throw new Error(`entry must be 1-160 characters, got ${line.length}`);
}
if (/\r|\n/.test(line)) {
  throw new Error("entry must be a single line");
}

mkdirSync(outputDir, { recursive: true });
writeFileSync(join(outputDir, "entry.txt"), line, "utf8");
