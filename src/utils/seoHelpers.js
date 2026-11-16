/**
 * seoHelpers.js
 * Utility to update document metadata on client-side route mount.
 */
import { TOOL_SITE_URL } from '../config/toolsSEOData.js'

export function setPageMeta({ title, description, keywords, canonical }) {
  const canonicalUrl = canonical ? new URL(canonical, `${TOOL_SITE_URL}/`) : null
  const canonicalPath = canonicalUrl
    ? canonicalUrl.pathname.replace(/\/+$/, '') || '/'
    : undefined
  const pageCanonical = canonicalPath
    ? `${TOOL_SITE_URL}${canonicalPath}`
    : undefined

  // Title
  document.title = title

  // Meta description
  let descEl = document.querySelector('meta[name="description"]')
  if (!descEl) {
    descEl = document.createElement('meta')
    descEl.name = 'description'
    document.head.appendChild(descEl)
  }
  descEl.setAttribute('content', description)

  let keywordsEl = document.querySelector('meta[name="keywords"]')
  if (keywordsEl && !keywords) keywordsEl.remove()
  if (keywords) {
    if (!keywordsEl) {
      keywordsEl = document.createElement('meta')
      keywordsEl.name = 'keywords'
      document.head.appendChild(keywordsEl)
    }
    keywordsEl.content = keywords
  }

  // OG title
  let ogTitle = document.querySelector('meta[property="og:title"]')
  if (ogTitle) ogTitle.setAttribute('content', title)

  // OG description
  let ogDesc = document.querySelector('meta[property="og:description"]')
  if (ogDesc) ogDesc.setAttribute('content', description)

  setMeta('property', 'og:url', pageCanonical)
  setMeta('property', 'og:type', 'website')

  // Twitter title
  let twTitle = document.querySelector('meta[name="twitter:title"]')
  if (twTitle) twTitle.setAttribute('content', title)

  // Twitter description
  let twDesc = document.querySelector('meta[name="twitter:description"]')
  if (twDesc) twDesc.setAttribute('content', description)
  setMeta('name', 'twitter:url', pageCanonical)
  setMeta('name', 'twitter:card', 'summary_large_image')

  // Canonical link
  if (pageCanonical) {
    let canonEl = document.querySelector('link[rel="canonical"]')
    if (!canonEl) {
      canonEl = document.createElement('link')
      canonEl.setAttribute('rel', 'canonical')
      document.head.appendChild(canonEl)
    }
    canonEl.setAttribute('href', pageCanonical)
  }

}

function setMeta(attribute, name, content) {
  let element = document.querySelector(`meta[${attribute}="${name}"]`)
  if (!content) {
    element?.remove()
    return
  }
  if (!element) {
    element = document.createElement('meta')
    element.setAttribute(attribute, name)
    document.head.appendChild(element)
  }
  element.setAttribute('content', content)
}
