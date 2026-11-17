import FaqSection from './FaqSection'
import RelatedTools from './RelatedTools'
import SEO from './SEO'
import { TOOLS_SEO_DATA } from '../config/toolsSEOData'

export default function ToolPageLayout({
  toolId,
  children,
  sections = ['summary', 'steps', 'details', 'features', 'faqs', 'related'],
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
        <section className="quick-answer" aria-labelledby={`${tool.id}-quick-answer-heading`}>
          <h2 id={`${tool.id}-quick-answer-heading`}>Quick Answer</h2>
          <p>{tool.quickAnswer}</p>
        </section>

        <section className="info-section" aria-labelledby={`${tool.id}-comparison-heading`}>
          <h2 id={`${tool.id}-comparison-heading`}>Local Browser vs. Cloud Upload Tools</h2>
          <div className="tool-comparison-table-wrapper">
            <table className="tool-comparison-table">
              <caption>How FileVexa’s browser-based tools compare with typical cloud upload services</caption>
              <thead>
                <tr>
                  <th scope="col">Factor</th>
                  <th scope="col">FileVexa in your browser</th>
                  <th scope="col">Cloud upload tools</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <th scope="row">Privacy / file upload</th>
                  <td>Supported file processing stays on your device; files are not uploaded for conversion.</td>
                  <td>Files are uploaded to the provider for remote processing.</td>
                </tr>
                <tr>
                  <th scope="row">Speed</th>
                  <td>Runs locally; processing speed depends on your device and file.</td>
                  <td>Depends on upload speed, network, and provider processing.</td>
                </tr>
                <tr>
                  <th scope="row">Account requirement</th>
                  <td>No account required.</td>
                  <td>Varies by provider.</td>
                </tr>
                <tr>
                  <th scope="row">Cost</th>
                  <td>Free to use.</td>
                  <td>Varies by provider and plan.</td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>

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

        {includes('details') && tool.details && (
          <section className="info-section" aria-labelledby={`${tool.id}-details-heading`}>
            <h2 id={`${tool.id}-details-heading`}>Formats, limits, and practical notes</h2>
            <dl>
              <dt><strong>Input</strong></dt>
              <dd>{tool.details.inputs}</dd>
              <dt><strong>Output</strong></dt>
              <dd>{tool.details.outputs}</dd>
              <dt><strong>Limits</strong></dt>
              <dd>{tool.details.limits}</dd>
            </dl>
            <p>{tool.details.notes}</p>
            <p>
              Processing runs in your browser. Performance and file capacity depend on the browser and device;
              keep your original file until you have checked the downloaded result.
            </p>
          </section>
        )}

        {includes('features') && (
          <section className="info-section" aria-labelledby={`${tool.id}-features-heading`}>
            <h2 id={`${tool.id}-features-heading`}>What {tool.name} provides</h2>
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
