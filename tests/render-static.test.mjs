import assert from "node:assert/strict";
import { access, readFile } from "node:fs/promises";
import test from "node:test";

test("exports a deployable Render static site", async () => {
  const html = await readFile(new URL("../out/index.html", import.meta.url), "utf8");

  assert.match(html, /<title>Avena \| Custom Software Development<\/title>/i);
  assert.match(html, /Unleash the Power of Digital Transformation with AVENA/);
  assert.match(html, /class="avena-desktop-wordmark"/);

  await Promise.all([
    access(new URL("../out/index.html", import.meta.url)),
    access(new URL("../out/og.png", import.meta.url)),
    access(new URL("../out/assets/landing-background.webp", import.meta.url)),
  ]);
});
