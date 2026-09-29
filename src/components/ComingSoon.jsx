/**
 * Shared stub component for PDF tool pages that are not yet implemented.
 * Shows a "coming soon" message with context about what the tool does.
 */
import { Link } from 'react-router-dom'
import Breadcrumb from '../components/Breadcrumb'

export default function ComingSoon({ title, desc, breadcrumbLabel }) {
  return (
    <div className="tool-page">
      <div className="container">
        <Breadcrumb items={[{ label: 'Home', href: '/' }, { label: breadcrumbLabel }]} />
        <div className="tool-page-header">
          <h1>{title}</h1>
          <p>{desc}</p>
        </div>
        <div style={{
          border: '2px dashed var(--color-border)',
          borderRadius: 'var(--radius-lg)',
          padding: '56px 32px',
          textAlign: 'center',
          background: 'var(--color-bg-subtle)',
        }}>
          <div style={{ fontSize: '48px', marginBottom: '16px' }} aria-hidden="true">🚧</div>
          <h2 style={{ fontSize: '1.25rem', fontWeight: '700', marginBottom: '10px', color: 'var(--color-text)' }}>
            Coming Soon
          </h2>
          <p style={{ color: 'var(--color-text-secondary)', maxWidth: '400px', margin: '0 auto 24px' }}>
            This tool is under development and will be available soon. In the meantime, try our available image conversion tools.
          </p>
          <Link to="/" className="btn btn-primary">Browse Available Tools</Link>
        </div>
      </div>
    </div>
  )
}
