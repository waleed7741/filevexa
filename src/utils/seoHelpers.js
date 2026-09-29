/**
 * seoHelpers.js
 * Utility to update document <title>, <meta description>, canonical and Open Graph tags
 * Used on each page's mount to provide per-page SEO without a heavy library
 */

export function setPageMeta({ title, description, canonical }) {
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
}
