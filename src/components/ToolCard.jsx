/**
 * ToolCard – displayed on the homepage in the "Popular Tools" grid
 *
 * Props:
 *  title   string
 *  desc    string
 *  href    string
 *  icon    string  – emoji or icon character
 *  type    'image' | 'pdf'
 */
import { Link } from 'react-router-dom'

export default function ToolCard({ title, desc, href, icon, type = 'image' }) {
  return (
    <Link to={href} className="tool-card" aria-label={`${title} – ${desc}`}>
      <div className={`tool-card-icon ${type}`} aria-hidden="true">{icon}</div>
      <div className="tool-card-title">{title}</div>
      <div className="tool-card-desc">{desc}</div>
      <div className="tool-card-footer">
        <span className="btn btn-primary btn-sm" aria-hidden="true">Use Tool →</span>
      </div>
    </Link>
  )
}
