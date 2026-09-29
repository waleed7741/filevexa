import ToolCard from './ToolCard';

const UTILITY_TOOLS = [
  {
    title: 'QR Code Generator',
    desc: 'Create free, permanent QR codes online instantly. No signup required.',
    href: '/qr-code-generator',
    icon: '📱',
    type: 'utility',
  },
  {
    title: 'Word Counter',
    desc: 'Accurate online tool to count words, characters, sentences, and paragraphs.',
    href: '/word-counter',
    icon: '🔤',
    type: 'utility',
  },
  {
    title: 'Password Generator',
    desc: 'Generate strong, secure, random passwords directly in your browser.',
    href: '/password-generator',
    icon: '🔐',
    type: 'utility',
  },
];

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
