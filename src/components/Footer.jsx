import { Link } from 'react-router-dom'

export default function Footer() {
  const year = new Date().getFullYear()

  return (
    <footer className="site-footer">
      <div className="container">
        <div className="footer-inner">
          <div className="footer-brand">
            <Link to="/" className="site-logo" style={{ display: 'inline-flex', marginBottom: '8px' }}>
              <div className="logo-icon" aria-hidden="true">FV</div>
              <span className="logo-text" style={{ marginLeft: '8px' }}>File<span>Vexa</span></span>
            </Link>
            <p>Free online file conversion tools. Process files directly in your browser — no uploads, no signup.</p>
          </div>

          <div className="footer-col">
            <h4>Image Tools</h4>
            <ul>
              <li><Link to="/heic-to-jpg">HEIC to JPG</Link></li>
              <li><Link to="/webp-to-jpg">WebP to JPG</Link></li>
              <li><Link to="/webp-to-png">WebP to PNG</Link></li>
              <li><Link to="/heic-to-png">HEIC to PNG</Link></li>
              <li><Link to="/avif-to-jpg">AVIF to JPG</Link></li>
            </ul>
          </div>

          <div className="footer-col">
            <h4>PDF Tools</h4>
            <ul>
              <li><Link to="/pdf-to-png">PDF to PNG</Link></li>
              <li><Link to="/remove-pdf-pages">Remove PDF Pages</Link></li>
              <li><Link to="/extract-pdf-pages">Extract PDF Pages</Link></li>
              <li><Link to="/pdf-to-text">PDF to Text</Link></li>
              <li><Link to="/pdf-to-markdown">PDF to Markdown</Link></li>
            </ul>
          </div>

          <div className="footer-col">
            <h4>Text Tools</h4>
            <ul>
              <li><Link to="/text-case-converter">Text Case Converter</Link></li>
              <li><Link to="/lorem-ipsum-generator">Lorem Ipsum Generator</Link></li>
              <li><Link to="/word-counter">Word Counter</Link></li>
            </ul>
          </div>

          <div className="footer-col">
            <h4>Utilities & Calcs</h4>
            <ul>
              <li><Link to="/qr-code-generator">QR Code Generator</Link></li>
              <li><Link to="/password-generator">Password Generator</Link></li>
              <li><Link to="/age-calculator">Age Calculator</Link></li>
              <li><Link to="/percentage-calculator">Percentage Calculator</Link></li>
            </ul>
          </div>

          <div className="footer-col">
            <h4>Company</h4>
            <ul>
              <li><Link to="/">Home</Link></li>
              <li><Link to="/privacy">Privacy Policy</Link></li>
              <li><Link to="/terms">Terms of Use</Link></li>
              <li><Link to="/contact">Contact</Link></li>
            </ul>
          </div>
        </div>

        <div className="footer-bottom">
          <p>© {year} FileVexa. All files are processed locally in your browser.</p>
        </div>
      </div>
    </footer>
  )
}
