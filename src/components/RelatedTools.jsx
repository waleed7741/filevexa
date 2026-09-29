import { Link } from 'react-router-dom'

/**
 * RelatedTools – shows links to related conversion tools
 *
 * Props:
 *  tools  Array<{ label: string, href: string, emoji: string }>
 */
export default function RelatedTools({ tools }) {
  if (!tools || tools.length === 0) return null

  return (
    <div className="info-section">
      <h2>Related Tools</h2>
      <div className="related-tools">
        {tools.map((tool) => (
          <Link key={tool.href} to={tool.href} className="related-tool-link">
            <span className="related-tool-emoji" aria-hidden="true">{tool.emoji}</span>
            {tool.label}
          </Link>
        ))}
      </div>
    </div>
  )
}
