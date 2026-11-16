import { useLocation } from 'react-router-dom'
import ToolPageLayout from './ToolPageLayout'
import { TOOLS_SEO_DATA } from '../config/toolsSEOData'

export default function ToolRouteFaq() {
  const { pathname } = useLocation()
  const slug = pathname.replace(/^\/+|\/+$/g, '')
  const tool = TOOLS_SEO_DATA[slug]

  if (!tool || tool.layoutRendered) return null

  return (
    <ToolPageLayout
      toolId={slug}
      sections={['summary', 'details', 'features']}
      includeSEO={false}
    />
  )
}
