import { useState } from 'react'
import { Link, NavLink } from 'react-router-dom'

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false)

  const closeMenu = () => setMenuOpen(false)

  return (
    <>
      <header className="site-header">
        <div className="container header-inner">
          <Link to="/" className="site-logo" onClick={closeMenu} aria-label="FileVexa home">
            <div className="logo-icon" aria-hidden="true">FV</div>
            <span className="logo-text">File<span>Vexa</span></span>
          </Link>

          <nav className="site-nav" aria-label="Main navigation">
            <NavLink to="/" end className={({ isActive }) => isActive ? 'active' : ''}>Home</NavLink>
            <NavLink to="/image-tools" className={({ isActive }) => isActive ? 'active' : ''}>Image Tools</NavLink>
            <NavLink to="/pdf-tools" className={({ isActive }) => isActive ? 'active' : ''}>PDF Tools</NavLink>
            <NavLink to="/daily-utilities" className={({ isActive }) => isActive ? 'active' : ''}>Daily Utilities</NavLink>
            <NavLink to="/text-tools" className={({ isActive }) => isActive ? 'active' : ''}>Text Tools</NavLink>
            <NavLink to="/calculators" className={({ isActive }) => isActive ? 'active' : ''}>Calculators</NavLink>
          </nav>

          <button
            className="hamburger-btn"
            aria-label={menuOpen ? 'Close menu' : 'Open menu'}
            aria-expanded={menuOpen}
            aria-controls="mobile-menu"
            onClick={() => setMenuOpen(o => !o)}
          >
            <span></span>
            <span></span>
            <span></span>
          </button>
        </div>
      </header>

      <nav id="mobile-menu" className={`mobile-menu ${menuOpen ? 'open' : ''}`} aria-label="Mobile navigation">
        <Link to="/" onClick={closeMenu}>Home</Link>
        <div style={{ padding: '4px 14px', fontSize: '11px', fontWeight: '700', textTransform: 'uppercase', letterSpacing: '0.06em', color: 'var(--color-text-muted)' }}>Image Tools</div>
        <Link to="/heic-to-jpg" onClick={closeMenu}>HEIC to JPG</Link>
        <Link to="/webp-to-jpg" onClick={closeMenu}>WebP to JPG</Link>
        <Link to="/webp-to-png" onClick={closeMenu}>WebP to PNG</Link>
        <Link to="/heic-to-png" onClick={closeMenu}>HEIC to PNG</Link>
        <Link to="/avif-to-jpg" onClick={closeMenu}>AVIF to JPG</Link>
        <div style={{ padding: '4px 14px', fontSize: '11px', fontWeight: '700', textTransform: 'uppercase', letterSpacing: '0.06em', color: 'var(--color-text-muted)', marginTop: '8px' }}>PDF Tools</div>
        <Link to="/pdf-to-png" onClick={closeMenu}>PDF to PNG</Link>
        <Link to="/remove-pdf-pages" onClick={closeMenu}>Remove PDF Pages</Link>
        <Link to="/extract-pdf-pages" onClick={closeMenu}>Extract PDF Pages</Link>
        <Link to="/pdf-to-text" onClick={closeMenu}>PDF to Text</Link>
        <Link to="/pdf-to-markdown" onClick={closeMenu}>PDF to Markdown</Link>
        <div style={{ padding: '4px 14px', fontSize: '11px', fontWeight: '700', textTransform: 'uppercase', letterSpacing: '0.06em', color: 'var(--color-text-muted)', marginTop: '8px' }}>Daily Utilities</div>
        <Link to="/qr-code-generator" onClick={closeMenu}>QR Code Generator</Link>
        <Link to="/word-counter" onClick={closeMenu}>Word Counter</Link>
        <Link to="/password-generator" onClick={closeMenu}>Password Generator</Link>
        
        <div style={{ padding: '4px 14px', fontSize: '11px', fontWeight: '700', textTransform: 'uppercase', letterSpacing: '0.06em', color: 'var(--color-text-muted)', marginTop: '8px' }}>Text Tools</div>
        <Link to="/text-case-converter" onClick={closeMenu}>Text Case Converter</Link>
        <Link to="/lorem-ipsum-generator" onClick={closeMenu}>Lorem Ipsum Generator</Link>
        
        <div style={{ padding: '4px 14px', fontSize: '11px', fontWeight: '700', textTransform: 'uppercase', letterSpacing: '0.06em', color: 'var(--color-text-muted)', marginTop: '8px' }}>Calculators</div>
        <Link to="/age-calculator" onClick={closeMenu}>Age Calculator</Link>
        <Link to="/percentage-calculator" onClick={closeMenu}>Percentage Calculator</Link>
      </nav>
    </>
  )
}
