import ToolCard from './ToolCard';
import { getToolCards } from '../config/toolsSEOData'

const CALC_TOOLS = getToolCards('Calculators')

export default function CalculatorsSection() {
  return (
    <section className="section" aria-labelledby="calc-tools-heading" style={{ background: 'var(--color-bg-subtle)', borderTop: '1px solid var(--color-border)', borderBottom: '1px solid var(--color-border)' }}>
      <div className="container">
        <div className="section-header">
          <h2 className="section-title" id="calc-tools-heading">Everyday Calculators</h2>
          <p className="section-subtitle">Quick and private calculators for everyday problems.</p>
        </div>
        <div className="tools-grid">
          {CALC_TOOLS.map((tool) => (
            <ToolCard key={tool.href} {...tool} />
          ))}
        </div>
      </div>
    </section>
  );
}
