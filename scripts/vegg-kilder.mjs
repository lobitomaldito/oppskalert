// Kildebilder til galleriveggen i heroen (src/components/Vegg.jsx): ett
// skjermbilde per prosjekt i telefonformat (390 x 844) og ett i
// laptopformat (1440 x 900, altså 16:10 som skjermen i mockupen).
// Bildene er bare råstoff for scripts/vegg-mockups.py og skal ikke i public/.
//
//   node scripts/vegg-kilder.mjs <utmappe>
import puppeteer from 'puppeteer';
import { mkdir } from 'node:fs/promises';
import { prosjekter } from '../src/lib/site.js';

const ut = process.argv[2];
if (!ut) throw new Error('Oppgi utmappe: node scripts/vegg-kilder.mjs <utmappe>');
await mkdir(ut, { recursive: true });

const FORMATER = {
  mobil: { width: 390, height: 844, deviceScaleFactor: 1, isMobile: true, hasTouch: true },
  pc: { width: 1440, height: 900, deviceScaleFactor: 1 },
};
const MOBIL_UA = 'Mozilla/5.0 (iPhone; CPU iPhone OS 17_0 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/17.0 Mobile/15E148 Safari/604.1';

// Rullepunkt i piksler for sider der toppen ikke viser noe. Forsiden til
// Kolflaath åpner med ordmerket alene på en lys flate, som blir en nesten
// tom flis. 620 px ned står overskrift, tekst og portrett i samme skjerm.
const RULL = { 'kolflaath-mobil': 620 };

const browser = await puppeteer.launch({ headless: true, args: ['--no-sandbox'] });

for (const p of prosjekter.filter((p) => p.slug)) {
  for (const [enhet, viewport] of Object.entries(FORMATER)) {
    const side = await browser.newPage();
    try {
      if (enhet === 'mobil') await side.setUserAgent(MOBIL_UA);
      await side.setViewport(viewport);
      await side.goto(p.url, { waitUntil: 'networkidle2', timeout: 45000 });
      await new Promise((r) => setTimeout(r, 1500));
      // Samtykkebannere dekker halve skjermen på mobil. Samme rydding som i
      // skjermbilder.mjs, pluss «informasjonskapsler», som er ordet de
      // norske sidene faktisk bruker.
      await side.evaluate(() => {
        const treff = /cookie|consent|samtykke|gdpr|informasjonskaps/i;
        document.querySelectorAll('div,section,aside,dialog').forEach((e) => {
          const s = getComputedStyle(e);
          if ((s.position === 'fixed' || s.position === 'sticky') && treff.test(e.className + ' ' + e.id + ' ' + e.textContent.slice(0, 200))) e.remove();
        });
      });
      const rull = RULL[`${p.slug}-${enhet}`];
      if (rull) {
        await side.evaluate((y) => scrollTo(0, y), rull);
        await new Promise((r) => setTimeout(r, 1200));
      }
      await side.screenshot({ path: `${ut}/${p.slug}-${enhet}.png` });
      console.log('ok', p.slug, enhet);
    } catch (e) {
      console.log('FEIL', p.slug, enhet, e.message.slice(0, 70));
    }
    await side.close();
  }
}
await browser.close();
