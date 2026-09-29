import { useEffect } from 'react'
import ToolCard from '../components/ToolCard'
import DailyUtilitiesSection from '../components/DailyUtilitiesSection'
import TextToolsSection from '../components/TextToolsSection'
import CalculatorsSection from '../components/CalculatorsSection'
import { setPageMeta } from '../utils/seoHelpers'

const IMAGE_TOOLS = [
  {
    title: 'HEIC to JPG',
    desc: 'Convert Apple HEIC/HEIF images to JPG — works directly in your browser.',
    href: '/heic-to-jpg',
    icon: '🖼️',
    type: 'image',
  },
  {
    title: 'WebP to JPG',
    desc: 'Convert WebP images to JPG format. Transparent areas are given a white background.',
    href: '/webp-to-jpg',
    icon: '🔄',
    type: 'image',
  },
  {
    title: 'WebP to PNG',
    desc: 'Convert WebP images to PNG, preserving transparency where possible.',
    href: '/webp-to-png',
    icon: '🏞️',
    type: 'image',
  },
  {
    title: 'HEIC to PNG',
    desc: 'Convert HEIC/HEIF images from iPhone or Mac to PNG format.',
    href: '/heic-to-png',
    icon: '📸',
    type: 'image',
  },
  {
    title: 'AVIF to JPG',
    desc: 'Convert AVIF images to JPG using your browser\'s native image support.',
    href: '/avif-to-jpg',
    icon: '🎨',
    type: 'image',
  },
]

const PDF_TOOLS = [
  {
    title: 'PDF to PNG',
    desc: 'Convert PDF pages to PNG images. Download pages individually or as a ZIP.',
    href: '/pdf-to-png',
    icon: '📄',
    type: 'pdf',
  },
  {
    title: 'Remove PDF Pages',
    desc: 'Upload a PDF, select which pages to remove, and download a clean copy.',
    href: '/remove-pdf-pages',
    icon: '🗑️',
    type: 'pdf',
  },
  {
    title: 'Extract PDF Pages',
    desc: 'Pull out specific pages from a PDF and save them as a new document.',
    href: '/extract-pdf-pages',
    icon: '✂️',
    type: 'pdf',
  },
  {
    title: 'PDF to Text',
    desc: 'Extract plain text from text-based PDF files. Copy or download the result.',
    href: '/pdf-to-text',
    icon: '📝',
    type: 'pdf',
  },
  {
    title: 'PDF to Markdown',
    desc: 'Convert text-based PDFs to Markdown format for easier editing.',
    href: '/pdf-to-markdown',
    icon: '⬇️',
    type: 'pdf',
  },
]

export default function Home() {
  useEffect(() => {
    setPageMeta({
      title: 'FileVexa – Free Online File Converter',
      description:
        'Free online file conversion tools. Convert HEIC, WebP, AVIF images and PDF files directly in your browser. No signup required.',
      canonical: 'https://filevexa.com/',
    })
  }, [])

  return (
    <>
      {/* Hero */}
      <section className="hero">
        <div className="container">
          <div className="hero-badge" aria-hidden="true">
            <span>🔒</span> No uploads · No signup · 100% free
          </div>
          <h1>Free Online File Tools</h1>
          <p>Convert and manage your files quickly, easily and privately.</p>

          <div className="hero-features" role="list">
            {[
              'Files stay in your browser',
              'No account needed',
              'No file size limits beyond browser memory',
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
            <p className="section-subtitle">Convert image files directly in your browser — no upload required.</p>
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

      {/* Privacy callout */}
      <section className="section" aria-labelledby="privacy-heading">
        <div className="container" style={{ maxWidth: '700px', textAlign: 'center' }}>
          <div style={{ fontSize: '40px', marginBottom: '16px' }} aria-hidden="true">🔒</div>
          <h2 className="section-title" id="privacy-heading">Your Files Stay With You</h2>
          <p style={{ fontSize: '16px', color: 'var(--color-text-secondary)', lineHeight: '1.7', marginTop: '12px' }}>
            FileVexa processes all files directly inside your web browser using JavaScript.
            Your files are <strong>never uploaded to any server</strong>.
            We don't store, read, or transmit your files anywhere.
          </p>
          <a href="/privacy" className="btn btn-secondary mt-6" style={{ display: 'inline-flex', marginTop: '24px' }}>
            Read our Privacy Policy
          </a>
        </div>
      </section>
    </>
  )
}
