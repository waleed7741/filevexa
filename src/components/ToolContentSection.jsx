import { useEffect } from 'react';
import FaqSection from './FaqSection';
import RelatedTools from './RelatedTools';
import { TOOL_SEO_DATA } from '../data/toolSEO';
import { recordRecentTool } from '../hooks/useRecentTools';

/**
 * ToolContentSection
 * Renders semantic 250-300 word "How To Use" guide, expandable FAQs, and related tools.
 * Also automatically records the visited tool into localStorage for the Recent Tools bar.
 *
 * @param {Object} props
 * @param {string} props.toolId - Key corresponding to TOOL_SEO_DATA (e.g. 'heic-to-jpg')
 * @param {Object} [props.customData] - Optional manual override
 */
export default function ToolContentSection({ toolId, customData }) {
  const data = customData || TOOL_SEO_DATA[toolId];

  // Record this tool visit into localStorage for Recent Tools
  useEffect(() => {
    if (data) {
      recordRecentTool({
        id: toolId,
        title: data.title,
        href: data.href,
        icon: data.icon,
        category: data.category?.name,
      });
    }
  }, [toolId, data]);

  if (!data) return null;

  return (
    <div className="tool-info" style={{ marginTop: '48px' }}>
      {/* 250-300 Word Comprehensive Guide */}
      <section className="info-section" aria-labelledby="how-to-heading">
        <h2 id="how-to-heading">{data.howTo.heading}</h2>
        <p style={{ marginTop: '14px', lineHeight: '1.7', color: 'var(--color-text-secondary)', fontSize: '15px' }}>
          {data.howTo.intro}
        </p>

        <h3 style={{ marginTop: '24px', marginBottom: '14px', fontSize: '1.15rem', fontWeight: 600 }}>
          Step-by-Step Instructions
        </h3>
        <ol style={{ paddingLeft: '22px', display: 'flex', flexDirection: 'column', gap: '12px', color: 'var(--color-text-secondary)', lineHeight: '1.6', fontSize: '15px' }}>
          {data.howTo.steps.map((step, idx) => (
            <li key={idx}>
              <strong style={{ color: 'var(--color-text)' }}>{step.title}:</strong> {step.description}
            </li>
          ))}
        </ol>

        {data.howTo.tips && (
          <div
            style={{
              marginTop: '24px',
              padding: '16px 20px',
              background: 'var(--color-bg-subtle)',
              borderRadius: 'var(--radius-md)',
              borderLeft: '4px solid var(--color-primary)',
            }}
          >
            <p style={{ margin: 0, fontSize: '14px', lineHeight: '1.65', color: 'var(--color-text-secondary)' }}>
              {data.howTo.tips}
            </p>
          </div>
        )}
      </section>

      {/* 3 Expandable Semantic FAQs */}
      <section className="info-section" aria-labelledby="faq-heading">
        <h2 id="faq-heading">Frequently Asked Questions</h2>
        <FaqSection items={data.faqs} />
      </section>

      {/* Internal Links: Related Tools */}
      {data.related && data.related.length > 0 && (
        <RelatedTools tools={data.related} />
      )}
    </div>
  );
}
