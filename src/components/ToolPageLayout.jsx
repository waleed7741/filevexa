import FaqSection from './FaqSection'
import RelatedTools from './RelatedTools'
import SEO from './SEO'
import { TOOLS_SEO_DATA } from '../config/toolsSEOData'

export default function ToolPageLayout({
  toolId,
  children,
  sections = ['summary', 'steps', 'features', 'faqs', 'related'],
  containerClassName = 'container tool-seo-content',
  includeSEO = true,
}) {
  const tool = TOOLS_SEO_DATA[toolId]
  if (!tool) return children || null

  const includes = (section) => sections.includes(section)

  return (
    <>
      {includeSEO && (
        <SEO
          title={tool.title}
          description={tool.description}
          canonical={tool.url}
          keywords={[tool.targetKeywords.primary, ...tool.targetKeywords.longTail].join(', ')}
        />
      )}
      {children}
      <div className={containerClassName}>
        {includes('summary') && (
          <section className="tool-summary" aria-labelledby={`${tool.id}-summary-heading`}>
            <h2 id={`${tool.id}-summary-heading`}>Tool Summary &amp; Specifications</h2>
            <p>{tool.entitySummary}</p>
            <ul className="tool-specifications">
              <li><strong>Processing Location:</strong> {tool.processingLocation}</li>
              <li><strong>Data Privacy:</strong> Zero Server Uploads</li>
              <li><strong>Cost:</strong> 100% Free</li>
              <li><strong>Account Required:</strong> None</li>
            </ul>
          </section>
        )}

        {includes('steps') && (
          <section className="info-section" aria-labelledby={`${tool.id}-steps-heading`}>
            <h2 id={`${tool.id}-steps-heading`}>
              How to {tool.howToAction} online in 3 Simple Steps
            </h2>
            {tool.howToIntro && <p>{tool.howToIntro}</p>}
            <ol>
              {tool.howToSteps.map((step, index) => <li key={`${tool.id}-step-${index}`}>{step}</li>)}
            </ol>
            {tool.howToTips && <p><strong>Tip:</strong> {tool.howToTips}</p>}
          </section>
        )}

        {includes('features') && (
          <section className="info-section" aria-labelledby={`${tool.id}-features-heading`}>
            <h2 id={`${tool.id}-features-heading`}>Why Use FileVexa Client-Side {tool.name}?</h2>
            <ul className="tool-feature-grid">
              {tool.features.map((feature) => <li key={feature}>{feature}</li>)}
            </ul>
          </section>
        )}

        {includes('faqs') && tool.faqs.length > 0 && (
          <section className="info-section" aria-labelledby={`${tool.id}-faq-heading`}>
            <h2 id={`${tool.id}-faq-heading`}>Frequently Asked Questions</h2>
            <FaqSection items={tool.faqs.map(({ q, a }) => ({ question: q, answer: a }))} />
          </section>
        )}

        {includes('related') && <RelatedTools tools={tool.relatedTools} />}
      </div>
    </>
  )
}
