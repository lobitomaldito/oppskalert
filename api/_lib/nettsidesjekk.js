import { lookup as dnsOppslag } from 'node:dns/promises';
import http from 'node:http';
import https from 'node:https';
import net from 'node:net';
import zlib from 'node:zlib';

// Målingene bak den gratis nettsidesjekken (/gratis-nettsidesjekk). Sju punkter,
// valgt av Aleksander 12.11.2026, alle lest fra forsidens rå HTML slik en robot
// henter den. Signalene er de samme som skrapingen alt bruker
// (~/.claude/skills/oppskalert-skrape/scrape_page.py og score.py) og
// seo-synlighet/diagnose.sh, oversatt til JavaScript.
//
// Funksjonen henter vilkårlige domener for fremmede, så sperrene er det
// viktigste her: bare http og https på standardport, ingen IP-adresser i
// adressen, og hvert navneoppslag sjekkes mot private og interne nett i selve
// tilkoblingen (tryggOppslag), slik at en omdirigering eller et DNS-svar som
// bytter adresse underveis ikke slipper gjennom.

const TIDSFRIST_MS = 9000;
const MAKS_HOPP = 4;
const MAKS_BYTE = 2_000_000;

const HODER = {
  'User-Agent':
    'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/130.0 Safari/537.36 OppskalertNettsidesjekk/1.0 (+https://oppskalert.no/gratis-nettsidesjekk)',
  Accept: 'text/html,application/xhtml+xml',
  'Accept-Language': 'nb-NO,nb;q=0.9,no;q=0.8',
  'Accept-Encoding': 'gzip, deflate, br',
};

// Private, lokale og reserverte nett. Metadata-endepunktene hos skyleverandørene
// (169.254.169.254, fd00:ec2::254) ligger i 169.254/16 og fc00::/7.
// ::ffff:0:0/96 står ikke i lista med vilje: BlockList sjekker IPv4-mappede
// adresser (::ffff:127.0.0.1) mot IPv4-reglene selv, og en egen regel for
// prefikset stenger alle IPv4-adresser.
const STENGT = new net.BlockList();
for (const [nett, prefiks] of [
  ['0.0.0.0', 8], ['10.0.0.0', 8], ['100.64.0.0', 10], ['127.0.0.0', 8], ['169.254.0.0', 16],
  ['172.16.0.0', 12], ['192.0.0.0', 24], ['192.0.2.0', 24], ['192.168.0.0', 16], ['198.18.0.0', 15],
  ['198.51.100.0', 24], ['203.0.113.0', 24], ['224.0.0.0', 4], ['240.0.0.0', 4],
]) STENGT.addSubnet(nett, prefiks, 'ipv4');
for (const [nett, prefiks] of [
  ['::', 128], ['::1', 128], ['64:ff9b::', 96], ['100::', 64],
  ['2001:db8::', 32], ['2002::', 16], ['fc00::', 7], ['fe80::', 10], ['ff00::', 8],
]) STENGT.addSubnet(nett, prefiks, 'ipv6');

export const erStengtIp = (ip) => STENGT.check(ip, net.isIPv6(ip) ? 'ipv6' : 'ipv4');

const kode = (navn) => Object.assign(new Error(navn), { code: navn });

const INTERNE_ENDELSER = /(^|\.)(localhost|local|internal|intranet|home|lan|corp|test|invalid|example)$/;
const VERTSNAVN = /^(?=.{4,253}$)(?:[a-z0-9](?:[a-z0-9-]{0,61}[a-z0-9])?\.)+[a-z][a-z0-9-]{0,61}[a-z0-9]$/;

