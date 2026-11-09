import { useState } from 'react';
import SEO from '../components/SEO';
import RelatedTools from '../components/RelatedTools';
import FaqSection from '../components/FaqSection';
import ToolPageLayout from '../components/ToolPageLayout';
import { getToolFaqItems } from '../config/toolsSEOData';

export default function TextCaseConverter() {
  const [text, setText] = useState('');

  const toUpperCase = () => setText(text.toUpperCase());
  const toLowerCase = () => setText(text.toLowerCase());
  const toTitleCase = () => setText(
    text.toLowerCase().split(' ').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ')
  );
  const toSentenceCase = () => setText(
    text.toLowerCase().replace(/(^\s*\w|[\.\!\?]\s*\w)/g, c => c.toUpperCase())
  );

  const copyToClipboard = () => {
    navigator.clipboard.writeText(text);
    alert('Copied to clipboard!');
  };

  return (
    <div className="tool-page">
      <SEO
        title="Free Text Case Converter | UPPERCASE, lowercase, Title Case"
        description="Easily convert text to UPPERCASE, lowercase, Title Case, or Sentence case. A free, online client-side text formatting tool."
        canonical="https://filevexa.pages.dev/text-case-converter"
      />
      <div className="container" style={{ maxWidth: '800px' }}>
        <nav className="breadcrumb" aria-label="Breadcrumb">
          <a href="/">Home</a>
          <span className="breadcrumb-sep">/</span>
          <span aria-current="page">Text Case Converter</span>
        </nav>

        <header className="tool-page-header">
          <h1>Free Online Text Case Converter</h1>
          <p>Instantly convert your text to UPPERCASE, lowercase, Title Case, or Sentence case right in your browser.</p>
        </header>

        <div style={{ background: 'var(--color-bg)', padding: '24px', borderRadius: 'var(--radius-lg)', border: '1px solid var(--color-border)', marginBottom: '40px' }}>
          <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap', marginBottom: '16px' }}>
            <button className="btn btn-secondary" onClick={toUpperCase}>UPPERCASE</button>
            <button className="btn btn-secondary" onClick={toLowerCase}>lowercase</button>
            <button className="btn btn-secondary" onClick={toTitleCase}>Title Case</button>
            <button className="btn btn-secondary" onClick={toSentenceCase}>Sentence case</button>
          </div>

          <textarea
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder="Type or paste your text here..."
            style={{ width: '100%', minHeight: '300px', padding: '16px', borderRadius: 'var(--radius-md)', border: '1px solid var(--color-border)', fontSize: '16px', resize: 'vertical' }}
          />

          <div style={{ marginTop: '16px', display: 'flex', justifyContent: 'space-between' }}>
            <span style={{ color: 'var(--color-text-muted)', fontSize: '14px' }}>
              Character Count: {text.length}
            </span>
            <button className="btn btn-primary" onClick={copyToClipboard}>Copy to Clipboard</button>
          </div>
        </div>

        <ToolPageLayout toolId="text-case-converter" sections={['steps']} containerClassName="tool-seo-content" includeSEO={false} />

        <section>
          <h2>Frequently Asked Questions</h2>
          <FaqSection items={getToolFaqItems('text-case-converter')} />
        </section>

        <RelatedTools currentPath="/text-case-converter" />
      </div>
    </div>
  );
}
