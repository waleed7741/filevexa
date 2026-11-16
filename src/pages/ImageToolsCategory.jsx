import SEO from '../components/SEO';
import ToolCard from '../components/ToolCard';
import { getToolCards } from '../config/toolsSEOData'

const IMAGE_TOOLS = getToolCards('Image Tools')

export default function ImageToolsCategory() {
  return (
    <div className="tool-page">
      <SEO
        title="Free Online Image Conversion Tools | FileVexa"
        description="Convert HEIC, WebP, and AVIF images directly in your browser."
        canonical="https://filevexa.pages.dev/image-tools"
      />

      <div className="container">
        <nav className="breadcrumb" aria-label="Breadcrumb">
          <a href="/">Home</a>
          <span className="breadcrumb-sep">/</span>
          <span aria-current="page">Image Tools</span>
        </nav>

        <header className="tool-page-header" style={{ textAlign: 'center', marginBottom: '48px' }}>
          <h1>Free Online Image Tools</h1>
          <p style={{ margin: '0 auto' }}>
            Choose an image converter or size reducer. Each tool lists accepted formats, output behavior, and file limits before you start.
          </p>
        </header>

        <div className="tools-grid">
          {IMAGE_TOOLS.map((tool) => (
            <ToolCard key={tool.href} {...tool} />
          ))}
        </div>
      </div>
    </div>
  );
}
