import SEO from '../components/SEO';
import ToolCard from '../components/ToolCard';

const TEXT_TOOLS = [
  {
    title: 'Text Case Converter',
    desc: 'Easily convert text to UPPERCASE, lowercase, Title Case, or Sentence case.',
    href: '/text-case-converter',
    icon: 'Aa',
    type: 'text',
  },
  {
    title: 'Lorem Ipsum Generator',
    desc: 'Generate customized Lorem Ipsum placeholder text instantly.',
    href: '/lorem-ipsum-generator',
    icon: '¶',
    type: 'text',
  }
];

export default function TextToolsCategory() {
  return (
    <div className="tool-page">
      <SEO 
        title="Free Online Text Formatting & Generation Tools | FileVexa"
        description="Format text, convert casing, and generate dummy placeholder text completely offline in your browser."
        canonical="https://filevexa.com/text-tools"
      />
      
      <div className="container">
        <nav className="breadcrumb" aria-label="Breadcrumb">
          <a href="/">Home</a>
          <span className="breadcrumb-sep">/</span>
          <span aria-current="page">Text Tools</span>
        </nav>

        <header className="tool-page-header" style={{ textAlign: 'center', marginBottom: '48px' }}>
          <h1>Text & Formatting Tools</h1>
          <p style={{ margin: '0 auto' }}>Format and generate text instantly in your browser.</p>
        </header>

        <div className="tools-grid">
          {TEXT_TOOLS.map((tool) => (
            <ToolCard key={tool.href} {...tool} />
          ))}
        </div>
      </div>
    </div>
  );
}
