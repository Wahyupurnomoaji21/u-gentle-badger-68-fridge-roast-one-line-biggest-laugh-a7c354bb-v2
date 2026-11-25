// Fridge Roast v2 — one line, biggest laugh.
//
// The roast targets the smart fridge's touchscreen: it shames you for
// eating a snack, then turns around and shows you an ad for that same
// snack. Two smart-fridge behaviours in one line — the judgemental screen
// and the ad slot built into it.
//
// Deliberately a new angle for v2: no milk, no dairy, no app playing
// relationship counsellor (that was v1, 43.41%). No firmware update at
// 3 a.m., no ice maker on strike, no camera footage either — the joke
// lives on the touchscreen, which is the most fridge-specific surface
// a smart fridge has.
import { mkdirSync, writeFileSync } from "node:fs";
import { dirname, isAbsolute, join, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const ROAST =
  "My fridge's touchscreen now shows ads for the snacks it just shamed me for eating.";

function fail(message: string): never {
  throw new Error(`fridge-roast v2: ${message}`);
}

function checkedLine(text: string): string {
  const chars = [...text].length;
  if (chars < 1 || chars > 200) {
    fail(`entry must be 1-200 chars, got ${chars}`);
  }
  if (/[\r\n]/.test(text)) {
    fail("entry must be a single line");
  }
  if (text !== text.trim()) {
    fail("entry must not start or end with whitespace");
  }
  return text;
}

// Anchor everything to this file's own directory, never to the process
// working directory: the grader may run the program from anywhere.
const HERE = dirname(fileURLToPath(import.meta.url));
const requested = process.env.MAKEFUN_OUTPUT_DIR ?? "/output";
const outDir = isAbsolute(requested) ? requested : resolve(HERE, requested);

const line = checkedLine(ROAST);
mkdirSync(outDir, { recursive: true });
const outPath = join(outDir, "entry.txt");
// Exactly one line, no trailing newline: the sealed scorer gates on
// 1-200 characters of UTF-8 text, and a stray newline would count.
writeFileSync(outPath, line, "utf8");
console.log(`fridge-roast v2: wrote ${[...line].length} chars to ${outPath}`);
