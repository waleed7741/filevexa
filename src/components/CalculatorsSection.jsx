import ToolCard from './ToolCard';

const CALC_TOOLS = [
  {
    title: 'Age Calculator',
    desc: 'Calculate your exact age in years, months, and days.',
    href: '/age-calculator',
    icon: '🎂',
    type: 'calc',
  },
  {
    title: 'Percentage Calculator',
    desc: 'Quickly calculate percentages, discounts, increases, and decreases.',
    href: '/percentage-calculator',
    icon: '%',
    type: 'calc',
  }
];

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
