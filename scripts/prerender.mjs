#!/usr/bin/env node
// Postbuild step: crawls the built SPA with a real headless browser and
// writes a fully-rendered HTML snapshot per static route, so crawlers that
// don't execute JS get a real H1/title/meta/JSON-LD instead of an empty
// <div id="root">. See content/BLOG-GENERATION.md's sibling doc note in
// .claude/plans/swift-orbiting-jellyfish.md for the full rationale.
//
// Deliberately NOT react-dom/server SSR: this codebase leans on real-DOM
// APIs (GSAP ScrollTrigger, IntersectionObserver in useReveal, a three.js
// canvas) that a Node SSR render can't execute. A headless Chromium tab
// runs the app exactly like a real browser and needs zero component
// changes.
import http from 'node:http';
import { readFile, mkdir, writeFile } from 'node:fs/promises';
import { existsSync, statSync } from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const distDir = path.join(__dirname, '..', 'dist');

// Static-content routes only. Opinly-backed blog routes (/blogg, /blogg/:slug,
// /blogg/kategori/:slug, /blogg/forfatter/:slug) are excluded: their content
// is unknown at build time. /admin/dashboard IS included so its noindex
// robots tag (set unconditionally by SEO.jsx regardless of PIN state)
// reaches non-JS crawlers too — the PinGate shell has no private data in it.
const ROUTES = [
  '/', '/arbeid', '/priser', '/metode', '/om', '/kontakt', '/drift',
  '/sammenlign', '/sammenlign/wix', '/sammenlign/wordpress', '/kalkulator',
  '/sokemotoroptimalisering',
  '/eksempler/frisor', '/eksempler/handverker', '/eksempler/restaurant', '/eksempler/tannlege',
  '/admin/dashboard',
];

const MIME = {
  '.html': 'text/html; charset=utf-8',
  '.js': 'application/javascript',
  '.mjs': 'application/javascript',
  '.css': 'text/css',
  '.json': 'application/json',
  '.svg': 'image/svg+xml',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.webp': 'image/webp',
  '.woff2': 'font/woff2',
  '.woff': 'font/woff',
  '.ico': 'image/x-icon',
  '.txt': 'text/plain',
  '.xml': 'application/xml',
};

function contentTypeFor(filePath) {
  return MIME[path.extname(filePath)] || 'application/octet-stream';
}

// Mirrors vercel.json's SPA-fallback behavior: any path without a literal
// file on disk falls back to the root index.html so client-side routing
// can take over, exactly like a real Vercel request would see it.
async function startServer() {
  const server = http.createServer(async (req, res) => {
    try {
      const urlPath = decodeURIComponent((req.url || '/').split('?')[0]);
      let filePath = path.join(distDir, urlPath);
      const isDir = existsSync(filePath) && statSync(filePath).isDirectory();
      if (!existsSync(filePath) || isDir) {
        filePath = path.join(distDir, 'index.html');
      }
      const body = await readFile(filePath);
      res.writeHead(200, { 'Content-Type': contentTypeFor(filePath) });
      res.end(body);
    } catch (err) {
      res.writeHead(500);
      res.end(`prerender static server error: ${err.message}`);
    }
  });
  await new Promise((resolve) => server.listen(0, '127.0.0.1', resolve));
  return server;
}

// Vercel's build image may lack shared libs a vanilla downloaded Chromium
// needs (the same class of problem the Lambda runtime has). Branch on the
// VERCEL env var (set automatically in Vercel's build environment) to use
// a build-friendly Chromium there, and plain puppeteer for local iteration.
async function launchBrowser() {
  const sandboxArgs = ['--no-sandbox', '--disable-setuid-sandbox', '--disable-dev-shm-usage'];
  if (process.env.VERCEL) {
    const { default: chromium } = await import('@sparticuz/chromium');
    const puppeteerCore = await import('puppeteer-core');
    return puppeteerCore.launch({
      args: [...chromium.args, ...sandboxArgs],
      executablePath: await chromium.executablePath(),
      headless: chromium.headless,
    });
  }
  const { default: puppeteer } = await import('puppeteer');
  return puppeteer.launch({ headless: true, args: sandboxArgs });
}

async function snapshotRoute(browser, baseUrl, route) {
  const page = await browser.newPage();
  try {
    await page.goto(`${baseUrl}${route}`, { waitUntil: 'networkidle0', timeout: 30000 });
    // SEO.jsx sets title/meta/robots/canonical/OG/JSON-LD together in one
    // effect; the canonical link's presence is a reliable proxy that the
    // whole effect has committed. Hard-fail if it never appears — that
    // means the route shipped as empty as it would have without this
    // script, and we'd rather break the build than ship that silently.
    await page.waitForSelector('link[rel="canonical"]', { timeout: 10000 });
    // useReveal.js already has a 4s failsafe for exactly this case (headless
    // capture that never scrolls). Best-effort only: a miss here just means
    // a slightly longer flash before CSR re-triggers the real reveal, not
    // missing content, so don't fail the build over it.
    await page
      .waitForFunction(
        () => !document.querySelector('.reveal-armed [data-reveal]:not(.is-visible)'),
        { timeout: 6000 }
      )
      .catch(() => {
        console.warn(`prerender: ${route} — reveal items may still be hidden in the snapshot`);
      });
    return await page.evaluate(() => document.documentElement.outerHTML);
  } finally {
    await page.close();
  }
}

function outputPathFor(route) {
  if (route === '/') return path.join(distDir, 'index.html');
  return path.join(distDir, ...route.split('/').filter(Boolean), 'index.html');
}

async function main() {
  if (!existsSync(distDir)) {
    console.error('prerender: dist/ not found — run `vite build` first');
    process.exit(1);
  }

  const server = await startServer();
  const { port } = server.address();
  const baseUrl = `http://127.0.0.1:${port}`;
  const browser = await launchBrowser();

  try {
    for (const route of ROUTES) {
      process.stdout.write(`prerender: ${route} ... `);
      const html = await snapshotRoute(browser, baseUrl, route);
      const outPath = outputPathFor(route);
      await mkdir(path.dirname(outPath), { recursive: true });
      await writeFile(outPath, html, 'utf-8');
      console.log(`ok (${path.relative(distDir, outPath)})`);
    }
    console.log(`prerender: done, ${ROUTES.length} routes snapshotted`);
  } finally {
    await browser.close();
    server.close();
  }
}

main().catch((err) => {
  console.error('prerender: failed —', err);
  process.exit(1);
});
