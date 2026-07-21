import { readFile, writeFile } from "node:fs/promises";
import path from "node:path";
import { proofreadMarkup } from "./proofreading-replacements.mjs";

const [inputPath, outputPath] = process.argv.slice(2);
if (!inputPath || !outputPath) {
  throw new Error("Usage: node scripts/generate-original-markup.mjs <input-html> <output-ts>");
}

let markup = await readFile(inputPath, "utf8");

function localAsset(source) {
  if (!source || source.startsWith("data:") || source.startsWith("blob:")) return source;
  if (source.startsWith("/_next/image?")) {
    const parsed = new URL(`https://avena.co${source.replaceAll("&amp;", "&")}`);
    const original = parsed.searchParams.get("url");
    return original ? `/assets/${path.basename(original)}` : source;
  }
  if (source.startsWith("/_next/static/media/")) return `/assets/${path.basename(source)}`;
  if (/^\/[A-Za-z0-9_.-]+\.(?:webp|png|jpe?g|svg|gif|woff2?)$/i.test(source)) {
    return `/assets/${path.basename(source)}`;
  }
  return source;
}

markup = markup
  .replace(/\s+srcset="[^"]*"/g, "")
  .replace(/\s+sizes="[^"]*"/g, "")
  .replace(/src="([^"]+)"/g, (_, src) => `src="${localAsset(src)}"`)
  .replaceAll('href="/"', 'href="#top"')
  .replaceAll('href="/about-us"', 'href="#about-us"')
  .replaceAll('href="/our-methodology"', 'href="#methodology"')
  .replace(/href="\/#([^"]+)"/g, 'href="#$1"')
  .replace('class="page_page__KiF7S"', 'class="page_page__KiF7S" id="top"')
  .replace('class="row_row__OAZZS landing_section_2__1CFF_"', 'class="row_row__OAZZS landing_section_2__1CFF_" id="about-us"')
  .replace('class="row_row__OAZZS landing_section_3__N5eqE"', 'class="row_row__OAZZS landing_section_3__N5eqE" id="methodology"')
  .replaceAll('id=":r0:"', 'id="contact-name"')
  .replaceAll('for=":r0:"', 'for="contact-name"')
  .replaceAll('id=":r1:"', 'id="contact-email"')
  .replaceAll('for=":r1:"', 'for="contact-email"')
  .replaceAll('id=":r2:"', 'id="contact-phone"')
  .replaceAll('for=":r2:"', 'for="contact-phone"')
  .replaceAll('id=":r3:"', 'id="contact-company"')
  .replaceAll('for=":r3:"', 'for="contact-company"')
  .replaceAll('id=":r4:"', 'id="contact-message"')
  .replaceAll('for=":r4:"', 'for="contact-message"')
  .replace('id="contact-email" type="text"', 'id="contact-email" type="email" required')
  .replace('id="contact-name" type="text"', 'id="contact-name" type="text" required')
  .replace('id="contact-message" type="text"', 'id="contact-message" required')
  .replace(' disabled=""', '');

markup = proofreadMarkup(markup);

const source = `// Generated from the owner-authorized live avena.co render.\nexport const originalMarkup = ${JSON.stringify(markup)};\n`;
await writeFile(outputPath, source);
