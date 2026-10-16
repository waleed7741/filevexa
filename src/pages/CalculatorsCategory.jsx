import SEO from '../components/SEO';
import ToolCard from '../components/ToolCard';

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

export default function CalculatorsCategory() {
  return (
    <div className="tool-page">
      <SEO
        title="Free Online Everyday Calculators | FileVexa"
        description="Quick and private calculators for everyday problems including age calculation and percentage tools."
        canonical="https://filevexa.pages.dev/calculators"
      />

      <div className="container">
        <nav className="breadcrumb" aria-label="Breadcrumb">
          <a href="/">Home</a>
          <span className="breadcrumb-sep">/</span>
          <span aria-current="page">Calculators</span>
        </nav>

        <header className="tool-page-header" style={{ textAlign: 'center', marginBottom: '48px' }}>
          <h1>Everyday Calculators</h1>
          <p style={{ margin: '0 auto' }}>Quick and private calculators for everyday problems.</p>
        </header>

        <div className="tools-grid">
          {CALC_TOOLS.map((tool) => (
            <ToolCard key={tool.href} {...tool} />
          ))}
        </div>
      </div>
    </div>
  );
}
