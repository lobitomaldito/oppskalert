// Røyktest for api/_lib/nettsidesjekk.js. Uten argumenter kjører sperrene og
// målingene mot faste eksempler. Med domener som argument måles de på ekte:
//
//   node scripts/sjekk-nettsidesjekk.mjs
//   node scripts/sjekk-nettsidesjekk.mjs firma.no annenfirma.no
import assert from 'node:assert/strict';
import { erStengtIp, rensDomene, sjekkNettside, synligTekst, vurder } from '../api/_lib/nettsidesjekk.js';

const domener = process.argv.slice(2);

if (!domener.length) {
  // Adressefeltet
  assert.equal(rensDomene('https://www.Firma.no/om-oss?x=1'), 'firma.no');
  assert.equal(rensDomene('  bøker.no '), 'xn--bker-gra.no');
  for (const ugyldig of ['', 'localhost', 'http://127.0.0.1', '2130706433', '[::1]', 'firma', 'firma.no:8080',
    'ftp://firma.no', 'user:pass@firma.no', 'metadata.google.internal', 'printer.local', '10.0.0.1']) {
    assert.equal(rensDomene(ugyldig), null, ugyldig);
  }

  // Interne nett
  for (const ip of ['127.0.0.1', '10.1.2.3', '172.20.0.1', '192.168.1.1', '169.254.169.254', '100.64.0.1',
    '0.0.0.0', '::1', 'fd00:ec2::254', 'fe80::1', '::ffff:127.0.0.1']) {
    assert.ok(erStengtIp(ip), ip);
  }
  for (const ip of ['76.76.21.21', '2606:4700::6810:84e5']) assert.ok(!erStengtIp(ip), ip);

  // En god og en dårlig forside
  const tekst = 'ord '.repeat(400);
  const god = vurder({
    url: 'https://firma.no/', ms: 600, aar: 2026,
    html: `<html><head><title>Rørlegger i Bergen | Firma</title><meta name="description" content="Vi fikser rør.">
      <meta name="viewport" content="width=device-width, initial-scale=1"></head>
      <body><h1>Rør</h1><p>${tekst}</p><a href="tel:+4712345678">12 34 56 78</a><footer>© 2026 Firma</footer></body></html>`,
  });
  assert.equal(god.karakter, 'A');
  assert.equal(god.antallFunn, 0);

  const darlig = vurder({
    url: 'http://firma.no/', ms: 3400, aar: 2026,
    html: '<html><head><title>Home</title><meta name="description" content=""></head><body><p>Kommer snart</p><p>Ring 12 34 56 78</p><p>&copy; 2019</p></body></html>',
  });
  assert.equal(darlig.karakter, 'F');
  assert.equal(darlig.antallFunn, 7);
  assert.deepEqual(darlig.punkter.find((p) => p.id === 'kontakt'), { id: 'kontakt', status: 'delvis', verdi: 'nummer' });
  assert.deepEqual(darlig.punkter.find((p) => p.id === 'oppdatert').verdi, { rest: true });

  // Årstallet bak et spenn teller, ikke det første
  const spenn = vurder({ url: 'https://f.no/', ms: 500, aar: 2026, html: '<body>© 2015–2025 Firma</body>' });
  assert.deepEqual(spenn.punkter.find((p) => p.id === 'oppdatert'), { id: 'oppdatert', status: 'delvis', verdi: { bak: 1 } });

  // Blokker fjernes, også uten sluttag og med store bokstaver
  assert.equal(synligTekst('<p>a</p><SCRIPT>x</script><p>b</p><!-- c --><style>d'), 'a b');

  // Fiendtlig HTML skal gå i lineær tid. Hvert mønster her var kvadratisk i
  // første versjon og kunne holde funksjonen opptatt i minutter.
  const mb = 1_000_000;
  for (const [navn, ondsinnet] of [
    ['script uten slutt', '<script '.repeat(mb / 8)],
    ['kommentar uten slutt', '<!--'.repeat(mb / 4)],
    ['tagger uten >', '<'.repeat(mb)],
    ['meta uten >', '<meta '.repeat(mb / 6)],
    ['title uten slutt', '<title>'.repeat(mb / 7)],
    ['href uten slutt', 'href='.repeat(mb / 5)],
    ['tegnkode utenfor Unicode', '&#99999999;'.repeat(1000)],
  ]) {
    const t = performance.now();
    vurder({ html: ondsinnet, url: 'https://f.no/', ms: 100 });
    const ms = performance.now() - t;
    assert.ok(ms < 1500, `${navn}: ${Math.round(ms)} ms`);
  }

  // Stengt adresse når domenet peker innover
  await assert.rejects(sjekkNettside('localtest.me'), { code: 'STENGT' });

  console.log('ok: alle sjekker bestått');
} else {
  for (const d of domener) {
    const t0 = Date.now();
    try {
      const r = await sjekkNettside(rensDomene(d));
      const linje = r.punkter.map((p) => `${p.id}=${p.status}${p.verdi !== undefined ? `(${JSON.stringify(p.verdi)})` : ''}`).join(' ');
      console.log(`${d.padEnd(28)} ${r.karakter}  ${r.antallFunn} funn  ${Date.now() - t0} ms  ${linje}`);
    } catch (feil) {
      console.log(`${d.padEnd(28)} feil: ${feil.code || feil.message}  ${Date.now() - t0} ms`);
    }
  }
}
