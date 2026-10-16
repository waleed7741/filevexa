import { useState, useEffect } from 'react';
import { setPageMeta } from '../utils/seoHelpers';
import RelatedTools from '../components/RelatedTools';

const LOREM_WORDS = ["lorem", "ipsum", "dolor", "sit", "amet", "consectetur", "adipiscing", "elit", "sed", "do", "eiusmod", "tempor", "incididunt", "ut", "labore", "et", "dolore", "magna", "aliqua", "enim", "ad", "minim", "veniam", "quis", "nostrud", "exercitation", "ullamco", "laboris", "nisi", "aliquip", "ex", "ea", "commodo", "consequat", "duis", "aute", "irure", "reprehenderit", "in", "voluptate", "velit", "esse", "cillum", "fugiat", "nulla", "pariatur", "excepteur", "sint", "occaecat", "cupidatat", "non", "proident", "sunt", "culpa", "qui", "officia", "deserunt", "mollit", "anim", "id", "est", "laborum"];

export default function LoremIpsumGenerator() {
  const [paragraphs, setParagraphs] = useState(3);
  const [wordsPerParagraph, setWordsPerParagraph] = useState(30);
  const [output, setOutput] = useState('');

  useEffect(() => {
    setPageMeta({
      title: 'Free Lorem Ipsum Generator | FileVexa',
      description: 'Generate customized Lorem Ipsum placeholder text instantly. Perfect for web designers, developers, and typography.',
      canonical: 'https://filevexa.pages.dev/lorem-ipsum-generator',
    });
    generateLorem();
  }, []);

  const schema = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    "name": "Lorem Ipsum Generator",
    "url": "https://filevexa.pages.dev/lorem-ipsum-generator",
    "description": "Generate customized Lorem Ipsum placeholder text instantly.",
    "applicationCategory": "UtilitiesApplication",
    "operatingSystem": "All",
    "offers": { "@type": "Offer", "price": "0", "priceCurrency": "USD" }
  };

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

  const copyToClipboard = () => {
    navigator.clipboard.writeText(output);
    alert('Copied to clipboard!');
  };

  return (
    <div className="tool-page">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
      <div className="container" style={{ maxWidth: '800px' }}>
        <nav className="breadcrumb">
          <a href="/">Home</a> <span className="breadcrumb-sep">/</span> <span aria-current="page">Lorem Ipsum</span>
        </nav>

        <header className="tool-page-header">
          <h1>Lorem Ipsum Generator</h1>
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

        <section style={{ marginBottom: '40px' }}>
          <h2>How to use the generator</h2>
          <p style={{ marginTop: '12px', lineHeight: '1.6' }}>
            Specify the number of paragraphs and words per paragraph you need, then hit generate. The tool will output classic pseudo-Latin text that mimics natural word distribution.
          </p>
        </section>

        <section>
          <h2>Frequently Asked Questions</h2>
          <div style={{ marginTop: '16px', display: 'flex', flexDirection: 'column', gap: '16px' }}>
            <div style={{ padding: '16px', background: 'var(--color-bg-subtle)', borderRadius: 'var(--radius-md)' }}>
              <h3 style={{ fontSize: '16px', marginBottom: '8px' }}>What is Lorem Ipsum?</h3>
              <p style={{ fontSize: '14px', margin: 0 }}>It is a placeholder text commonly used in design and publishing to demonstrate the visual form of a document without relying on meaningful content.</p>
            </div>
            <div style={{ padding: '16px', background: 'var(--color-bg-subtle)', borderRadius: 'var(--radius-md)' }}>
              <h3 style={{ fontSize: '16px', marginBottom: '8px' }}>Why use dummy text?</h3>
              <p style={{ fontSize: '14px', margin: 0 }}>People tend to get distracted by readable content. Using Lorem Ipsum ensures viewers focus entirely on the design layout.</p>
            </div>
            <div style={{ padding: '16px', background: 'var(--color-bg-subtle)', borderRadius: 'var(--radius-md)' }}>
              <h3 style={{ fontSize: '16px', marginBottom: '8px' }}>Is this free to use?</h3>
              <p style={{ fontSize: '14px', margin: 0 }}>Yes, this tool is 100% free and you can generate as much text as you need.</p>
            </div>
          </div>
        </section>

        <RelatedTools currentPath="/lorem-ipsum-generator" />
      </div>
    </div>
  );
}
