import { useState, useEffect } from 'react';
import { setPageMeta } from '../utils/seoHelpers';
import RelatedTools from '../components/RelatedTools';

export default function TextCaseConverter() {
  const [text, setText] = useState('');

  useEffect(() => {
    setPageMeta({
      title: 'Free Text Case Converter | UPPERCASE, lowercase, Title Case',
      description: 'Easily convert text to UPPERCASE, lowercase, Title Case, or Sentence case. A free, online client-side text formatting tool.',
      canonical: 'https://filevexa.com/text-case-converter',
    });
  }, []);

  const schema = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    "name": "Text Case Converter",
    "url": "https://filevexa.com/text-case-converter",
    "description": "Easily convert text to UPPERCASE, lowercase, Title Case, or Sentence case.",
    "applicationCategory": "UtilitiesApplication",
    "operatingSystem": "All",
    "offers": {
      "@type": "Offer",
      "price": "0",
      "priceCurrency": "USD"
    }
  };

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
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
      <div className="container" style={{ maxWidth: '800px' }}>
        <nav className="breadcrumb" aria-label="Breadcrumb">
          <a href="/">Home</a>
          <span className="breadcrumb-sep">/</span>
          <span aria-current="page">Text Case Converter</span>
        </nav>

        <header className="tool-page-header">
          <h1>Text Case Converter</h1>
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

        <section style={{ marginBottom: '40px' }}>
          <h2>How to convert text casing</h2>
          <p style={{ marginTop: '12px', lineHeight: '1.6' }}>
            Paste your block of text into the area above. Select the desired capitalization format from the buttons (like UPPERCASE or Title Case). The text will instantly transform, and you can easily copy the result back to your clipboard.
          </p>
        </section>

        <section>
          <h2>Frequently Asked Questions</h2>
          <div style={{ marginTop: '16px', display: 'flex', flexDirection: 'column', gap: '16px' }}>
            <div style={{ padding: '16px', background: 'var(--color-bg-subtle)', borderRadius: 'var(--radius-md)' }}>
              <h3 style={{ fontSize: '16px', marginBottom: '8px' }}>Is this tool private?</h3>
              <p style={{ fontSize: '14px', margin: 0 }}>Yes. Your text is processed entirely in your local browser and is never uploaded or sent to any server.</p>
            </div>
            <div style={{ padding: '16px', background: 'var(--color-bg-subtle)', borderRadius: 'var(--radius-md)' }}>
              <h3 style={{ fontSize: '16px', marginBottom: '8px' }}>What is Title Case?</h3>
              <p style={{ fontSize: '14px', margin: 0 }}>Title Case capitalizes the first letter of every word, making it ideal for headlines or titles.</p>
            </div>
            <div style={{ padding: '16px', background: 'var(--color-bg-subtle)', borderRadius: 'var(--radius-md)' }}>
              <h3 style={{ fontSize: '16px', marginBottom: '8px' }}>Does it limit text length?</h3>
              <p style={{ fontSize: '14px', margin: 0 }}>There are no strict length limits; you can convert as much text as your browser can handle.</p>
            </div>
          </div>
        </section>

        <RelatedTools currentPath="/text-case-converter" />
      </div>
    </div>
  );
}
