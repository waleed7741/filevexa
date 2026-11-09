import { Helmet } from 'react-helmet-async';
import { useLocation } from 'react-router-dom';
import { TOOLS_SEO_DATA, TOOL_SITE_URL } from '../config/toolsSEOData';

export default function SEO({
  title,
  description,
  keywords,
  canonical,
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

    </Helmet>
  );
}
