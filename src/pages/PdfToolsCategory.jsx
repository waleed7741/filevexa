import SEO from '../components/SEO';
import ToolCard from '../components/ToolCard';

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
];

export default function PdfToolsCategory() {
  return (
    <div className="tool-page">
      <SEO
        title="Best Free PDF Tools | Modify, Extract & Convert | FileVexa"
        description="A complete suite of free, client-side PDF tools. Extract pages, remove pages, and convert PDFs securely in your browser."
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
          <p style={{ margin: '0 auto' }}>Modify, split, and convert your PDF documents completely securely on your own device.</p>
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
