import { Link, useLocation } from 'react-router-dom'
import { TOOLS_SEO_DATA } from '../config/toolsSEOData'

/**
 * RelatedTools – shows links to related conversion tools
 *
 * Props:
 *  tools  Array<{ label: string, href: string, emoji: string }>
 */
export default function RelatedTools({ tools }) {
  const { pathname } = useLocation()
  const routeId = pathname.replace(/^\/+|\/+$/g, '')
  const relatedTools = TOOLS_SEO_DATA[routeId]?.relatedTools || tools
  if (!relatedTools || relatedTools.length === 0) return null

  return (
    <div className="info-section">
      <h2>Related Tools</h2>
      <div className="related-tools">
        {relatedTools.map((tool) => (
          <Link key={tool.href} to={tool.href} className="related-tool-link">
            <span className="related-tool-emoji" aria-hidden="true">{tool.emoji}</span>
            {tool.label}
          </Link>
        ))}
      </div>
    </div>
  )
}
