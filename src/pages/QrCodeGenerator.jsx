import { useState } from 'react';
import { QRCodeSVG } from 'qrcode.react';
import SEO from '../components/SEO';
import RelatedTools from '../components/RelatedTools';

export default function QrCodeGenerator() {
  const [text, setText] = useState('');



  const schema = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    "name": "Free Online QR Code Generator",
    "url": "https://filevexa.pages.dev/qr-code-generator",
    "description": "Create free, permanent QR codes online instantly. No signup required.",
    "applicationCategory": "UtilitiesApplication",
    "operatingSystem": "All",
    "offers": {
      "@type": "Offer",
      "price": "0",
      "priceCurrency": "USD"
    }
  };

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
        schema={schema}
      />

      <div className="container" style={{ maxWidth: '800px' }}>
        <nav className="breadcrumb" aria-label="Breadcrumb">
          <a href="/">Home</a>
          <span className="breadcrumb-sep">/</span>
          <span aria-current="page">QR Code Generator</span>
        </nav>

        <header className="tool-page-header">
          <h1>QR Code Generator</h1>
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

        <section style={{ marginBottom: '40px' }}>
          <h2>How to generate a QR Code</h2>
          <p style={{ marginTop: '12px', lineHeight: '1.6' }}>
            1. Enter your website URL, text, email, or any other data into the text box above.<br />
            2. The QR code will instantly generate in real-time as you type.<br />
            3. Click the "Download PNG" button to save the QR code to your device.<br />
            4. You can freely use this QR code anywhere. It never expires!
          </p>
        </section>

        <section>
          <h2>Frequently Asked Questions</h2>
          <div style={{ marginTop: '16px', display: 'flex', flexDirection: 'column', gap: '16px' }}>
            <div style={{ padding: '16px', background: 'var(--color-bg-subtle)', borderRadius: 'var(--radius-md)' }}>
              <h3 style={{ fontSize: '16px', marginBottom: '8px' }}>Do these QR codes expire?</h3>
              <p style={{ fontSize: '14px', margin: 0 }}>No! The QR codes generated here are static and contain the raw data you entered. They will never expire and will work forever.</p>
            </div>
            <div style={{ padding: '16px', background: 'var(--color-bg-subtle)', borderRadius: 'var(--radius-md)' }}>
              <h3 style={{ fontSize: '16px', marginBottom: '8px' }}>Is my data sent to a server?</h3>
              <p style={{ fontSize: '14px', margin: 0 }}>No. The QR code is generated 100% locally in your web browser using JavaScript. We do not track or save what you generate.</p>
            </div>
          </div>
        </section>

        <RelatedTools currentPath="/qr-code-generator" />
      </div>
    </div>
  );
}
