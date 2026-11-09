import { useState } from 'react';
import SEO from '../components/SEO';
import RelatedTools from '../components/RelatedTools';
import FaqSection from '../components/FaqSection';
import ToolPageLayout from '../components/ToolPageLayout';
import { getToolFaqItems } from '../config/toolsSEOData';

export default function WordCounter() {
  const [text, setText] = useState('');

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
      />

      <div className="container" style={{ maxWidth: '800px' }}>
        <nav className="breadcrumb" aria-label="Breadcrumb">
          <a href="/">Home</a>
          <span className="breadcrumb-sep">/</span>
          <span aria-current="page">Word Counter</span>
        </nav>

        <header className="tool-page-header">
          <h1>Free Online Word &amp; Character Counter</h1>
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

        <ToolPageLayout toolId="word-counter" sections={['steps']} containerClassName="tool-seo-content" includeSEO={false} />

        <section>
          <h2>Frequently Asked Questions</h2>
          <FaqSection items={getToolFaqItems('word-counter')} />
        </section>

        <RelatedTools currentPath="/word-counter" />
      </div>
    </div>
  );
}
