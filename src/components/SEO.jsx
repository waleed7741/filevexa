import { Helmet } from 'react-helmet-async';
import {
  createPageSchema,
  createFaqPageSchema,
  FAQ_SCHEMA_SCRIPT_ID,
  SCHEMA_SCRIPT_ID,
} from '../utils/schemaGenerator';
import { useLocation } from 'react-router-dom';
import { TOOLS_SEO_DATA, TOOL_SITE_URL } from '../config/toolsSEOData';

export default function SEO({
  title,
  description,
  keywords,
  canonical,
  schema,
  toolSchema,
  faqs = [],
}) {
  const location = useLocation();
  const routePath = location.pathname === '/'
    ? '/'
    : location.pathname.replace(/\/+$/, '');
  const tool = TOOLS_SEO_DATA[routePath.replace(/^\//, '')];
  const pageTitle = tool?.title || title;
  const pageDescription = tool?.description || description;
  const pageCanonical = tool?.url || canonical || `${TOOL_SITE_URL}${routePath}`;
  const pageKeywords = tool
    ? [tool.targetKeywords.primary, ...tool.targetKeywords.longTail].join(', ')
    : keywords;
  const routeFaqs = faqs.length > 0
    ? faqs
    : tool?.faqs.map(({ q, a }) => ({ question: q, answer: a })) || [];

  const resolvedSchema = createPageSchema(
    tool
      ? {
          name: tool.name,
          description: pageDescription,
          url: pageCanonical,
          applicationCategory: tool.applicationCategory,
          operatingSystem: 'All',
          offers: { '@type': 'Offer', price: '0', priceCurrency: 'USD' },
        }
      : schema || (toolSchema ? { ...toolSchema, url: toolSchema.url || pageCanonical } : {
          name: pageTitle,
          description: pageDescription,
          url: pageCanonical,
        })
  );
  const faqSchema = createFaqPageSchema(routeFaqs);

  return (
    <Helmet>
      {/* Standard SEO */}
      <title>{pageTitle}</title>
      <meta name="description" content={pageDescription} />
      {pageKeywords && <meta name="keywords" content={pageKeywords} />}
      <link rel="canonical" href={pageCanonical} />

      {/* Open Graph / Facebook */}
      <meta property="og:type" content="website" />
      <meta property="og:url" content={pageCanonical} />
      <meta property="og:title" content={pageTitle} />
      <meta property="og:description" content={pageDescription} />
      <meta property="og:site_name" content="FileVexa" />

      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:url" content={pageCanonical} />
      <meta name="twitter:title" content={pageTitle} />
      <meta name="twitter:description" content={pageDescription} />

      {/* Structured Data (JSON-LD) */}
      {resolvedSchema && (
        <script
          type="application/ld+json"
          id={SCHEMA_SCRIPT_ID}
          dangerouslySetInnerHTML={{ __html: JSON.stringify(resolvedSchema).replace(/</g, '\\u003c') }}
        />
      )}
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
