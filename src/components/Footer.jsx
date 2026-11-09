import { Link } from 'react-router-dom'
import { TOOL_SEO_DATA } from '../data/toolSEO'
import { PROGRAMMATIC_TOOLS } from '../data/programmaticTools'

const DIRECTORY_TOOLS = [
  ...Object.values(TOOL_SEO_DATA).map((tool) => ({
    title: tool.title,
    href: tool.href,
    category: tool.category?.name,
  })),
  ...Object.entries(PROGRAMMATIC_TOOLS).map(([slug, tool]) => ({
    title: slug === 'compress-pdf-to-200kb' ? 'PDF Size Guide' : tool.heading,
    href: `/${slug}`,
    category: tool.kind === 'image' ? 'Image Tools' : 'PDF Tools',
  })),
]

const DIRECTORY_GROUPS = [
  { title: 'Image Tools', categories: ['Image Tools'] },
  { title: 'PDF Tools', categories: ['PDF Tools'] },
  { title: 'Text Tools', categories: ['Text Tools'] },
  { title: 'Utilities & Calcs', categories: ['Daily Utilities', 'Calculators'] },
]

export default function Footer() {
  const year = new Date().getFullYear()
  const toolGroups = DIRECTORY_GROUPS.map((group) => ({
    ...group,
    tools: DIRECTORY_TOOLS.filter((tool) => group.categories.includes(tool.category)),
  }))

  return (
    <footer className="site-footer">
      <div className="container">
        <div className="footer-inner">
          <div className="footer-brand">
            <Link to="/" className="site-logo" style={{ display: 'inline-flex', marginBottom: '8px' }}>
              <div className="logo-icon" aria-hidden="true">FV</div>
              <span className="logo-text" style={{ marginLeft: '8px' }}>File<span>Vexa</span></span>
            </Link>
            <p>Free online file tools. Most file processing runs in your browser with no account required.</p>
          </div>

          {toolGroups.map((group) => (
            <div className="footer-col" key={group.title}>
              <h4>{group.title}</h4>
              <ul>
                {group.tools.map((tool) => (
                  <li key={tool.href}><Link to={tool.href}>{tool.title}</Link></li>
                ))}
              </ul>
            </div>
          ))}

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
          <p>© {year} FileVexa. Files are processed locally in your browser.</p>
        </div>
      </div>
    </footer>
  )
}
