/**
 * schemaGenerator.js
 * Utility to generate and inject application and FAQ JSON-LD schema markup
 * into document.head for FileVexa browser-based tools.
 */

export const SCHEMA_SCRIPT_ID = 'tool-schema-jsonld';
export const FAQ_SCHEMA_SCRIPT_ID = 'tool-faq-schema-jsonld';

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

export function createPageSchema(application = {}) {
  return application && application['@context']
    ? {
        ...application,
        '@type': ['SoftwareApplication', 'WebApplication'],
        applicationCategory: application.applicationCategory || 'UtilityApplication',
        operatingSystem: application.operatingSystem || 'All',
        offers: application.offers || {
          '@type': 'Offer',
          price: '0',
          priceCurrency: 'USD',
        },
      }
    : createWebApplicationSchema(application)
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

/**
 * Injects or updates the WebApplication JSON-LD <script> inside document.head.
 * Replaces any existing script with the same ID so duplicate tags are avoided on route change.
 *
 * @param {Object} schemaOrOptions - Either an already generated schema object or config options
 * @returns {Function} Cleanup function to safely remove or reset the script tag
 */
export function injectWebApplicationSchema(schemaOrOptions) {
  if (typeof document === 'undefined') {
    return () => {};
  }

  const schema =
    schemaOrOptions && schemaOrOptions['@context']
      ? schemaOrOptions
      : createWebApplicationSchema(schemaOrOptions);

  let scriptEl = document.head.querySelector(`script#${SCHEMA_SCRIPT_ID}`);

  if (!scriptEl) {
    scriptEl = document.createElement('script');
    scriptEl.id = SCHEMA_SCRIPT_ID;
    scriptEl.type = 'application/ld+json';
    document.head.appendChild(scriptEl);
  }

  scriptEl.textContent = JSON.stringify(schema, null, 2);

  // Return cleanup function to remove tag if transitioning to a page without schema
  return () => {
    const el = document.head.querySelector(`script#${SCHEMA_SCRIPT_ID}`);
    if (el) {
      el.remove();
    }
  };
}

export function injectFaqPageSchema(faqs) {
  if (typeof document === 'undefined') return () => {}

  const faqSchema = createFaqPageSchema(faqs)
  let scriptEl = document.head.querySelector(`script#${FAQ_SCHEMA_SCRIPT_ID}`)

  if (!faqSchema) {
    scriptEl?.remove()
    return () => {}
  }

  if (!scriptEl) {
    scriptEl = document.createElement('script')
    scriptEl.id = FAQ_SCHEMA_SCRIPT_ID
    scriptEl.type = 'application/ld+json'
    document.head.appendChild(scriptEl)
  }

  scriptEl.textContent = JSON.stringify(faqSchema)
  return () => document.head.querySelector(`script#${FAQ_SCHEMA_SCRIPT_ID}`)?.remove()
}
