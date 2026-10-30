/**
 * schemaGenerator.js
 * Utility to generate and inject WebApplication JSON-LD schema markup
 * into document.head for FileVexa browser-based tools.
 */

export const SCHEMA_SCRIPT_ID = 'tool-schema-jsonld';

/**
 * Creates a valid Schema.org WebApplication / SoftwareApplication structured data object.
 *
 * @param {Object} options
 * @param {string} options.name - The human-readable name of the tool
 * @param {string} options.description - Detailed description of what the tool does
 * @param {string} options.url - Canonical URL of the tool page
 * @param {string} [options.applicationCategory="UtilitiesApplication"] - Schema application category
 * @param {string} [options.operatingSystem="All"] - Supported operating systems
 * @param {string} [options.price="0"] - Price of using the tool
 * @param {string} [options.priceCurrency="USD"] - Currency code
 * @returns {Object} JSON-LD Schema object
 */
export function createWebApplicationSchema({
  name,
  description,
  url,
  applicationCategory = 'UtilitiesApplication',
  operatingSystem = 'All',
  price = '0',
  priceCurrency = 'USD',
}) {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebApplication',
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
