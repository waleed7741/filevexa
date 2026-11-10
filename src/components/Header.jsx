import { useState, useRef, useEffect } from 'react'
import { Link, NavLink } from 'react-router-dom'
import { useRecentTools } from '../hooks/useRecentTools'

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false)
  const [recentOpen, setRecentOpen] = useState(false)
  const recentRef = useRef(null)
  const { recentTools, clearRecentTools } = useRecentTools()

  const closeMenu = () => {
    setMenuOpen(false)
    setRecentOpen(false)
  }

  // Close recent dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(e) {
      if (recentRef.current && !recentRef.current.contains(e.target)) {
        setRecentOpen(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

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

            {/* Recent Tools Shortcuts Dropdown (Desktop) */}
            {recentTools.length > 0 && (
              <div className="recent-tools-wrapper" ref={recentRef}>
                <button
                  type="button"
                  className={`recent-tools-btn ${recentOpen ? 'open' : ''}`}
                  onClick={() => setRecentOpen((o) => !o)}
                  aria-expanded={recentOpen}
                  aria-label="Recent tools menu"
                >
                  <span aria-hidden="true">🕒</span>
                  <span>Recent</span>
                  <span className="recent-badge">{recentTools.length}</span>
                </button>

                {recentOpen && (
                  <div className="recent-tools-dropdown" role="menu">
                    <div className="recent-tools-header">
                      <span>Recently Used</span>
                      <button
                        type="button"
                        className="recent-clear-btn"
                        onClick={clearRecentTools}
                        aria-label="Clear recent tools history"
                      >
                        Clear
                      </button>
                    </div>
                    <div className="recent-tools-list">
                      {recentTools.map((tool) => (
                        <Link
                          key={tool.href}
                          to={tool.href}
                          className="recent-tool-item"
                          onClick={() => setRecentOpen(false)}
                          role="menuitem"
                        >
                          <span className="recent-tool-icon" aria-hidden="true">{tool.icon}</span>
                          <div className="recent-tool-info">
                            <span className="recent-tool-title">{tool.title}</span>
                            {tool.category && <span className="recent-tool-cat">{tool.category}</span>}
                          </div>
                        </Link>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            )}
          </nav>

          <button
            className="hamburger-btn"
            aria-label={menuOpen ? 'Close menu' : 'Open menu'}
            aria-expanded={menuOpen}
            aria-controls="mobile-menu"
            onClick={() => setMenuOpen((o) => !o)}
          >
            <span></span>
            <span></span>
            <span></span>
          </button>
        </div>
      </header>

      <nav id="mobile-menu" className={`mobile-menu ${menuOpen ? 'open' : ''}`} aria-label="Mobile navigation">
        {/* Mobile Recently Visited Section */}
        {recentTools.length > 0 && (
          <div className="mobile-recent-section">
            <div className="mobile-recent-header">
              <span>🕒 Recently Used</span>
              <button
                type="button"
                className="recent-clear-btn"
                onClick={clearRecentTools}
              >
                Clear
              </button>
            </div>
            <div className="mobile-recent-grid">
              {recentTools.map((tool) => (
                <Link
                  key={tool.href}
                  to={tool.href}
                  className="mobile-recent-card"
                  onClick={closeMenu}
                >
                  <span aria-hidden="true">{tool.icon}</span>
                  <span style={{ overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                    {tool.title}
                  </span>
                </Link>
              ))}
            </div>
          </div>
        )}

        <Link to="/" onClick={closeMenu}>Home</Link>
        <div style={{ padding: '4px 14px', fontSize: '11px', fontWeight: '700', textTransform: 'uppercase', letterSpacing: '0.06em', color: 'var(--color-text-muted)' }}>Image Tools</div>
        <Link to="/heic-to-jpg" onClick={closeMenu}>HEIC to JPG</Link>
        <Link to="/webp-to-jpg" onClick={closeMenu}>WebP to JPG</Link>
        <Link to="/webp-to-png" onClick={closeMenu}>WebP to PNG</Link>
        <Link to="/heic-to-png" onClick={closeMenu}>HEIC to PNG</Link>
        <Link to="/avif-to-jpg" onClick={closeMenu}>AVIF to JPG</Link>
        <Link to="/compress-image-to-kb" onClick={closeMenu}>Compress Image to KB</Link>
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
