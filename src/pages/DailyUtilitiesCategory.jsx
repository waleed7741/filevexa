import SEO from '../components/SEO';
import ToolCard from '../components/ToolCard';

const UTILITY_TOOLS = [
  {
    title: 'QR Code Generator',
    desc: 'Create free, permanent QR codes online instantly. No signup required.',
    href: '/qr-code-generator',
    icon: '📱',
    type: 'utility',
  },
  {
    title: 'Word Counter',
    desc: 'Accurate online tool to count words, characters, sentences, and paragraphs.',
    href: '/word-counter',
    icon: '🔤',
    type: 'utility',
  },
  {
    title: 'Password Generator',
    desc: 'Generate strong, secure, random passwords directly in your browser.',
    href: '/password-generator',
    icon: '🔐',
    type: 'utility',
  },
];

export default function DailyUtilitiesCategory() {
  return (
    <div className="tool-page">
      <SEO 
        title="Free Daily Utility Web Tools | FileVexa"
        description="Quick, private, and free everyday web tools including QR code generators, word counters, and password generators."
        canonical="https://filevexa.com/daily-utilities"
      />
      
      <div className="container">
        <nav className="breadcrumb" aria-label="Breadcrumb">
          <a href="/">Home</a>
          <span className="breadcrumb-sep">/</span>
          <span aria-current="page">Daily Utilities</span>
        </nav>

        <header className="tool-page-header" style={{ textAlign: 'center', marginBottom: '48px' }}>
          <h1>Daily Utility Tools</h1>
          <p style={{ margin: '0 auto' }}>Fast, reliable everyday web utilities running safely in your browser.</p>
        </header>

        <div className="tools-grid">
          {UTILITY_TOOLS.map((tool) => (
            <ToolCard key={tool.href} {...tool} />
          ))}
        </div>
      </div>
    </div>
  );
}
