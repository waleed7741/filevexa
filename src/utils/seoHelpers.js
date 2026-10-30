import {
  injectWebApplicationSchema,
  createWebApplicationSchema,
  SCHEMA_SCRIPT_ID,
} from './schemaGenerator'

/**
 * seoHelpers.js
 * Utility to update document <title>, <meta description>, canonical, Open Graph tags,
 * and JSON-LD structured data on client-side route mount.
 */

export function setPageMeta({ title, description, canonical, schema, toolSchema }) {
  // Title
  document.title = title

  // Meta description
  let descEl = document.querySelector('meta[name="description"]')
  if (descEl) descEl.setAttribute('content', description)

  // OG title
  let ogTitle = document.querySelector('meta[property="og:title"]')
  if (ogTitle) ogTitle.setAttribute('content', title)

  // OG description
  let ogDesc = document.querySelector('meta[property="og:description"]')
  if (ogDesc) ogDesc.setAttribute('content', description)

  // OG url
  if (canonical) {
    let ogUrl = document.querySelector('meta[property="og:url"]')
    if (ogUrl) ogUrl.setAttribute('content', canonical)
  }

  // Twitter title
  let twTitle = document.querySelector('meta[name="twitter:title"]')
  if (twTitle) twTitle.setAttribute('content', title)

  // Twitter description
  let twDesc = document.querySelector('meta[name="twitter:description"]')
  if (twDesc) twDesc.setAttribute('content', description)

  // Canonical link
  if (canonical) {
    let canonEl = document.querySelector('link[rel="canonical"]')
    if (!canonEl) {
      canonEl = document.createElement('link')
      canonEl.setAttribute('rel', 'canonical')
      document.head.appendChild(canonEl)
    }
    canonEl.setAttribute('href', canonical)
  }

  // Structured Data (JSON-LD)
  const resolvedSchema =
    schema ||
    (toolSchema
      ? createWebApplicationSchema({
          ...toolSchema,
          url: toolSchema.url || canonical,
        })
      : null)

  if (resolvedSchema) {
    injectWebApplicationSchema(resolvedSchema)
  } else {
    // If navigating to a page without a tool schema, remove previous tool schema
    const existing = document.head.querySelector(`script#${SCHEMA_SCRIPT_ID}`)
    if (existing) {
      existing.remove()
    }
  }
}

