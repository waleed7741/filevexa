import { useState } from 'react';
import { QRCodeSVG } from 'qrcode.react';
import SEO from '../components/SEO';
import RelatedTools from '../components/RelatedTools';
import FaqSection from '../components/FaqSection';
import ToolPageLayout from '../components/ToolPageLayout';
import { getToolFaqItems } from '../config/toolsSEOData';

export default function QrCodeGenerator() {
  const [text, setText] = useState('');



  const handleDownload = () => {
    const svg = document.getElementById('qr-code-svg');
    if (!svg) return;
    const svgData = new XMLSerializer().serializeToString(svg);
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    const img = new Image();

    img.onload = () => {
      canvas.width = img.width;
      canvas.height = img.height;
      ctx.drawImage(img, 0, 0);
      const pngFile = canvas.toDataURL('image/png');
      const downloadLink = document.createElement('a');
      downloadLink.download = 'qrcode.png';
      downloadLink.href = pngFile;
      downloadLink.click();
    };

    img.src = 'data:image/svg+xml;base64,' + btoa(unescape(encodeURIComponent(svgData)));
  };

  return (
    <div className="tool-page">
      <SEO
        title="Free Online QR Code Generator - No Signup | FileVexa"
        description="Create free, permanent QR codes online instantly. No signup required. Generate QR codes for URLs, text, Wi-Fi, and more directly in your browser."
        canonical="https://filevexa.pages.dev/qr-code-generator"
      />

      <div className="container" style={{ maxWidth: '800px' }}>
        <nav className="breadcrumb" aria-label="Breadcrumb">
          <a href="/">Home</a>
          <span className="breadcrumb-sep">/</span>
          <span aria-current="page">QR Code Generator</span>
        </nav>

        <header className="tool-page-header">
          <h1>Free Online QR Code Generator</h1>
          <p>Create free QR codes instantly in your browser. No signup, no expiration, no tracking.</p>
        </header>

        <div style={{ background: 'var(--color-bg)', padding: '24px', borderRadius: 'var(--radius-lg)', border: '1px solid var(--color-border)', marginBottom: '40px' }}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
            <label style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
              <span style={{ fontWeight: 600 }}>Enter your text or URL</span>
              <textarea
                value={text}
                onChange={(e) => setText(e.target.value)}
                placeholder="https://example.com"
                style={{ width: '100%', padding: '12px', borderRadius: 'var(--radius-md)', border: '1px solid var(--color-border)', minHeight: '120px' }}
              />
            </label>

            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '20px', padding: '24px', background: 'var(--color-bg-subtle)', borderRadius: 'var(--radius-md)' }}>
              {text ? (
                <>
                  <QRCodeSVG id="qr-code-svg" value={text} size={200} level="H" includeMargin={true} />
                  <button onClick={handleDownload} className="btn btn-primary">
                    Download PNG
                  </button>
                </>
              ) : (
                <div style={{ color: 'var(--color-text-muted)' }}>Enter text to generate QR code</div>
              )}
            </div>
          </div>
        </div>

        <ToolPageLayout toolId="qr-code-generator" sections={['steps']} containerClassName="tool-seo-content" includeSEO={false} />

        <section>
          <h2>Frequently Asked Questions</h2>
          <FaqSection items={getToolFaqItems('qr-code-generator')} />
        </section>

        <RelatedTools currentPath="/qr-code-generator" />
      </div>
    </div>
  );
}
