import { useState } from 'react';
import SEO from '../components/SEO';
import RelatedTools from '../components/RelatedTools';

export default function WordCounter() {
  const [text, setText] = useState('');

  const schema = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    "name": "Free Online Word Counter",
    "url": "https://filevexa.pages.dev/word-counter",
    "description": "Accurate online tool to count words, characters, sentences, and paragraphs in real time.",
    "applicationCategory": "UtilitiesApplication",
    "operatingSystem": "All",
    "offers": {
      "@type": "Offer",
      "price": "0",
      "priceCurrency": "USD"
    }
  };

  const wordCount = text.trim() ? text.trim().split(/\s+/).length : 0;
  const charCount = text.length;
  const charNoSpaces = text.replace(/\s/g, '').length;
  const paragraphCount = text.trim() ? text.split(/\n+/).filter(p => p.trim() !== '').length : 0;

  return (
    <div className="tool-page">
      <SEO
        title="Free Online Word & Character Counter | FileVexa"
        description="Accurate online tool to count words, characters, sentences, and paragraphs in your text instantly. 100% private."
        canonical="https://filevexa.pages.dev/word-counter"
        schema={schema}
      />

      <div className="container" style={{ maxWidth: '800px' }}>
        <nav className="breadcrumb" aria-label="Breadcrumb">
          <a href="/">Home</a>
          <span className="breadcrumb-sep">/</span>
          <span aria-current="page">Word Counter</span>
        </nav>

        <header className="tool-page-header">
          <h1>Word & Character Counter</h1>
          <p>Instantly count words, characters, and paragraphs. No data is sent to our servers.</p>
        </header>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(120px, 1fr))', gap: '16px', marginBottom: '24px' }}>
          {[
            { label: 'Words', value: wordCount },
            { label: 'Characters', value: charCount },
            { label: 'Without Spaces', value: charNoSpaces },
            { label: 'Paragraphs', value: paragraphCount },
          ].map((stat) => (
            <div key={stat.label} style={{ background: 'var(--color-bg)', padding: '16px', borderRadius: 'var(--radius-lg)', border: '1px solid var(--color-border)', textAlign: 'center' }}>
              <div style={{ fontSize: '28px', fontWeight: 800, color: 'var(--color-primary)' }}>{stat.value}</div>
              <div style={{ fontSize: '13px', color: 'var(--color-text-secondary)', textTransform: 'uppercase', letterSpacing: '0.05em', marginTop: '4px' }}>{stat.label}</div>
            </div>
          ))}
        </div>

        <textarea
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Type or paste your text here to begin counting..."
          style={{ width: '100%', minHeight: '300px', padding: '20px', fontSize: '16px', borderRadius: 'var(--radius-lg)', border: '1px solid var(--color-border)', marginBottom: '40px', fontFamily: 'inherit', resize: 'vertical' }}
        />

        <section style={{ marginBottom: '40px' }}>
          <h2>How it works</h2>
          <p style={{ marginTop: '12px', lineHeight: '1.6' }}>
            Simply type or paste your text into the text box above. As you type, the tool will instantly analyze your text and update the counters for words, characters, characters without spaces, and paragraphs in real-time.
          </p>
        </section>

        <section>
          <h2>Frequently Asked Questions</h2>
          <div style={{ marginTop: '16px', display: 'flex', flexDirection: 'column', gap: '16px' }}>
            <div style={{ padding: '16px', background: 'var(--color-bg-subtle)', borderRadius: 'var(--radius-md)' }}>
              <h3 style={{ fontSize: '16px', marginBottom: '8px' }}>Is my text saved anywhere?</h3>
              <p style={{ fontSize: '14px', margin: 0 }}>No! Everything runs directly inside your web browser. We never send, store, or see your text, ensuring total privacy.</p>
            </div>
            <div style={{ padding: '16px', background: 'var(--color-bg-subtle)', borderRadius: 'var(--radius-md)' }}>
              <h3 style={{ fontSize: '16px', marginBottom: '8px' }}>What counts as a word?</h3>
              <p style={{ fontSize: '14px', margin: 0 }}>A word is defined as any sequence of characters separated by a space or new line.</p>
            </div>
          </div>
        </section>

        <RelatedTools currentPath="/word-counter" />
      </div>
    </div>
  );
}
