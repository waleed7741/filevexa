import { useLocation } from 'react-router-dom'
import ToolPageLayout from './ToolPageLayout'
import { TOOLS_SEO_DATA } from '../config/toolsSEOData'

export default function ToolRouteFaq() {
  const { pathname } = useLocation()
  const slug = pathname.replace(/^\//, '')
  const tool = TOOLS_SEO_DATA[slug]

  if (!tool || tool.layoutRendered) return null

  return (
    <ToolPageLayout
      toolId={slug}
      sections={['summary', 'features']}
      includeSEO={false}
    />
  )
}
