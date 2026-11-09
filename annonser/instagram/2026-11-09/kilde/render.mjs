// Rendrer de tre postene til 1080x1350 PNG. Kjør fra repo-roten: node annonser/instagram/2026-11-09/kilde/render.mjs
import puppeteer from 'puppeteer';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
const dir = path.dirname(fileURLToPath(import.meta.url));
const b = await puppeteer.launch();
const p = await b.newPage();
await p.setViewport({ width: 1200, height: 1400 });
await p.goto('file://' + path.join(dir, 'poster.html'), { waitUntil: 'networkidle0' });
await p.evaluateHandle('document.fonts.ready');
for (const n of [1, 2, 3]) {
  await (await p.$('#post-' + n)).screenshot({ path: path.join(dir, '..', `post-${n}.png`) });
}
await b.close();
