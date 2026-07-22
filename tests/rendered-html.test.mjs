import assert from "node:assert/strict";
import { access, readFile, readdir } from "node:fs/promises";
import test from "node:test";

async function render() {
  const workerUrl = new URL("../dist/server/index.js", import.meta.url);
  workerUrl.searchParams.set("test", `${process.pid}-${Date.now()}`);
  const { default: worker } = await import(workerUrl.href);

  return worker.fetch(
    new Request("http://localhost/", { headers: { accept: "text/html" } }),
    { ASSETS: { fetch: async () => new Response("Not found", { status: 404 }) } },
    { waitUntil() {}, passThroughOnException() {} },
  );
}

test("server-renders the Avena single page", async () => {
  const response = await render();
  assert.equal(response.status, 200);
  assert.match(response.headers.get("content-type") ?? "", /^text\/html\b/i);

  const html = await response.text();
  assert.match(html, /<title>Avena \| Custom Software Development<\/title>/i);
  assert.match(html, /Unleash the Power of Digital Transformation with AVENA/);
  assert.match(html, /id="portfolio"/);
  assert.match(html, /id="services"/);
  assert.match(html, /id="contact-us"/);
  assert.match(html, /Search for what you are looking for and get the best matches\./);
  assert.match(html, /Our Methodology/);
  assert.match(html, /class="avena-desktop-wordmark"/);
  assert.match(html, /<svg width="121" height="35" viewBox="0 0 121 35"/);
  assert.doesNotMatch(html, /best-macthes|Methogology|Abous Us/i);
  assert.doesNotMatch(html, />Javascript</);
  assert.doesNotMatch(html, />Linkedin</);
  assert.doesNotMatch(html, /href="\/assets\/original-(?:base|landing|contact)\.css"/);
  assert.doesNotMatch(html, /codex-preview|react-loading-skeleton|Your site is taking shape/i);
});

test("ships site-specific assets and metadata", async () => {
  const builtAssets = new URL("../dist/client/assets/", import.meta.url);
  const builtCssFiles = (await readdir(builtAssets)).filter((file) => file.endsWith(".css"));
  const builtCss = (await Promise.all(builtCssFiles.map((file) => readFile(new URL(file, builtAssets), "utf8")))).join("\n");
  const [page, layout, css] = await Promise.all([
    readFile(new URL("../app/page.tsx", import.meta.url), "utf8"),
    readFile(new URL("../app/layout.tsx", import.meta.url), "utf8"),
    readFile(new URL("../app/globals.css", import.meta.url), "utf8"),
  ]);

  assert.match(page, /originalMarkup/);
  assert.match(page, /originalMobileMarkup/);
  assert.match(page, /aria-expanded/);
  assert.match(page, /max-width: 767px\) and \(pointer: coarse/);
  assert.match(layout, /Avena \| Custom Software Development/);
  assert.match(layout, /\/og\.png/);
  assert.match(layout, /\.\/styles\/original-base\.css/);
  assert.match(layout, /\.\/styles\/original-landing\.css/);
  assert.match(layout, /\.\/styles\/original-contact\.css/);
  assert.match(css, /prefers-reduced-motion/);
  assert.match(css, /@media \(min-width:1024px\)/);
  assert.match(css, /@media \(hover:hover\) and \(pointer:fine\)/);
  assert.match(css, /avena-desktop-wordmark/);
  assert.match(builtCss, /header_header__3o0p0/);
  assert.match(builtCss, /landing_section_1__wUsHN/);
  assert.doesNotMatch(page + layout, /_sites-preview|SkeletonPreview/);

  await Promise.all([
    access(new URL("../public/og.png", import.meta.url)),
    access(new URL("../public/assets/landing-background.webp", import.meta.url)),
    access(new URL("../public/assets/talenthub.dcfd5067.webp", import.meta.url)),
    access(new URL("../app/styles/original-base.css", import.meta.url)),
    access(new URL("../app/styles/original-landing.css", import.meta.url)),
    access(new URL("../app/styles/original-contact.css", import.meta.url)),
  ]);
});
