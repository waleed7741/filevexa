import ToolCard from './ToolCard';
import { getToolCards } from '../config/toolsSEOData'

const TEXT_TOOLS = getToolCards('Text Tools')

export default function TextToolsSection() {
  return (
    <section className="section" aria-labelledby="text-tools-heading" style={{ background: 'var(--color-bg)' }}>
      <div className="container">
        <div className="section-header">
          <h2 className="section-title" id="text-tools-heading">Text & Formatting Tools</h2>
          <p className="section-subtitle">Format and generate text instantly in your browser.</p>
        </div>
        <div className="tools-grid">
          {TEXT_TOOLS.map((tool) => (
            <ToolCard key={tool.href} {...tool} />
          ))}
        </div>
      </div>
    </section>
  );
}
