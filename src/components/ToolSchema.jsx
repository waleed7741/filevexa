import { Helmet } from 'react-helmet-async';
import {
  createWebApplicationSchema,
  createFaqPageSchema,
  FAQ_SCHEMA_SCRIPT_ID,
  SCHEMA_SCRIPT_ID,
} from '../utils/schemaGenerator';

/**
 * ToolSchema Component
 *
 * Injects Schema.org WebApplication JSON-LD structured data into the HTML <head>.
 * - Replaces existing schema script tags on client-side route transitions (no duplicates).
 * - Fully compatible with SSR / SSG pre-rendering pipelines.
 *
 * @example
 * <ToolSchema
 *   name="HEIC to JPG Converter"
 *   description="Convert HEIC photos to JPG online for free."
 *   url="https://filevexa.pages.dev/heic-to-jpg"
 * />
 */
export default function ToolSchema({
  name,
  description,
  url,
  applicationCategory = 'UtilityApplication',
  operatingSystem = 'All',
  price = '0',
  priceCurrency = 'USD',
  schema: customSchema,
  faqs = [],
}) {
  const schema =
    customSchema ||
    createWebApplicationSchema({
      name,
      description,
      url,
      applicationCategory,
      operatingSystem,
      price,
      priceCurrency,
    });

  const faqSchema = createFaqPageSchema(faqs);

  return (
    <Helmet>
      <script
        type="application/ld+json"
        id={SCHEMA_SCRIPT_ID}
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schema).replace(/</g, '\\u003c') }}
      />
      {faqSchema && (
        <script
          type="application/ld+json"
          id={FAQ_SCHEMA_SCRIPT_ID}
          dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema).replace(/</g, '\\u003c') }}
        />
      )}
    </Helmet>
  );
}
