/* Engangsmigrering: henter publiserte blogginnlegg ut av Opinly og skriver
   dem som lokale filer under src/content/generated/, slik at bloggen
   overlever en oppsigelse av abonnementet.
 *
 * Kilden er prod-APIet (https://oppskalert.no/api/opinly/*) og ikke Opinly
 * direkte, fordi OPINLY_API_KEY kun finnes i Vercel-miljøet. Prod-ruten
 * holder nøkkelen server-side og returnerer nøyaktig det frontenden ser.
 *
 * Opinly leverer content som et ProseMirror-tre. De håndskrevne artiklene
 * bruker markdown, så treet konverteres her én gang i stedet for at vi drar
 * med oss to innholdsformater videre.
 *
 * Kjør: node scripts/migrate-opinly.mjs
 */

import fs from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.join(__dirname, '..');
const OUT_DIR = path.join(ROOT, 'src/content/generated');
const IMG_DIR = path.join(ROOT, 'public/blogg');
const API = 'https://oppskalert.no/api/opinly';
const CDN = 'https://cdn.opinly.ai/LIwzobk1u-YBez9JJ3nQ2';

/* ---------- ProseMirror -> markdown ---------- */

const escapeMd = (s) => s.replace(/([*_`[\]])/g, '\\$1');

function inline(nodes = []) {
  return nodes
    .map((n) => {
      if (n.type === 'hardBreak') return '\n';
      if (n.type !== 'text') return n.content ? inline(n.content) : '';
      let out = escapeMd(n.text);
      for (const mark of n.marks || []) {
        switch (mark.type) {
          case 'bold': out = `**${out}**`; break;
          case 'italic': out = `*${out}*`; break;
          case 'code': out = `\`${n.text}\``; break;
          case 'link': out = `[${out}](${mark.attrs?.href})`; break;
          default: break;
        }
      }
      return out;
    })
    .join('');
}

function block(node) {
  switch (node.type) {
    case 'paragraph':
      return inline(node.content);
    case 'heading':
      return `${'#'.repeat(node.attrs?.level || 2)} ${inline(node.content)}`;
    case 'bulletList':
      return (node.content || [])
        .map((li) => `- ${inline(li.content?.[0]?.content)}`)
        .join('\n');
    case 'orderedList':
      return (node.content || [])
        .map((li, i) => `${i + 1}. ${inline(li.content?.[0]?.content)}`)
        .join('\n');
    case 'blockquote':
      return (node.content || [])
        .map((c) => `> ${block(c)}`)
        .join('\n');
    case 'codeBlock':
      return `\`\`\`\n${node.content?.[0]?.text || ''}\n\`\`\``;
    case 'image': {
      const src = node.attrs?.fileKey ? `${CDN}/${node.attrs.fileKey}` : node.attrs?.src;
      return `![${node.attrs?.alt || ''}](${src})`;
    }
    case 'horizontalRule':
      return '---';
    default:
      // Ukjent nodetype: ta med barna i stedet for å miste innhold stille.
      return node.content ? node.content.map(block).filter(Boolean).join('\n\n') : '';
  }
}

const toMarkdown = (doc) =>
  (doc?.content || []).map(block).filter((s) => s && s.trim()).join('\n\n');

/* ---------- henting ---------- */

async function getJson(url) {
  const res = await fetch(url);
  if (!res.ok) throw new Error(`${res.status} ${res.statusText} på ${url}`);
  return res.json();
}

async function saveHero(fileKey, slug) {
  if (!fileKey) return null;
  const ext = path.extname(fileKey) || '.webp';
  const rel = `/blogg/${slug}${ext}`;
  const res = await fetch(`${CDN}/${fileKey}`);
  if (!res.ok) {
    console.warn(`  advarsel: hero ${fileKey} ga ${res.status}, hopper over`);
    return null;
  }
  await fs.mkdir(IMG_DIR, { recursive: true });
  await fs.writeFile(path.join(ROOT, 'public', rel), Buffer.from(await res.arrayBuffer()));
  console.log(`  hero -> public${rel}`);
  return rel;
}

/* ---------- skriving ---------- */

const varName = (slug) =>
  slug.replace(/[^a-zA-Z0-9]+(.)/g, (_, c) => c.toUpperCase()).replace(/^[0-9]/, 'p$&');

function fileContents(post, markdown, hero) {
  // JSON.stringify i stedet for template literal: innholdet inneholder både
  // backticks og ${...}-lignende sekvenser som ellers måtte escapes for hånd.
  const keywords = (post.tags || []).map((t) => t.name || t).filter(Boolean);
  return `/* Migrert ut av Opinly ${new Date().toISOString().slice(0, 10)}.
   Opprinnelig publisert ${post.firstPublishedAt}. Ikke rediger via Opinly,
   denne filen er nå kilden. Se content/BLOG-GENERATION.md. */

export default {
  slug: ${JSON.stringify(post.slug)},
  title: ${JSON.stringify(post.title)},
  description: ${JSON.stringify(post.description || post.metaDescription || '')},
  publishDate: ${JSON.stringify((post.firstPublishedAt || '').slice(0, 10))},
  keywords: ${JSON.stringify(keywords)},
  hero: ${JSON.stringify(hero)},
  content: ${JSON.stringify(markdown)},
};
`;
}

/* ---------- kjøring ---------- */

const list = await getJson(`${API}/posts?limit=100`);
const posts = list.data || [];
console.log(`fant ${posts.length} publiserte innlegg i Opinly\n`);

const written = [];
for (const summary of posts) {
  console.log(`${summary.slug}:`);
  const post = await getJson(`${API}/post?slug=${encodeURIComponent(summary.slug)}`);
  const markdown = toMarkdown(post.content);
  const hero = await saveHero(post.titleFile?.fileKey, post.slug);
  await fs.mkdir(OUT_DIR, { recursive: true });
  await fs.writeFile(
    path.join(OUT_DIR, `${post.slug}.js`),
    fileContents({ ...post, firstPublishedAt: summary.firstPublishedAt }, markdown, hero)
  );
  console.log(`  ${markdown.split(/\s+/).length} ord -> src/content/generated/${post.slug}.js\n`);
  written.push(post.slug);
}

/* Registeret må oppdateres manuelt-men-deterministisk: index.js er filen både
   Vite og Node leser, se kommentaren der. */
const imports = written.map((s) => `import ${varName(s)} from './${s}.js';`).join('\n');
const registry = `/* Register over automatgenererte artikler.
 *
 * Erstatter et tidligere \`import.meta.glob\`-oppslag. Globen er en
 * Vite-funksjon som blir borte når Vercel kjører api/sitemap.xml.js og
 * api/rss.xml.js som vanlig Node: da er \`import.meta.glob\` undefined,
 * modulen kaster ved import, og begge rutene svarer 500. Et vanlig
 * ESM-register leses likt av Vite og av Node.
 *
 * Generatoren legger til to linjer per ny artikkel: én import her øverst, og
 * én oppføring i arrayen under. Se content/BLOG-GENERATION.md.
 */

${imports}

export const generated = [${written.map(varName).join(', ')}];
`;
await fs.writeFile(path.join(OUT_DIR, 'index.js'), registry);
console.log(`registrerte ${written.length} artikler i src/content/generated/index.js`);
