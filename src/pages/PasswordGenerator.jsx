import { useState, useEffect } from 'react';
import { setPageMeta } from '../utils/seoHelpers';
import RelatedTools from '../components/RelatedTools';

export default function PasswordGenerator() {
  const [length, setLength] = useState(16);
  const [useUpper, setUseUpper] = useState(true);
  const [useLower, setUseLower] = useState(true);
  const [useNumbers, setUseNumbers] = useState(true);
  const [useSymbols, setUseSymbols] = useState(true);
  const [password, setPassword] = useState('');

  const generatePassword = () => {
    let charset = '';
    if (useUpper) charset += 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    if (useLower) charset += 'abcdefghijklmnopqrstuvwxyz';
    if (useNumbers) charset += '0123456789';
    if (useSymbols) charset += '!@#$%^&*()_+~`|}{[]:;?><,./-=';

    if (charset === '') {
      setPassword('Select at least one option');
      return;
    }

    let newPassword = '';
    const randomValues = new Uint32Array(length);
    window.crypto.getRandomValues(randomValues);

    for (let i = 0; i < length; i++) {
      newPassword += charset[randomValues[i] % charset.length];
    }
    setPassword(newPassword);
  };

  useEffect(() => {
    generatePassword();
  }, []);

  useEffect(() => {
    setPageMeta({
      title: 'Free Random Password Generator | Secure & Private | FileVexa',
      description: 'Generate strong, secure, random passwords online. 100% private - passwords are created in your browser and never sent to our servers.',
      canonical: 'https://filevexa.pages.dev/password-generator',
    });
  }, []);

  const schema = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    "name": "Secure Password Generator",
    "url": "https://filevexa.pages.dev/password-generator",
    "description": "Generate strong, secure, random passwords online.",
    "applicationCategory": "SecurityApplication",
    "operatingSystem": "All",
    "offers": {
      "@type": "Offer",
      "price": "0",
      "priceCurrency": "USD"
    }
  };

  const copyToClipboard = () => {
    if (password && password !== 'Select at least one option') {
      navigator.clipboard.writeText(password);
      alert('Password copied to clipboard!');
    }
  };

  return (
    <div className="tool-page">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />

      <div className="container" style={{ maxWidth: '600px' }}>
        <nav className="breadcrumb" aria-label="Breadcrumb">
          <a href="/">Home</a>
          <span className="breadcrumb-sep">/</span>
          <span aria-current="page">Password Generator</span>
        </nav>

        <header className="tool-page-header">
          <h1>Secure Password Generator</h1>
          <p>Create strong, complex passwords instantly. Your passwords are never stored or transmitted.</p>
        </header>

        <div style={{ background: 'var(--color-bg)', padding: '32px', borderRadius: 'var(--radius-lg)', border: '1px solid var(--color-border)', marginBottom: '40px' }}>

          <div style={{ display: 'flex', gap: '12px', marginBottom: '24px' }}>
            <input
              type="text"
              value={password}
              readOnly
              style={{ flex: 1, padding: '16px', fontSize: '20px', fontFamily: 'monospace', borderRadius: 'var(--radius-md)', border: '2px solid var(--color-border)', background: 'var(--color-bg-subtle)' }}
            />
            <button onClick={copyToClipboard} className="btn btn-primary">Copy</button>
          </div>

          <div style={{ marginBottom: '24px' }}>
            <label style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px', fontWeight: 600 }}>
              Password Length: <span>{length}</span>
            </label>
            <input
              type="range"
              min="4"
              max="64"
              value={length}
              onChange={(e) => setLength(Number(e.target.value))}
              style={{ width: '100%' }}
            />
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', marginBottom: '24px' }}>
            <label style={{ display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer' }}>
              <input type="checkbox" checked={useUpper} onChange={(e) => setUseUpper(e.target.checked)} />
              Uppercase Letters (A-Z)
            </label>
            <label style={{ display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer' }}>
              <input type="checkbox" checked={useLower} onChange={(e) => setUseLower(e.target.checked)} />
              Lowercase Letters (a-z)
            </label>
            <label style={{ display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer' }}>
              <input type="checkbox" checked={useNumbers} onChange={(e) => setUseNumbers(e.target.checked)} />
              Numbers (0-9)
            </label>
            <label style={{ display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer' }}>
              <input type="checkbox" checked={useSymbols} onChange={(e) => setUseSymbols(e.target.checked)} />
              Symbols (!@#$%)
            </label>
          </div>

          <button onClick={generatePassword} className="btn btn-secondary" style={{ width: '100%' }}>
            Generate New Password
          </button>
        </div>

        <section style={{ marginBottom: '40px' }}>
          <h2>How to generate a secure password</h2>
          <p style={{ marginTop: '12px', lineHeight: '1.6' }}>
            Adjust the slider to choose your desired password length (we recommend at least 16 characters). Toggle the checkboxes to include or exclude uppercase, lowercase, numbers, or symbols. The password is created using cryptographically secure random number generation right in your browser.
          </p>
        </section>

        <section>
          <h2>Frequently Asked Questions</h2>
          <div style={{ marginTop: '16px', display: 'flex', flexDirection: 'column', gap: '16px' }}>
            <div style={{ padding: '16px', background: 'var(--color-bg-subtle)', borderRadius: 'var(--radius-md)' }}>
              <h3 style={{ fontSize: '16px', marginBottom: '8px' }}>Are the passwords saved or tracked?</h3>
              <p style={{ fontSize: '14px', margin: 0 }}>Absolutely not. We do not use servers, databases, or cookies to track the passwords you generate. Your password exists only on your device.</p>
            </div>
            <div style={{ padding: '16px', background: 'var(--color-bg-subtle)', borderRadius: 'var(--radius-md)' }}>
              <h3 style={{ fontSize: '16px', marginBottom: '8px' }}>What makes a password strong?</h3>
              <p style={{ fontSize: '14px', margin: 0 }}>A strong password is long (12+ characters), unpredictable, and utilizes a mix of various character types like letters, numbers, and symbols.</p>
            </div>
          </div>
        </section>

        <RelatedTools currentPath="/password-generator" />
      </div>
    </div>
  );
}
