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
import { TOOLS_SEO_DATA } from './src/config/toolsSEOData.js'
import {
  createFaqPageSchema,
  createWebApplicationSchema,
} from './src/utils/schemaGenerator.js'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const toAbsolute = (p) => path.resolve(__dirname, p)

// ─── 1. Route list ──────────────────────────────────────────────────────────
// Add every route you want pre-rendered as a static HTML page.
const staticRoutes = [
  '/',
  '/privacy',
  '/terms',
  '/contact',
  '/image-tools',
  '/pdf-tools',
  '/daily-utilities',
  '/text-tools',
  '/calculators',
]
const routes = [
  ...staticRoutes,
  ...Object.keys(TOOLS_SEO_DATA).map((slug) => `/${slug}`),
]

function escapeHtml(value) {
  return String(value)
    .replaceAll('&', '&amp;')
    .replaceAll('"', '&quot;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
}

function serializeJsonLd(value) {
  return JSON.stringify(value).replace(/</g, '\\u003c')
}

function setToolHead(html, tool) {
  const headMatch = html.match(/<head\b[^>]*>([\s\S]*?)<\/head>/i)
  if (!headMatch) {
    throw new Error(`Cannot prerender ${tool.slug}: HTML template has no <head>.`)
  }

  const head = headMatch[1]
    .replace(/<title\b[^>]*>[\s\S]*?<\/title>/gi, '')
    .replace(/<meta\b[^>]*>/gi, (tag) => {
      const name = tag.match(/\bname=["']([^"']+)["']/i)?.[1]?.toLowerCase()
      const property = tag.match(/\bproperty=["']([^"']+)["']/i)?.[1]?.toLowerCase()
      return name === 'description' ||
        name === 'keywords' ||
        name?.startsWith('twitter:') ||
        property?.startsWith('og:')
        ? ''
        : tag
    })
    .replace(/<link\b[^>]*>/gi, (tag) =>
      /\brel=["']canonical["']/i.test(tag) ? '' : tag
    )
    .replace(/<script\b(?=[^>]*\btype=["']application\/ld\+json["'])[^>]*>[\s\S]*?<\/script>/gi, '')

  const applicationSchema = createWebApplicationSchema({
    name: tool.name,
    description: tool.description,
    url: tool.url,
    applicationCategory: 'UtilityApplication',
    operatingSystem: 'All',
    price: '0',
    priceCurrency: 'USD',
  })
  const faqSchema = createFaqPageSchema(tool.faqs)
  const keywords = [
    tool.targetKeywords.primary,
    ...tool.targetKeywords.longTail,
  ].join(', ')
  const routeTags = [
    `<title>${escapeHtml(tool.title)}</title>`,
    `<meta name="description" content="${escapeHtml(tool.description)}" />`,
    `<meta name="keywords" content="${escapeHtml(keywords)}" />`,
    `<link rel="canonical" href="${escapeHtml(tool.url)}" />`,
    '<meta property="og:type" content="website" />',
    `<meta property="og:url" content="${escapeHtml(tool.url)}" />`,
    `<meta property="og:title" content="${escapeHtml(tool.title)}" />`,
    `<meta property="og:description" content="${escapeHtml(tool.description)}" />`,
    '<meta property="og:site_name" content="FileVexa" />',
    '<meta name="twitter:card" content="summary_large_image" />',
    `<meta name="twitter:url" content="${escapeHtml(tool.url)}" />`,
    `<meta name="twitter:title" content="${escapeHtml(tool.title)}" />`,
    `<meta name="twitter:description" content="${escapeHtml(tool.description)}" />`,
    `<script type="application/ld+json" id="tool-schema-jsonld">${serializeJsonLd(applicationSchema)}</script>`,
    `<script type="application/ld+json" id="tool-faq-schema-jsonld">${serializeJsonLd(faqSchema)}</script>`,
  ].join('\n    ')
  const updatedHead = `${head.trim()}\n    ${routeTags}\n  `
  const updatedHtml = html.replace(headMatch[0], `<head>${updatedHead}</head>`)

  return updatedHtml.replace(
    /<script\b(?=[^>]*\btype=["']application\/ld\+json["'])[^>]*>[\s\S]*?<\/script>/gi,
    (tag, offset) => offset < updatedHtml.indexOf('</head>') ? tag : ''
  )
}

// ─── 2. Load the production HTML template ───────────────────────────────────
const template = fs.readFileSync(toAbsolute('dist/index.html'), 'utf-8')
  .replace(/<title>[\s\S]*?<\/title>/i, '')
  .replace(/<meta\s+name="description"[\s\S]*?\/>/i, '')
  .replace(/<meta\s+property="og:(?:site_name|type|url|title|description)"[^>]*\/>/gi, '')
  .replace(/<meta\s+name="twitter:(?:card|url|title|description)"[^>]*\/>/gi, '')

// ─── 3. Load the SSR bundle compiled by `vite build --ssr` ──────────────────
// On Windows, Node's ESM loader requires a proper file:// URL for dynamic imports.
const serverEntryPath = toAbsolute('dist/server/entry-server.js')
const serverEntryUrl = new URL(`file:///${serverEntryPath.replace(/\\/g, '/')}`).href
const { render } = await import(serverEntryUrl)

// ─── 4. Render each route and write to disk ──────────────────────────────────
for (const route of routes) {
  console.log(`Pre-rendering: ${route}`)
  
  let { html: appHtml, head } = await render(route)

  let headTags = head || ''
  const routeHeadTags = appHtml.match(/<title\b[^>]*>[\s\S]*?<\/title>|<(?:meta|link)\b[^>]*\/?>/gi) || []
  if (routeHeadTags.length) {
    headTags += `\n    ${routeHeadTags.join('\n    ')}`
    appHtml = appHtml.replace(/<title\b[^>]*>[\s\S]*?<\/title>|<(?:meta|link)\b[^>]*\/?>/gi, '')
  }

  // Extract JSON-LD from the rendered body when React does not include it in the head context.
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
  const tool = TOOLS_SEO_DATA[route.replace(/^\//, '')]
  if (tool) output = setToolHead(output, tool)
  fs.writeFileSync(path.join(outDir, 'index.html'), output)
  console.log(`  ✓  Written → ${path.join(outDir, 'index.html')}`)
}

console.log('\n✅  Pre-rendering complete.')

const sitemapRoutes = [
  { route: '/', priority: '1.0' },
  ...['image-tools', 'pdf-tools', 'daily-utilities', 'text-tools', 'calculators']
    .map((slug) => ({ route: `/${slug}`, priority: '0.9' })),
  ...Object.keys(TOOLS_SEO_DATA).map((slug) => ({
    route: `/${slug}`,
    priority: slug === 'compress-pdf-to-200kb' ? '0.6' : '0.8',
  })),
]
const lastmod = new Date().toISOString().slice(0, 10)
const sitemap = [
  '<?xml version="1.0" encoding="UTF-8"?>',
  '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">',
  ...sitemapRoutes.flatMap(({ route, priority }) => [
    '  <url>',
    `    <loc>https://filevexa.pages.dev${route}</loc>`,
    `    <lastmod>${lastmod}</lastmod>`,
    '    <changefreq>weekly</changefreq>',
    `    <priority>${priority}</priority>`,
    '  </url>',
  ]),
  '</urlset>',
].join('\n')
fs.writeFileSync(toAbsolute('dist/sitemap.xml'), `${sitemap}\n`)
fs.writeFileSync(toAbsolute('public/sitemap.xml'), `${sitemap}\n`)
console.log('Generated dist/sitemap.xml and public/sitemap.xml from the configured routes.')
