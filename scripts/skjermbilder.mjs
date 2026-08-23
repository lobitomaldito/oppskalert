// Skyter porteføljebildene på nytt i dobbel oppløsning. Samme utsnitt som før:
// de lange rullebildene fanges på 1280 CSS-px (dagens filer er nøyaktig halve),
// kortbildene på 1440x810 med skalafaktor 1,25, altså 1800x1012.
// Skriver til public/websider/2x/ så ingenting overskrives før det er sett.
import puppeteer from 'puppeteer';
import { mkdir } from 'node:fs/promises';
import { prosjekter } from './src/lib/site.js';

const rot = new URL('./public/websider/2x/', import.meta.url).pathname;
await mkdir(rot + 'full', { recursive: true });

const browser = await puppeteer.launch({ headless: true, args: ['--no-sandbox'] });

const ryddSamtykke = async (page) => {
  await page.evaluate(() => {
    const treff = /cookie|consent|samtykke|gdpr/i;
    document.querySelectorAll('div,section,aside,dialog').forEach((e) => {
      const s = getComputedStyle(e);
      if ((s.position === 'fixed' || s.position === 'sticky') && treff.test(e.className + ' ' + e.id + ' ' + e.textContent.slice(0, 200))) e.remove();
    });
  });
};

for (const p of prosjekter) {
  const slug = p.img.split('/').pop().replace('.webp', '');
  for (const modus of p.full ? ['full', 'kort'] : ['kort']) {
    const side = await browser.newPage();
    try {
      if (modus === 'full') await side.setViewport({ width: 1280, height: 1000, deviceScaleFactor: 1 });
      else await side.setViewport({ width: 1440, height: 810, deviceScaleFactor: 1.25 });
      await side.goto(p.url, { waitUntil: 'networkidle2', timeout: 45000 });
      await new Promise((r) => setTimeout(r, 1200));
      await ryddSamtykke(side);
      // Lat lasting: rull gjennom, så alle bilder er hentet før fangsten.
      await side.evaluate(async () => {
        await new Promise((r) => { let y = 0; const s = () => { y += 400; scrollTo(0, y);
          if (y < Math.min(document.body.scrollHeight, 7000)) setTimeout(s, 110); else { scrollTo(0, 0); setTimeout(r, 900); } }; s(); });
      });
      // Kundesidene skjuler innhold med opacity 0 til det rulles inn, og et
      // klipp utenfor viewporten nullstiller den tilstanden. Uten dette blir
      // nedre halvdel av fangsten blank, som den ble første runde.
      await side.addStyleTag({ content: `*{animation-duration:.001s!important;transition-duration:.001s!important}
        [data-aos],[class*=reveal],[class*=fade],[class*=animate],[class*=wow],[class*=inview],[class*=scroll-],[data-scroll]{opacity:1!important;transform:none!important;visibility:visible!important;clip-path:none!important}` });
      await side.evaluate(() => {
        document.querySelectorAll('body *').forEach((e) => {
          const s = getComputedStyle(e);
          if (s.display === 'none' || s.position === 'fixed') return;
          if (parseFloat(s.opacity) < 0.9 && e.textContent.trim().length + e.querySelectorAll('img,svg').length > 0) {
            e.style.setProperty('opacity', '1', 'important');
            e.style.setProperty('transform', 'none', 'important');
          }
        });
      });
      await new Promise((r) => setTimeout(r, 600));
      const h = await side.evaluate(() => document.body.scrollHeight);
      if (modus === 'full') {
        await side.screenshot({ path: `${rot}full/${slug}.webp`, quality: 62,
          clip: { x: 0, y: 0, width: 1280, height: Math.min(h, 5000) } });
        console.log('full', slug, 1280 + 'x' + Math.min(h, 5000));
      } else {
        await side.screenshot({ path: `${rot}${slug}.webp`, quality: 70 });
        console.log('kort', slug, '1800x1012');
      }
    } catch (e) {
      console.log('FEIL', slug, modus, e.message.slice(0, 70));
    }
    await side.close();
  }
}
await browser.close();
