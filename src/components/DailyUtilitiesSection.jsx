import ToolCard from './ToolCard';
import { getToolCards } from '../config/toolsSEOData'

const UTILITY_TOOLS = getToolCards('Daily Utilities')

export default function DailyUtilitiesSection() {
  return (
    <section className="section" aria-labelledby="utility-tools-heading">
      <div className="container">
        <div className="section-header">
          <h2 className="section-title" id="utility-tools-heading">Daily Utilities</h2>
          <p className="section-subtitle">Quick, private, and free everyday web tools.</p>
        </div>
        <div className="tools-grid">
          {UTILITY_TOOLS.map((tool) => (
            <ToolCard key={tool.href} {...tool} />
          ))}
        </div>
      </div>
    </section>
  );
}
