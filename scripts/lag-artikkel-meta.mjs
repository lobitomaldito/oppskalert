/* Skriver src/content/generated/meta.json: listefeltene for alle innlegg, uten
   brødteksten. /blogg og /om viser bare tittel, ingress, dato og bilde, men
   importerte tidligere hele src/lib/articles.js, så brødteksten i alle innlegg
   (rundt 390 kB JavaScript, 134 kB komprimert 12.11.2026) ble lastet før lista
   kunne vises. Kjøres av `prebuild` og `predev`, så lista følger nye innlegg. */
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { articles } from '../src/lib/articles.js';
import handwritten from '../src/content/handskrevne.js';

const ROT = path.join(path.dirname(fileURLToPath(import.meta.url)), '..');
const meta = articles.map(({ slug, klynge, title, description, publishDate, updatedDate, hero }) => ({
  slug, klynge, title, description, publishDate, updatedDate, hero,
}));
fs.writeFileSync(path.join(ROT, 'src/content/generated/meta.json'), JSON.stringify(meta, null, 1) + '\n');

/* lastere.js: én dynamisk import per innlegg, så /blogg/<slug> bare henter sin
   egen tekst. Før lastet ArticlePage brødteksten i alle innlegg (116 kB komprimert)
   for å vise ett. Vite trenger importene skrevet ut som tekst, derfor en generert fil. */
const hand = new Set(handwritten.map((a) => a.slug));
const linjer = articles.map(({ slug }) =>
  hand.has(slug)
    ? `  '${slug}': () => import('../handskrevne.js').then((m) => m.default.find((a) => a.slug === '${slug}')),`
    : `  '${slug}': () => import('./${slug}.js').then((m) => m.default),`,
);
fs.writeFileSync(
  path.join(ROT, 'src/content/generated/lastere.js'),
  `// Generert av scripts/lag-artikkel-meta.mjs. Ikke rediger for hånd.\nexport const lastere = {\n${linjer.join('\n')}\n};\n`,
);
console.log(`artikkel-meta: ${meta.length} innlegg, lastere.js skrevet`);
