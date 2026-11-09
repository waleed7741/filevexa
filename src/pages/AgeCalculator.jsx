import { useState, useEffect } from 'react';
import SEO from '../components/SEO';
import RelatedTools from '../components/RelatedTools';
import FaqSection from '../components/FaqSection';
import ToolPageLayout from '../components/ToolPageLayout';
import { getToolFaqItems } from '../config/toolsSEOData';

export default function AgeCalculator() {
  const [dob, setDob] = useState('1990-01-01');
  const [endDate, setEndDate] = useState(new Date().toISOString().split('T')[0]);
  const [result, setResult] = useState(null);

  const schema = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    "name": "Exact Age Calculator",
    "url": "https://filevexa.pages.dev/age-calculator",
    "description": "Calculate your exact age in years, months, and days with next birthday countdown.",
    "applicationCategory": "UtilitiesApplication",
    "operatingSystem": "All",
    "offers": { "@type": "Offer", "price": "0", "priceCurrency": "USD" }
  };

  const calculateAge = () => {
    if (!dob || !endDate) return;

    const start = new Date(dob);
    const end = new Date(endDate);

    if (start > end) {
      setResult({ error: 'Date of birth cannot be after the end date.' });
      return;
    }

    let years = end.getFullYear() - start.getFullYear();
    let months = end.getMonth() - start.getMonth();
    let days = end.getDate() - start.getDate();

    if (days < 0) {
      months -= 1;
      const previousMonth = new Date(end.getFullYear(), end.getMonth(), 0).getDate();
      days += previousMonth;
    }

    if (months < 0) {
      years -= 1;
      months += 12;
    }

    setResult({ years, months, days });
  };

  useEffect(() => {
    calculateAge();
  }, []);

  return (
    <div className="tool-page">
      <SEO
        title="Exact Age Calculator | Calculate Years, Months, Days"
        description="Calculate your exact age in years, months, and days. Free online chronological age calculator."
        canonical="https://filevexa.pages.dev/age-calculator"
        schema={schema}
      />
      <div className="container" style={{ maxWidth: '600px' }}>
        <nav className="breadcrumb">
          <a href="/">Home</a> <span className="breadcrumb-sep">/</span> <span aria-current="page">Age Calculator</span>
        </nav>

        <header className="tool-page-header">
          <h1>Free Online Age Calculator</h1>
          <p>Find out exactly how old you are in years, months, and days.</p>
        </header>

        <div style={{ background: 'var(--color-bg)', padding: '32px', borderRadius: 'var(--radius-lg)', border: '1px solid var(--color-border)', marginBottom: '40px' }}>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '20px', marginBottom: '24px' }}>
            <label style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
              <span style={{ fontWeight: 600 }}>Date of Birth</span>
              <input type="date" value={dob} onChange={(e) => setDob(e.target.value)} style={{ padding: '12px', borderRadius: 'var(--radius-md)', border: '1px solid var(--color-border)', fontSize: '16px' }} />
            </label>

            <label style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
              <span style={{ fontWeight: 600 }}>Calculate age at the date of</span>
              <input type="date" value={endDate} onChange={(e) => setEndDate(e.target.value)} style={{ padding: '12px', borderRadius: 'var(--radius-md)', border: '1px solid var(--color-border)', fontSize: '16px' }} />
            </label>
          </div>

          <button className="btn btn-primary" style={{ width: '100%', marginBottom: '24px' }} onClick={calculateAge}>Calculate Age</button>

          {result && !result.error && (
            <div style={{ background: 'var(--color-bg-subtle)', padding: '24px', borderRadius: 'var(--radius-md)', textAlign: 'center', border: '1px solid var(--color-border)' }}>
              <h3 style={{ fontSize: '14px', color: 'var(--color-text-secondary)', textTransform: 'uppercase', letterSpacing: '1px', marginBottom: '12px' }}>Your Age Is</h3>
              <div style={{ fontSize: '32px', fontWeight: 800, color: 'var(--color-primary)' }}>
                {result.years} <span style={{ fontSize: '18px', fontWeight: 500, color: 'var(--color-text)' }}>years,</span> {result.months} <span style={{ fontSize: '18px', fontWeight: 500, color: 'var(--color-text)' }}>months,</span> {result.days} <span style={{ fontSize: '18px', fontWeight: 500, color: 'var(--color-text)' }}>days</span>
              </div>
            </div>
          )}
          {result?.error && (
            <div style={{ color: 'var(--color-error)', padding: '16px', background: 'var(--color-error-bg)', borderRadius: 'var(--radius-md)', textAlign: 'center' }}>
              {result.error}
            </div>
          )}
        </div>

        <ToolPageLayout toolId="age-calculator" sections={['steps']} containerClassName="tool-seo-content" includeSEO={false} />

        <section>
          <h2>Frequently Asked Questions</h2>
          <FaqSection items={getToolFaqItems('age-calculator')} />
        </section>

        <RelatedTools currentPath="/age-calculator" />
      </div>
    </div>
  );
}
