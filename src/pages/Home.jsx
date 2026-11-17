import ToolCard from '../components/ToolCard'
import DailyUtilitiesSection from '../components/DailyUtilitiesSection'
import TextToolsSection from '../components/TextToolsSection'
import CalculatorsSection from '../components/CalculatorsSection'
import SEO from '../components/SEO'
import { getToolCards } from '../config/toolsSEOData'

const IMAGE_TOOLS = getToolCards('Image Tools').filter(
  (tool) => !['/compress-image-to-20kb', '/compress-image-to-50kb', '/compress-image-to-100kb'].includes(tool.href)
)
const PDF_TOOLS = getToolCards('PDF Tools')

export default function Home() {
  return (
    <>
      <SEO
        title="Free Online File Converters & Utilities | FileVexa"
        description="Convert images and PDFs in your browser with free online tools and no account required."
        canonical="https://filevexa.pages.dev/"
      />
      {/* Hero */}
      <section className="hero">
        <div className="container">
          <div className="hero-badge" aria-hidden="true">
            <span>🛠️</span> Free tools · No signup
          </div>
          <h1>Free Online File Tools</h1>
          <p>Convert images and work with PDFs, text, and everyday tasks using browser-based tools with clear input, output, and privacy details.</p>

          <div className="hero-features" role="list">
            {[
              'Most file tools process in your browser',
              'No account needed',
              'Limits vary by tool',
              'Works on any device',
            ].map((f) => (
              <div key={f} className="hero-feature" role="listitem">
                <div className="hero-feature-icon" aria-hidden="true">✓</div>
                {f}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Image Tools */}
      <section className="section" aria-labelledby="image-tools-heading">
        <div className="container">
          <div className="section-header">
            <h2 className="section-title" id="image-tools-heading">Image Tools</h2>
            <p className="section-subtitle">Convert images directly in your browser.</p>
          </div>
          <div className="tools-grid">
            {IMAGE_TOOLS.map((tool) => (
              <ToolCard key={tool.href} {...tool} />
            ))}
          </div>
        </div>
      </section>

      {/* PDF Tools */}
      <section className="section" style={{ background: 'var(--color-bg-subtle)', borderTop: '1px solid var(--color-border)', borderBottom: '1px solid var(--color-border)' }} aria-labelledby="pdf-tools-heading">
        <div className="container">
          <div className="section-header">
            <h2 className="section-title" id="pdf-tools-heading">PDF Tools</h2>
            <p className="section-subtitle">Work with PDF documents entirely in your browser.</p>
          </div>
          <div className="tools-grid">
            {PDF_TOOLS.map((tool) => (
              <ToolCard key={tool.href} {...tool} />
            ))}
          </div>
        </div>
      </section>

      {/* Daily Utilities */}
      <DailyUtilitiesSection />

      {/* Text Tools */}
      <TextToolsSection />

      {/* Calculators */}
      <CalculatorsSection />

      <section className="section" aria-labelledby="directories-heading">
        <div className="container">
          <h2 className="section-title" id="directories-heading">Browse every tool collection</h2>
          <p>Choose a directory to see the available tools and what each one does.</p>
          <div className="related-tools">
            {[
              ['Image tools', '/image-tools'],
              ['PDF tools', '/pdf-tools'],
              ['Daily utilities', '/daily-utilities'],
              ['Text tools', '/text-tools'],
              ['Calculators', '/calculators'],
            ].map(([label, href]) => (
              <a className="related-tool-link" href={href} key={href}>{label}</a>
            ))}
          </div>
        </div>
      </section>

      {/* Privacy callout */}
      <section className="section" aria-labelledby="privacy-heading">
        <div className="container" style={{ maxWidth: '700px', textAlign: 'center' }}>
          <div style={{ fontSize: '40px', marginBottom: '16px' }} aria-hidden="true">🔒</div>
          <h2 className="section-title" id="privacy-heading">Your Files Stay With You</h2>
          <p style={{ fontSize: '16px', color: 'var(--color-text-secondary)', lineHeight: '1.7', marginTop: '12px' }}>
            FileVexa processes images and PDFs directly in your browser. Files are not uploaded to a processing service.
          </p>
          <a href="/privacy" className="btn btn-secondary mt-6" style={{ display: 'inline-flex', marginTop: '24px' }}>
            Read our Privacy Policy
          </a>
        </div>
      </section>
    </>
  )
}
