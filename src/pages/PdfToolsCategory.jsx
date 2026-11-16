import SEO from '../components/SEO';
import ToolCard from '../components/ToolCard';
import { getToolCards } from '../config/toolsSEOData'

const PDF_TOOLS = getToolCards('PDF Tools')

export default function PdfToolsCategory() {
  return (
    <div className="tool-page">
      <SEO
        title="Best Free PDF Tools | Modify, Extract & Convert | FileVexa"
        description="Browse browser-based PDF page tools and text extraction. See accepted file sizes and OCR limits for each utility."
        canonical="https://filevexa.pages.dev/pdf-tools"
      />

      <div className="container">
        <nav className="breadcrumb" aria-label="Breadcrumb">
          <a href="/">Home</a>
          <span className="breadcrumb-sep">/</span>
          <span aria-current="page">PDF Tools</span>
        </nav>

        <header className="tool-page-header" style={{ textAlign: 'center', marginBottom: '48px' }}>
          <h1>Free Online PDF Tools</h1>
          <p style={{ margin: '0 auto' }}>
            Convert PDF pages, keep or remove selected pages, and extract embedded text. Processing happens in your browser; scanned documents need a separate OCR tool.
          </p>
        </header>

        <div className="tools-grid">
          {PDF_TOOLS.map((tool) => (
            <ToolCard key={tool.href} {...tool} />
          ))}
        </div>
      </div>
    </div>
  );
}
