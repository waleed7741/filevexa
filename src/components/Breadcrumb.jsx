import { Link } from 'react-router-dom'

/**
 * Breadcrumb – shows navigation trail
 *
 * Props:
 *  items  Array<{ label: string, href?: string }>
 *         Last item has no href (current page)
 */
export default function Breadcrumb({ items }) {
  return (
    <nav className="breadcrumb" aria-label="Breadcrumb">
      {items.map((item, i) => (
        <span key={i} style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
          {i > 0 && <span className="breadcrumb-sep" aria-hidden="true">›</span>}
          {item.href ? (
            <Link to={item.href}>{item.label}</Link>
          ) : (
            <span aria-current="page">{item.label}</span>
          )}
        </span>
      ))}
    </nav>
  )
}
