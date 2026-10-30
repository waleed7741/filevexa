/**
 * prerender.js
 * 
 * Build-time SSG script. Run after `vite build` to generate a static
 * pre-rendered HTML shell for every route in this array.
 * 
 * It:
 *  1. Builds the SSR bundle (entry-server.jsx) with `vite build --ssr`
 *  2. Renders each route to a string using React's renderToString
 *  3. Injects the Helmet head tags into the <head> and the rendered HTML into <div id="root">
 *  4. Writes each result to dist/<route>/index.html (Cloudflare Pages / most static hosts expect this)
 * 
 * Usage:  node prerender.js
 * Or via npm script: "prerender": "node prerender.js"
 */

import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const toAbsolute = (p) => path.resolve(__dirname, p)

// ─── 1. Route list ──────────────────────────────────────────────────────────
// Add every route you want pre-rendered as a static HTML page.
const routes = [
  '/',
  '/heic-to-jpg',
  '/webp-to-jpg',
  '/webp-to-png',
  '/heic-to-png',
  '/avif-to-jpg',
  '/pdf-to-png',
  '/remove-pdf-pages',
  '/extract-pdf-pages',
  '/pdf-to-text',
  '/pdf-to-markdown',
  '/privacy',
  '/terms',
  '/contact',
  '/qr-code-generator',
  '/word-counter',
  '/password-generator',
  '/text-case-converter',
  '/lorem-ipsum-generator',
  '/age-calculator',
  '/percentage-calculator',
  '/image-tools',
  '/pdf-tools',
  '/daily-utilities',
  '/text-tools',
  '/calculators',
]

// ─── 2. Load the production HTML template ───────────────────────────────────
const template = fs.readFileSync(toAbsolute('dist/index.html'), 'utf-8')

// ─── 3. Load the SSR bundle compiled by `vite build --ssr` ──────────────────
// On Windows, Node's ESM loader requires a proper file:// URL for dynamic imports.
const serverEntryPath = toAbsolute('dist/server/entry-server.js')
const serverEntryUrl = new URL(`file:///${serverEntryPath.replace(/\\/g, '/')}`).href
const { render } = await import(serverEntryUrl)

// ─── 4. Render each route and write to disk ──────────────────────────────────
for (const route of routes) {
  console.log(`Pre-rendering: ${route}`)
  
  let { html: appHtml, head } = await render(route)

  // Extract JSON-LD script from appHtml and ensure it is placed directly into <head>
  let headTags = head || ''
  const jsonLdMatch = appHtml.match(/<script\s+type=["']application\/ld\+json["'][^>]*>[\s\S]*?<\/script>/i)
  if (jsonLdMatch) {
    if (!headTags.includes('application/ld+json')) {
      headTags += `\n    ${jsonLdMatch[0]}`
    }
    // Remove the script from the body HTML to keep HTML clean
    appHtml = appHtml.replace(jsonLdMatch[0], '')
  }

  // Inject rendered <head> tags into <head>
  let output = template.replace('</head>', `  ${headTags}\n  </head>`)
  
  // Inject the rendered HTML body into the root div
  output = output.replace('<div id="root"></div>', `<div id="root">${appHtml}</div>`)

  // Determine output file path
  // "/" → dist/index.html
  // "/pdf-to-png" → dist/pdf-to-png/index.html  (works with Cloudflare Pages)
  const outDir = route === '/'
    ? toAbsolute('dist')
    : toAbsolute(`dist${route}`)

  fs.mkdirSync(outDir, { recursive: true })
  fs.writeFileSync(path.join(outDir, 'index.html'), output)
  console.log(`  ✓  Written → ${path.join(outDir, 'index.html')}`)
}

console.log('\n✅  Pre-rendering complete.')
