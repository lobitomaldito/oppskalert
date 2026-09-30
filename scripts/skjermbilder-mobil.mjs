// Mobilfangster til galleriveggen i heroen (src/components/Vegg.jsx).
// Én skjermhøyde per prosjekt, 390 x 844, til public/websider/mobil/<slug>.webp.
// Kjør fra repo-roten: node scripts/skjermbilder-mobil.mjs
import puppeteer from 'puppeteer';
import { mkdir } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';
import { prosjekter } from '../src/lib/site.js';

// fileURLToPath, ikke .pathname: repo-stien har mellomrom, og .pathname
// gir «Oppskalert%203» og skriver til en mappe som ikke finnes.
const rot = fileURLToPath(new URL('../public/websider/mobil/', import.meta.url));
await mkdir(rot, { recursive: true });

const browser = await puppeteer.launch({ headless: true, args: ['--no-sandbox'] });

for (const p of prosjekter.filter((p) => p.slug)) {
  const side = await browser.newPage();
  try {
    await side.setUserAgent('Mozilla/5.0 (iPhone; CPU iPhone OS 17_0 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/17.0 Mobile/15E148 Safari/604.1');
    await side.setViewport({ width: 390, height: 844, deviceScaleFactor: 1, isMobile: true, hasTouch: true });
    await side.goto(p.url, { waitUntil: 'networkidle2', timeout: 45000 });
    await new Promise((r) => setTimeout(r, 1500));
    // Samtykkebannere dekker halve skjermen på mobil. Samme rydding som i
    // skjermbilder.mjs.
    await side.evaluate(() => {
      const treff = /cookie|consent|samtykke|gdpr/i;
      document.querySelectorAll('div,section,aside,dialog').forEach((e) => {
        const s = getComputedStyle(e);
        if ((s.position === 'fixed' || s.position === 'sticky') && treff.test(e.className + ' ' + e.id + ' ' + e.textContent.slice(0, 200))) e.remove();
      });
    });
    await side.screenshot({ path: `${rot}${p.slug}.webp`, quality: 72 });
    console.log('ok', p.slug);
  } catch (e) {
    console.log('FEIL', p.slug, e.message.slice(0, 70));
  }
  await side.close();
}
await browser.close();