/** «https://www.Firma.no/om» → «firma.no». null når det ikke er et offentlig domene. */
export function rensDomene(inn) {
  if (typeof inn !== 'string') return null;
  let s = inn.trim().toLowerCase();
  if (!s || s.length > 300) return null;
  if (!/^[a-z][a-z0-9+.-]*:\/\//.test(s)) s = `https://${s}`;
  let url;
  try { url = new URL(s); } catch { return null; }
  if (!['http:', 'https:'].includes(url.protocol) || url.username || url.password || url.port) return null;
  const vert = url.hostname.replace(/\.$/, '').replace(/^www\./, '');
  if (net.isIP(vert) || !VERTSNAVN.test(vert) || INTERNE_ENDELSER.test(vert)) return null;
  return vert;
}

// Kalles av Node for hver tilkobling, også etter omdirigeringer. Ett stengt
// svar stopper hele oppslaget, så et domene kan ikke blande en offentlig og en
// intern adresse og håpe at den interne blir valgt.
function tryggOppslag(vert, valg, ferdig) {
  dnsOppslag(vert, { all: true }).then(
    (adresser) => {
      if (!adresser.length || adresser.some((a) => erStengtIp(a.address))) return ferdig(kode('STENGT'));
      if (valg?.all) return ferdig(null, adresser);
      return ferdig(null, adresser[0].address, adresser[0].family);
    },
    (feil) => ferdig(feil),
  );
}

function sjekkUrl(url) {
  if (!['http:', 'https:'].includes(url.protocol) || url.username || url.password || url.port) throw kode('STENGT');
  // Node slår ikke opp IP-adresser, så de kommer aldri innom tryggOppslag.
  if (url.hostname.startsWith('[') || net.isIP(url.hostname) || INTERNE_ENDELSER.test(url.hostname)) throw kode('STENGT');
}

function tegnsett(type) {
  const m = /charset=["']?([\w-]+)/i.exec(type || '');
  try { return new TextDecoder(m ? m[1] : 'utf-8'); } catch { return new TextDecoder('utf-8'); }
}

function hentEn(url, signal) {
  return new Promise((ok, feil) => {
    const modul = url.protocol === 'https:' ? https : http;
    const req = modul.request(url, { headers: HODER, lookup: tryggOppslag, signal, agent: false }, (res) => {
      const { statusCode: status, headers } = res;
      if (status >= 300 && status < 400 && headers.location) {
        res.resume();
        ok({ status, location: headers.location });
        return;
      }
      const koding = String(headers['content-encoding'] || '').toLowerCase();
      const strom =
        koding.includes('gzip') ? res.pipe(zlib.createGunzip())
          : koding === 'deflate' ? res.pipe(zlib.createInflate())
            : koding === 'br' ? res.pipe(zlib.createBrotliDecompress())
              : res;
      const biter = [];
      let lengde = 0;
      const ferdig = () => ok({ status, type: headers['content-type'] || '', html: tegnsett(headers['content-type']).decode(Buffer.concat(biter)) });
      strom.on('data', (bit) => {
        biter.push(bit);
        lengde += bit.length;
        // Forsiden trenger ikke mer enn dette. Resten kastes, så en side som
        // strømmer i det uendelige ikke spiser minnet til funksjonen.
        if (lengde > MAKS_BYTE) { ferdig(); req.destroy(); }
      });
      strom.on('end', ferdig);
      strom.on('error', feil);
      res.on('error', feil);
    });
    req.on('error', feil);
    req.end();
  });
}

async function hentSide(start, signal) {
  let url = new URL(start);
  for (let hopp = 0; hopp <= MAKS_HOPP; hopp++) {
    sjekkUrl(url);
    const svar = await hentEn(url, signal);
    if (!svar.location) return { ...svar, url: url.href };
    url = new URL(svar.location, url);
  }
  throw kode('FOR_MANGE_HOPP');
}

// ── Målingene ───────────────────────────────────────────────────────────────

const ENTITETER = { nbsp: ' ', amp: '&', copy: '©', aelig: 'æ', oslash: 'ø', aring: 'å', AElig: 'Æ', Oslash: 'Ø', Aring: 'Å', quot: '"', lt: '<', gt: '>' };
const avkod = (s) =>
  s.replace(/&(#x[\da-f]+|#\d+|[a-z]+);/gi, (hele, e) =>
    e[0] === '#' ? String.fromCodePoint(e[1].toLowerCase() === 'x' ? parseInt(e.slice(2), 16) : Number(e.slice(1))) : ENTITETER[e] ?? hele);

/** Synlig tekst slik en robot uten JavaScript leser den. */
export const synligTekst = (html) =>
  avkod(
    html
      .replace(/<!--[\s\S]*?-->/g, ' ')
      .replace(/<(head|script|style|noscript|template|svg)\b[\s\S]*?<\/\1>/gi, ' ')
      .replace(/<[^>]+>/g, ' '),
  ).replace(/\s+/g, ' ').trim();

const metaInnhold = (html, navn) => {
  for (const tag of html.match(/<meta\b[^>]*>/gi) || []) {
    if (!new RegExp(`name\\s*=\\s*["']?${navn}["'\\s>]`, 'i').test(tag)) continue;
    const m = /content\s*=\s*(["'])([\s\S]*?)\1/i.exec(tag);
    return m ? avkod(m[2]).trim() : '';
  }
  return null;
};

const GENERISK_TITTEL = /^(home|hjem|forside|startside|index|untitled|welcome|velkommen|my site|min side|new page|ny side|wordpress)$/i;

// Fra scrape_page.py (_RESTER): alle mønstrene er sett publisert på ekte sider.
const RESTER = /(lorem ipsum|your text here|din tekst her|user@domain\.|example@|some-random|her kommer|kommer snart|coming soon|endre denne teksten|skriv inn tekst her|bilde kommer|tekst kommer)/i;

// «© 2019–2024»: det siste årstallet i spennet er det som teller.
const COPYRIGHT = /(?:©|\(c\)|copyright)[^0-9]{0,40}((?:19|20)\d{2})(?:\s*[-–]\s*((?:19|20)\d{2}))?/gi;

const TELEFON = /(?<!\d)(?:\+47[\s.]?)?(?:\d{2}[\s.]?\d{2}[\s.]?\d{2}[\s.]?\d{2}|\d{3}[\s.]?\d{2}[\s.]?\d{3})(?!\d)/;

// Vekten avgjør karakteren. Utrygg tilkobling og en side som ikke virker på
// mobil stopper besøkende før de har lest noe, derfor teller de mest.
export const VEKT = { trygg: 3, mobil: 3, lesbar: 2, fart: 2, sok: 2, kontakt: 2, oppdatert: 1 };
const POENG = { ok: 1, delvis: 0.5, feil: 0 };

export function karakterFor(punkter) {
  const maks = punkter.reduce((s, p) => s + VEKT[p.id], 0);
  const andel = punkter.reduce((s, p) => s + VEKT[p.id] * POENG[p.status], 0) / maks;
  // Kalibrert på 16 ekte sider 12.11.2026: med A fra 0,9 fikk 11 av 16 A,
  // også sider skrapingen ga 4 av 10. Nå koster ett halvt funn på et punkt
  // med vekt 2 eller mer A-en.
  if (andel >= 0.95) return 'A';
  if (andel >= 0.85) return 'B';
  if (andel >= 0.7) return 'C';
  if (andel >= 0.55) return 'D';
  if (andel >= 0.4) return 'E';
  return 'F';
}

/** Ren vurdering av én hentet forside. Ingen nettverk, så den kan testes. */
export function vurder({ html, url, ms, aar = new Date().getFullYear() }) {
  const tekst = synligTekst(html);
  const punkter = [];

  punkter.push({ id: 'trygg', status: url.startsWith('https:') ? 'ok' : 'feil' });

  const viewport = metaInnhold(html, 'viewport');
  punkter.push({ id: 'mobil', status: viewport === null ? 'feil' : /width\s*=\s*device-width/i.test(viewport) ? 'ok' : 'delvis' });

  const sek = Math.round(ms / 100) / 10;
  punkter.push({ id: 'fart', status: sek <= 1.0 ? 'ok' : sek <= 2.5 ? 'delvis' : 'feil', verdi: sek });

  const tittel = avkod((/<title[^>]*>([\s\S]*?)<\/title>/i.exec(html)?.[1] || '').replace(/\s+/g, ' ')).trim();
  const vert = new URL(url).hostname.replace(/^www\./, '');
  const tittelOk = tittel.length >= 4 && !GENERISK_TITTEL.test(tittel) && tittel.toLowerCase().replace(/^www\./, '') !== vert;
  const beskrivelseOk = Boolean(metaInnhold(html, 'description'));
  const mangler = 2 - tittelOk - beskrivelseOk;
  punkter.push({ id: 'sok', status: ['ok', 'delvis', 'feil'][mangler], verdi: mangler });

  const ord = tekst.split(' ').filter((w) => /[\p{L}\p{N}]/u.test(w)).length;
  punkter.push({ id: 'lesbar', status: ord >= 200 ? 'ok' : ord >= 80 ? 'delvis' : 'feil', verdi: ord });

  const ring = /href\s*=\s*["']?\s*tel:/i.test(html);
  const skriv = /href\s*=\s*["']?\s*mailto:/i.test(html) || /<form\b/i.test(html);
  const nummer = TELEFON.test(tekst);
  const side = /href\s*=\s*["']?[^"'\s>]*(kontakt|contact)/i.test(html);
  punkter.push({
    id: 'kontakt',
    status: ring ? 'ok' : skriv || nummer || side ? 'delvis' : 'feil',
    verdi: ring ? 'ring' : nummer ? 'nummer' : skriv ? 'skriv' : side ? 'side' : 'ingen',
  });

  const rest = RESTER.exec(tekst);
  const ar = [...tekst.matchAll(COPYRIGHT)].flatMap((m) => [m[1], m[2]]).filter(Boolean).map(Number).filter((a) => a <= aar);
  const bak = ar.length ? aar - Math.max(...ar) : 0;
  punkter.push({
    id: 'oppdatert',
    status: rest || bak >= 3 ? 'feil' : bak >= 1 ? 'delvis' : 'ok',
    verdi: rest ? { rest: true } : { bak },
  });

  return { punkter, karakter: karakterFor(punkter), antallFunn: punkter.filter((p) => p.status !== 'ok').length };
}

/**
 * Henter forsiden og måler den. Prøver https først, så www, så http, slik en
 * nettleser ville gjort. Kaster ved stengt adresse eller når ingenting svarer.
 */
export async function sjekkNettside(domene) {
  const signal = AbortSignal.timeout(TIDSFRIST_MS);
  let sisteFeil = null;
  for (const start of [`https://${domene}/`, `https://www.${domene}/`, `http://${domene}/`, `http://www.${domene}/`]) {
    const t0 = performance.now();
    try {
      const side = await hentSide(start, signal);
      if (side.status >= 400 || !/html/i.test(side.type)) throw kode(`HTTP_${side.status}`);
      const ms = performance.now() - t0;
      return { domene, url: side.url, ...vurder({ html: side.html, url: side.url, ms }) };
    } catch (feil) {
      sisteFeil = feil;
      if (feil.code === 'STENGT' || signal.aborted) break;
    }
  }
  throw sisteFeil || kode('IKKE_HENTET');
}
