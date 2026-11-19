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
 *  4. Writes non-root routes to flat dist/<route>.html files for clean URLs
 * 
 * Usage:  node prerender.js
 * Or via npm script: "prerender": "node prerender.js"
 */

import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import { TOOLS_SEO_DATA, TOOL_SITE_URL } from './src/config/toolsSEOData.js'
import {
  createBreadcrumbListSchema,
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
  ...new Set([
    ...staticRoutes,
    ...Object.keys(TOOLS_SEO_DATA).map((slug) => `/${slug}`),
  ]),
]

function setRouteCanonical(html, route) {
  const headMatch = html.match(/<head\b[^>]*>([\s\S]*?)<\/head>/i)
  if (!headMatch) {
    throw new Error(`Cannot prerender ${route}: HTML template has no <head>.`)
  }

  const routePath = route === '/' ? '/' : route.replace(/\/+$/, '')
  const canonical = `${TOOL_SITE_URL}${routePath}`
  const head = headMatch[1]
    .replace(/<link\b[^>]*\brel=["']canonical["'][^>]*\/?>/gi, '')
    .replace(/<meta\b[^>]*\bproperty=["']og:url["'][^>]*\/?>/gi, '')
    .replace(/<meta\b[^>]*\bname=["']twitter:url["'][^>]*\/?>/gi, '')
  const canonicalTags = [
    `<link rel="canonical" href="${escapeHtml(canonical)}" />`,
    `<meta property="og:url" content="${escapeHtml(canonical)}" />`,
    `<meta name="twitter:url" content="${escapeHtml(canonical)}" />`,
  ].join('\n    ')

  return html.replace(headMatch[0], `<head>${head.trim()}\n    ${canonicalTags}\n  </head>`)
}

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
  if (!faqSchema) {
    throw new Error(`Cannot prerender ${tool.slug}: tool page has no FAQ data for its FAQPage schema.`)
  }
  const breadcrumbSchema = createBreadcrumbListSchema(tool)
  const keywords = tool.keywords || [
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
    `<script type="application/ld+json" id="tool-breadcrumb-schema-jsonld">${serializeJsonLd(breadcrumbSchema)}</script>`,
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

  const tool = TOOLS_SEO_DATA[route.replace(/^\//, '')]
  if (tool) output = setToolHead(output, tool)
  output = setRouteCanonical(output, route)

  // Keep the root entry point, but use flat files for all other clean URLs.
  const outFile = route === '/'
    ? toAbsolute('dist/index.html')
    : toAbsolute(`dist${route}.html`)
  const cleanOutput = output
    .replace(/[ \t]+(?=\r?$)/gm, '')
    .replace(/\r\n?/g, '\n')
    .replace(/\n/g, '\r\n')
  fs.writeFileSync(outFile, cleanOutput)
  console.log(`  ✓  Written → ${outFile}`)
}

console.log('\n✅  Pre-rendering complete.')

const sitemapRoutes = [
  { route: '/', priority: '1.0' },
  ...staticRoutes
    .filter((route) => route !== '/')
    .map((route) => ({
      route,
      priority: ['/image-tools', '/pdf-tools', '/daily-utilities', '/text-tools', '/calculators'].includes(route)
        ? '0.9'
        : '0.6',
    })),
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

const llmsRouteLines = [
  '- [Compress Image to KB](/compress-image-to-kb): Set a custom target or use 20KB, 50KB, and 100KB presets in a private browser-based image compressor.',
  '- [Compress Image to 20KB](/compress-image-to-20kb): Compress photos for PPSC, exam, passport, and government forms with a 20KB target.',
  '- [Compress Image to 50KB](/compress-image-to-50kb): Compress photos for university and job portal applications with a 50KB target.',
  '- [Compress Image to 100KB](/compress-image-to-100kb): Compress ID card, resume, and web upload images with a 100KB target.',
  '- [Exam Photo & Signature Resizer](/exam-photo-signature-resizer): Resize application photos and signatures to exact pixels in your browser.',
]
const pdfToolRouteLines = [
  '- [Merge PDF](/merge-pdf): Merge and reorder unencrypted PDF documents locally in your browser.',
  '- [JPG to PDF](/jpg-to-pdf): Convert and arrange JPG, JPEG, or PNG images into a PDF in your browser.',
  '- [Redact PDF or Image](/redact-pdf-image): Cover sensitive details locally and export a flattened image or multi-page PDF.',
]
const publicLlmsPath = toAbsolute('public/llms.txt')
const publicLlms = fs.readFileSync(publicLlmsPath, 'utf-8')
let updatedLlms = publicLlms.replace(
  /^- \[[^\]]+\]\(\/(?:compress-image-to-(?:kb|20kb|50kb|100kb)|exam-photo-signature-resizer|merge-pdf|jpg-to-pdf|redact-pdf-image)\):.*(?:\r?\n|$)/gm,
  ''
)
if (/## Image tools[^\r\n]*\r?\n/i.test(updatedLlms)) {
  updatedLlms = updatedLlms.replace(
    /(## Image tools[^\r\n]*\r?\n)/i,
    `$1${llmsRouteLines.join('\n')}\n`
  )
} else {
  updatedLlms = `${updatedLlms.trimEnd()}\n\n## Image tools\n${llmsRouteLines.join('\n')}\n`
}
updatedLlms = updatedLlms.replace(
  /(## PDF tools[^\r\n]*\r?\n)/i,
  `$1${pdfToolRouteLines.join('\n')}\n`
)
fs.writeFileSync(publicLlmsPath, updatedLlms)
fs.writeFileSync(toAbsolute('dist/llms.txt'), updatedLlms)
console.log('Updated public/llms.txt and generated dist/llms.txt.')
