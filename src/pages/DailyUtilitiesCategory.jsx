import SEO from '../components/SEO';
import ToolCard from '../components/ToolCard';
import { getToolCards } from '../config/toolsSEOData'

const UTILITY_TOOLS = getToolCards('Daily Utilities')

export default function DailyUtilitiesCategory() {
  return (
    <div className="tool-page">
      <SEO
        title="Free Daily Utility Web Tools | FileVexa"
        description="Quick, private, and free everyday web tools including QR code generators, word counters, and password generators."
        canonical="https://filevexa.pages.dev/daily-utilities"
      />

      <div className="container">
        <nav className="breadcrumb" aria-label="Breadcrumb">
          <a href="/">Home</a>
          <span className="breadcrumb-sep">/</span>
          <span aria-current="page">Daily Utilities</span>
        </nav>

        <header className="tool-page-header" style={{ textAlign: 'center', marginBottom: '48px' }}>
          <h1>Daily Utility Tools</h1>
          <p style={{ margin: '0 auto' }}>
            Create a QR code from text, generate a password, or inspect a word and character count. Each utility runs in the page without an account.
          </p>
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
