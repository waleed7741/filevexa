/**
 * schemaGenerator.js
 * Utility to generate application and FAQ JSON-LD for static prerendered pages.
 */

/**
 * Creates a valid Schema.org WebApplication / SoftwareApplication structured data object.
 *
 * @param {Object} options
 * @param {string} options.name - The human-readable name of the tool
 * @param {string} options.description - Detailed description of what the tool does
 * @param {string} options.url - Canonical URL of the tool page
 * @param {string} [options.applicationCategory="UtilityApplication"] - Schema application category
 * @param {string} [options.operatingSystem="All"] - Supported operating systems
 * @param {string} [options.price="0"] - Price of using the tool
 * @param {string} [options.priceCurrency="USD"] - Currency code
 * @returns {Object} JSON-LD Schema object
 */
export function createWebApplicationSchema({
  name,
  description,
  url,
  applicationCategory = 'UtilityApplication',
  operatingSystem = 'All',
  price = '0',
  priceCurrency = 'USD',
}) {
  return {
    '@context': 'https://schema.org',
    '@type': ['SoftwareApplication', 'WebApplication'],
    name,
    url,
    description,
    applicationCategory,
    operatingSystem,
    offers: {
      '@type': 'Offer',
      price: String(price),
      priceCurrency,
    },
  };
}

export function createFaqPageSchema(faqs = []) {
  if (!faqs.length) return null

  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map(({ question, answer, q, a }) => ({
      '@type': 'Question',
      name: question || q,
      acceptedAnswer: {
        '@type': 'Answer',
        text: answer || a,
      },
    })),
  }
}
