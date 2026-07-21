import { readFile, writeFile } from "node:fs/promises";
import { proofreadMarkup } from "./proofreading-replacements.mjs";

const files = process.argv.slice(2);
if (!files.length) {
  throw new Error("Usage: node scripts/proofread-generated-markup.mjs <generated-ts> [...generated-ts]");
}

for (const file of files) {
  const source = await readFile(file, "utf8");
  await writeFile(file, proofreadMarkup(source));
}
