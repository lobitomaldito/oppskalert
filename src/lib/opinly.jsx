import React from 'react';

// Opinly utsteder kun sk-nøkler (ingen offentlig pk-variant for
// innholds-APIet), så nettleseren snakker aldri med Opinly direkte. Disse
// funksjonene kaller i stedet api/opinly/*.js, som holder nøkkelen
// server-side (se api/_shared/opinly.js).
const CDN_BASE = 'https://cdn.opinly.ai/LIwzobk1u-YBez9JJ3nQ2';

async function opinlyFetch(path, params = {}) {
  const url = new URL(path, window.location.origin);
  Object.entries(params).forEach(([key, value]) => {
    if (value !== undefined && value !== null && value !== '') {
      url.searchParams.set(key, value);
    }
  });

  const res = await fetch(url);

  if (res.status === 404) return null;
  if (!res.ok) throw new Error(`Opinly API-feil (${res.status}) på ${path}`);
  return res.json();
}

export function opinlyImageUrl(fileKey) {
  if (!fileKey) return null;
  return `${CDN_BASE}/${fileKey}`;
}

export async function getPosts({ limit = 12, cursor, category, author, sort = 'newest' } = {}) {
  const result = await opinlyFetch('/api/opinly/posts', { limit, cursor, category, author, sort });
  return result || { data: [], has_more: false, next_cursor: null };
}

export async function getPost(slug) {
  return opinlyFetch('/api/opinly/post', { slug });
}

export async function getCategories() {
  return (await opinlyFetch('/api/opinly/categories')) || [];
}

export async function getAuthors() {
  const res = await opinlyFetch('/api/opinly/authors');
  return res?.data || [];
}

export async function getAuthor(slug) {
  const res = await opinlyFetch('/api/opinly/authors', { slug });
  if (!res || res.type === 'not-found') return null;
  return res.data;
}

// Felles normalisering av et Post-sammendrag til formen BloggKort venter,
// brukt av blogg-oversikten, kategori- og forfattersidene.
export const normalizePost = (p) => ({
  slug: p.slug,
  title: p.title,
  description: p.description,
  image: opinlyImageUrl(p.image?.fileKey),
  date: p.firstPublishedAt,
  category: p.category?.name || null,
  source: 'opinly',
});

/* ---------------------------------------------------------------
   CONTENT NODE-RENDERING. Opinly leverer post.content som et
   ProseMirror-lignende tre (type/attrs/marks/text/content) i stedet
   for markdown. Denne rendreren matcher typografien som allerede
   brukes for de håndskrevne artiklene i ArticlePage.jsx, og faller
   trygt tilbake til å rendre barn/tekst for nodetyper vi ikke
   kjenner igjen, i stedet for å krasje på ukjent struktur.
   --------------------------------------------------------------- */

const applyMarks = (text, marks, keyPrefix) => {
  if (!marks || marks.length === 0) return text;
  return marks.reduce((node, mark, i) => {
    const key = `${keyPrefix}-mark-${i}`;
    switch (mark.type) {
      case 'bold':
        return <strong key={key} className="text-primary font-semibold">{node}</strong>;
      case 'italic':
        return <em key={key} className="italic">{node}</em>;
      case 'code':
        return <code key={key} className="font-mono text-[0.9em] bg-surface/60 px-1.5 py-0.5 rounded">{node}</code>;
      case 'link':
        return (
          <a
            key={key}
            href={mark.attrs?.href}
            target={mark.attrs?.href?.startsWith('http') ? '_blank' : undefined}
            rel={mark.attrs?.href?.startsWith('http') ? 'noopener noreferrer' : undefined}
            className="text-accent underline underline-offset-2 hover:text-primary transition-colors"
          >
            {node}
          </a>
        );
      default:
        return node;
    }
  }, text);
};

const renderInline = (nodes = [], keyPrefix) =>
  nodes.map((node, i) => {
    const key = `${keyPrefix}-${i}`;
    if (node.type === 'text') return applyMarks(node.text, node.marks, key);
    if (node.type === 'hardBreak') return <br key={key} />;
    if (node.content) return <React.Fragment key={key}>{renderInline(node.content, key)}</React.Fragment>;
    return null;
  });

const headingClasses = {
  1: 'font-sans font-bold text-3xl md:text-4xl tracking-tight mt-14 mb-5 text-primary',
  2: 'font-sans font-bold text-2xl md:text-3xl tracking-tight mt-12 mb-4 text-primary',
  3: 'font-sans font-bold text-xl md:text-2xl tracking-tight mt-10 mb-3 text-primary',
};

export const renderOpinlyContent = (root) => {
  if (!root) return null;
  const blocks = root.type === 'doc' ? root.content || [] : [root];
  return blocks.map((node, i) => renderBlock(node, `block-${i}`));
};

function renderBlock(node, key) {
  switch (node.type) {
    case 'paragraph':
      return (
        <p key={key} className="font-body text-primary/85 leading-relaxed text-base md:text-lg my-5">
          {renderInline(node.content, key)}
        </p>
      );
    case 'heading': {
      const level = node.attrs?.level || 2;
      const className = headingClasses[level] || headingClasses[3];
      return React.createElement(`h${level}`, { key, className }, renderInline(node.content, key));
    }
    case 'bulletList':
      return (
        <ul key={key} className="list-disc list-inside space-y-2 my-6 font-body text-primary/85 text-base md:text-lg">
          {(node.content || []).map((item, i) => (
            <li key={`${key}-${i}`}>{renderInline(item.content?.[0]?.content, `${key}-${i}`)}</li>
          ))}
        </ul>
      );
    case 'orderedList':
      return (
        <ol key={key} className="list-decimal list-inside space-y-2 my-6 font-body text-primary/85 text-base md:text-lg">
          {(node.content || []).map((item, i) => (
            <li key={`${key}-${i}`}>{renderInline(item.content?.[0]?.content, `${key}-${i}`)}</li>
          ))}
        </ol>
      );
    case 'blockquote':
      return (
        <blockquote key={key} className="border-l-2 border-accent/50 pl-6 my-8 font-body italic text-primary/75 text-base md:text-lg">
          {(node.content || []).map((child, i) => renderBlock(child, `${key}-${i}`))}
        </blockquote>
      );
    case 'codeBlock':
      return (
        <pre key={key} className="bg-surface/60 border border-primary/10 rounded-2xl p-6 my-6 overflow-x-auto">
          <code className="font-mono text-sm text-primary/85">{node.content?.[0]?.text || ''}</code>
        </pre>
      );
    case 'image':
      return (
        <div key={key} className="my-8 rounded-[2rem] overflow-hidden">
          <img src={opinlyImageUrl(node.attrs?.fileKey) || node.attrs?.src} alt={node.attrs?.alt || ''} className="w-full h-auto" />
        </div>
      );
    case 'horizontalRule':
      return <hr key={key} className="my-10 border-primary/10" />;
    default:
      // Ukjent nodetype: rendre barna i stedet for å krasje eller miste innhold.
      if (node.content) return <React.Fragment key={key}>{node.content.map((c, i) => renderBlock(c, `${key}-${i}`))}</React.Fragment>;
      return null;
  }
}
