import { useState } from 'react';
import SEO from '../components/SEO';
import RelatedTools from '../components/RelatedTools';
import FaqSection from '../components/FaqSection';
import ToolPageLayout from '../components/ToolPageLayout';
import { getToolFaqItems } from '../config/toolsSEOData';

export default function PercentageCalculator() {
  const [calc1X, setCalc1X] = useState('');
  const [calc1Y, setCalc1Y] = useState('');

  const [calc2X, setCalc2X] = useState('');
  const [calc2Y, setCalc2Y] = useState('');

  const [calc3X, setCalc3X] = useState('');
  const [calc3Y, setCalc3Y] = useState('');

  const schema = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    "name": "Percentage & Discount Calculator",
    "url": "https://filevexa.pages.dev/percentage-calculator",
    "description": "Quickly calculate percentages, discounts, increases, and decreases directly in your browser.",
    "applicationCategory": "UtilitiesApplication",
    "operatingSystem": "All",
    "offers": { "@type": "Offer", "price": "0", "priceCurrency": "USD" }
  };

  const res1 = (calc1X && calc1Y) ? (Number(calc1X) / 100) * Number(calc1Y) : null;
  const res2 = (calc2X && calc2Y) ? (Number(calc2X) / Number(calc2Y)) * 100 : null;
  const res3 = (calc3X && calc3Y) ? ((Number(calc3Y) - Number(calc3X)) / Math.abs(Number(calc3X))) * 100 : null;

  return (
    <div className="tool-page">
      <SEO
        title="Free Online Percentage Calculator | Discounts & Increases"
        description="Quickly calculate percentages, discounts, increases, and decreases with our free online percentage calculator."
        canonical="https://filevexa.pages.dev/percentage-calculator"
        schema={schema}
      />
      <div className="container" style={{ maxWidth: '700px' }}>
        <nav className="breadcrumb">
          <a href="/">Home</a> <span className="breadcrumb-sep">/</span> <span aria-current="page">Percentage Calculator</span>
        </nav>

        <header className="tool-page-header">
          <h1>Free Online Percentage &amp; Discount Calculator</h1>
          <p>Easily solve percentage problems, find discounts, or calculate percentage growth.</p>
        </header>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '24px', marginBottom: '40px' }}>

          {/* Calc 1 */}
          <div style={{ background: 'var(--color-bg)', padding: '24px', borderRadius: 'var(--radius-lg)', border: '1px solid var(--color-border)' }}>
            <h3 style={{ fontSize: '18px', marginBottom: '16px' }}>What is X% of Y?</h3>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px', flexWrap: 'wrap' }}>
              <span>What is</span>
              <input type="number" value={calc1X} onChange={e => setCalc1X(e.target.value)} style={{ width: '80px', padding: '8px', borderRadius: 'var(--radius-sm)', border: '1px solid var(--color-border)' }} />
              <span>% of</span>
              <input type="number" value={calc1Y} onChange={e => setCalc1Y(e.target.value)} style={{ width: '120px', padding: '8px', borderRadius: 'var(--radius-sm)', border: '1px solid var(--color-border)' }} />
              <span>?</span>
            </div>
            {res1 !== null && (
              <div style={{ marginTop: '16px', fontSize: '20px', fontWeight: 600, color: 'var(--color-primary)' }}>
                Result: {res1.toLocaleString('en-US', { maximumFractionDigits: 4 })}
              </div>
            )}
          </div>

          {/* Calc 2 */}
          <div style={{ background: 'var(--color-bg)', padding: '24px', borderRadius: 'var(--radius-lg)', border: '1px solid var(--color-border)' }}>
            <h3 style={{ fontSize: '18px', marginBottom: '16px' }}>X is what % of Y?</h3>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px', flexWrap: 'wrap' }}>
              <input type="number" value={calc2X} onChange={e => setCalc2X(e.target.value)} style={{ width: '120px', padding: '8px', borderRadius: 'var(--radius-sm)', border: '1px solid var(--color-border)' }} />
              <span>is what % of</span>
              <input type="number" value={calc2Y} onChange={e => setCalc2Y(e.target.value)} style={{ width: '120px', padding: '8px', borderRadius: 'var(--radius-sm)', border: '1px solid var(--color-border)' }} />
              <span>?</span>
            </div>
            {res2 !== null && (
              <div style={{ marginTop: '16px', fontSize: '20px', fontWeight: 600, color: 'var(--color-primary)' }}>
                Result: {res2.toLocaleString('en-US', { maximumFractionDigits: 4 })}%
              </div>
            )}
          </div>

          {/* Calc 3 */}
          <div style={{ background: 'var(--color-bg)', padding: '24px', borderRadius: 'var(--radius-lg)', border: '1px solid var(--color-border)' }}>
            <h3 style={{ fontSize: '18px', marginBottom: '16px' }}>Percentage Increase/Decrease</h3>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px', flexWrap: 'wrap' }}>
              <span>From</span>
              <input type="number" value={calc3X} onChange={e => setCalc3X(e.target.value)} style={{ width: '120px', padding: '8px', borderRadius: 'var(--radius-sm)', border: '1px solid var(--color-border)' }} />
              <span>to</span>
              <input type="number" value={calc3Y} onChange={e => setCalc3Y(e.target.value)} style={{ width: '120px', padding: '8px', borderRadius: 'var(--radius-sm)', border: '1px solid var(--color-border)' }} />
            </div>
            {res3 !== null && (
              <div style={{ marginTop: '16px', fontSize: '20px', fontWeight: 600, color: res3 >= 0 ? 'var(--color-success)' : 'var(--color-error)' }}>
                {res3 >= 0 ? 'Increase' : 'Decrease'} of {Math.abs(res3).toLocaleString('en-US', { maximumFractionDigits: 4 })}%
              </div>
            )}
          </div>

        </div>

        <ToolPageLayout toolId="percentage-calculator" sections={['steps']} containerClassName="tool-seo-content" includeSEO={false} />

        <section>
          <h2>Frequently Asked Questions</h2>
          <FaqSection items={getToolFaqItems('percentage-calculator')} />
        </section>

        <RelatedTools currentPath="/percentage-calculator" />
      </div>
    </div>
  );
}
