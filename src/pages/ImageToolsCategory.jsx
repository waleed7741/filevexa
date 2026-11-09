import SEO from '../components/SEO';
import ToolCard from '../components/ToolCard';

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
];

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
          <p style={{ margin: '0 auto' }}>Convert images directly in your browser.</p>
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
