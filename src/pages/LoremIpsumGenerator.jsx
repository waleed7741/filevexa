import { useState, useEffect } from 'react';
import SEO from '../components/SEO';
import RelatedTools from '../components/RelatedTools';
import FaqSection from '../components/FaqSection';
import ToolPageLayout from '../components/ToolPageLayout';
import { getToolFaqItems } from '../config/toolsSEOData';

const LOREM_WORDS = ["lorem", "ipsum", "dolor", "sit", "amet", "consectetur", "adipiscing", "elit", "sed", "do", "eiusmod", "tempor", "incididunt", "ut", "labore", "et", "dolore", "magna", "aliqua", "enim", "ad", "minim", "veniam", "quis", "nostrud", "exercitation", "ullamco", "laboris", "nisi", "aliquip", "ex", "ea", "commodo", "consequat", "duis", "aute", "irure", "reprehenderit", "in", "voluptate", "velit", "esse", "cillum", "fugiat", "nulla", "pariatur", "excepteur", "sint", "occaecat", "cupidatat", "non", "proident", "sunt", "culpa", "qui", "officia", "deserunt", "mollit", "anim", "id", "est", "laborum"];

export default function LoremIpsumGenerator() {
  const [paragraphs, setParagraphs] = useState(3);
  const [wordsPerParagraph, setWordsPerParagraph] = useState(30);
  const [output, setOutput] = useState('');

  const generateLorem = () => {
    let result = '';
    for (let p = 0; p < paragraphs; p++) {
      let paraText = [];
      for (let w = 0; w < wordsPerParagraph; w++) {
        const randomWord = LOREM_WORDS[Math.floor(Math.random() * LOREM_WORDS.length)];
        paraText.push(w === 0 ? randomWord.charAt(0).toUpperCase() + randomWord.slice(1) : randomWord);
      }
      result += paraText.join(' ') + '.\n\n';
    }
    setOutput(result.trim());
  };

  useEffect(() => {
    generateLorem();
  }, []);

  const copyToClipboard = () => {
    navigator.clipboard.writeText(output);
    alert('Copied to clipboard!');
  };

  return (
    <div className="tool-page">
      <SEO
        title="Free Lorem Ipsum Generator | FileVexa"
        description="Generate customized Lorem Ipsum placeholder text instantly. Perfect for web designers, developers, and typography."
        canonical="https://filevexa.pages.dev/lorem-ipsum-generator"
      />
      <div className="container" style={{ maxWidth: '800px' }}>
        <nav className="breadcrumb">
          <a href="/">Home</a> <span className="breadcrumb-sep">/</span> <span aria-current="page">Lorem Ipsum</span>
        </nav>

        <header className="tool-page-header">
          <h1>Free Online Lorem Ipsum Generator</h1>
          <p>Generate dummy text for your layouts and mockups.</p>
        </header>

        <div style={{ background: 'var(--color-bg)', padding: '24px', borderRadius: 'var(--radius-lg)', border: '1px solid var(--color-border)', marginBottom: '40px' }}>
          <div style={{ display: 'flex', gap: '16px', flexWrap: 'wrap', marginBottom: '24px' }}>
            <label style={{ display: 'flex', flexDirection: 'column', gap: '8px', flex: 1 }}>
              <span style={{ fontWeight: 600 }}>Paragraphs</span>
              <input type="number" value={paragraphs} onChange={(e) => setParagraphs(Number(e.target.value))} min="1" max="100" style={{ padding: '10px', borderRadius: 'var(--radius-md)', border: '1px solid var(--color-border)' }} />
            </label>
            <label style={{ display: 'flex', flexDirection: 'column', gap: '8px', flex: 1 }}>
              <span style={{ fontWeight: 600 }}>Words per Paragraph</span>
              <input type="number" value={wordsPerParagraph} onChange={(e) => setWordsPerParagraph(Number(e.target.value))} min="5" max="200" style={{ padding: '10px', borderRadius: 'var(--radius-md)', border: '1px solid var(--color-border)' }} />
            </label>
            <div style={{ display: 'flex', alignItems: 'flex-end' }}>
              <button className="btn btn-primary" onClick={generateLorem}>Generate</button>
            </div>
          </div>

          <textarea
            value={output}
            readOnly
            style={{ width: '100%', minHeight: '250px', padding: '16px', borderRadius: 'var(--radius-md)', border: '1px solid var(--color-border)', fontSize: '16px', background: 'var(--color-bg-subtle)' }}
          />

          <div style={{ marginTop: '16px', textAlign: 'right' }}>
            <button className="btn btn-secondary" onClick={copyToClipboard}>Copy to Clipboard</button>
          </div>
        </div>

        <ToolPageLayout toolId="lorem-ipsum-generator" sections={['steps']} containerClassName="tool-seo-content" includeSEO={false} />

        <section>
          <h2>Frequently Asked Questions</h2>
          <FaqSection items={getToolFaqItems('lorem-ipsum-generator')} />
        </section>

        <RelatedTools currentPath="/lorem-ipsum-generator" />
      </div>
    </div>
  );
}
