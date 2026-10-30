import { useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import {
  createWebApplicationSchema,
  injectWebApplicationSchema,
  SCHEMA_SCRIPT_ID,
} from '../utils/schemaGenerator';

export default function SEO({
  title,
  description,
  keywords,
  canonical,
  schema,
  toolSchema,
}) {
  const siteUrl = 'https://filevexa.pages.dev';
  const url = canonical || siteUrl;

  const resolvedSchema =
    schema ||
    (toolSchema
      ? createWebApplicationSchema({
          ...toolSchema,
          url: toolSchema.url || url,
        })
      : null);

  useEffect(() => {
    if (resolvedSchema) {
      const cleanup = injectWebApplicationSchema(resolvedSchema);
      return cleanup;
    }
  }, [resolvedSchema]);

  return (
    <Helmet>
      {/* Standard SEO */}
      <title>{title}</title>
      <meta name="description" content={description} />
      {keywords && <meta name="keywords" content={keywords} />}
      <link rel="canonical" href={url} />

      {/* Open Graph / Facebook */}
      <meta property="og:type" content="website" />
      <meta property="og:url" content={url} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:site_name" content="FileVexa" />

      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:url" content={url} />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />

      {/* Structured Data (JSON-LD) */}
      {resolvedSchema && (
        <script
          type="application/ld+json"
          id={SCHEMA_SCRIPT_ID}
          dangerouslySetInnerHTML={{ __html: JSON.stringify(resolvedSchema) }}
        />
      )}
    </Helmet>
  );
}

