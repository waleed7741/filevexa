import Breadcrumb from '../components/Breadcrumb'
import SEO from '../components/SEO'

export default function Terms() {
  return (
    <div className="container">
      <SEO
        title="FileVexa Terms of Use: Browser-Based File Tools"
        description="Review the terms for using FileVexa's browser-based converters and utilities, including local processing, compatibility, and output limitations."
        canonical="https://filevexa.pages.dev/terms"
      />
      <div className="static-page">
        <Breadcrumb items={[{ label: 'Home', href: '/' }, { label: 'Terms of Use' }]} />
        <h1>Terms of Use</h1>
        <p className="page-meta">Last updated: November 2026</p>

        <h2>Acceptance of Terms</h2>
        <p>
          By accessing and using FileVexa, you accept and agree to be bound by these Terms of Use. If you do not agree
          to these terms, please do not use this service.
        </p>

        <h2>Description of Service</h2>
        <p>
          FileVexa provides image converters, PDF utilities, text tools, and calculators. The file tools process
          selected file contents in your browser rather than uploading them to a FileVexa file-processing service.
          The site itself must load over the network, and separate website analytics may run as described in the{' '}
          <a href="/privacy">Privacy Policy</a>.
        </p>

        <h2>Files, results, and compatibility</h2>
        <p>
          You are responsible for keeping a copy of your source files and checking each output before relying on or
          distributing it. Conversion quality, formatting, supported formats, and practical file size depend on the
          particular tool, browser, device memory, and source document. Scanned PDFs require OCR for text recognition;
          FileVexa's PDF text tools do not provide OCR. The service is not a substitute for professional, legal, or
          financial review.
        </p>
        <p>
          Do not use the tools to process files you do not have permission to use. FileVexa does not provide server
          storage, backups, or recovery of local files and generated results.
        </p>

        <h2>Permitted Use</h2>
        <p>You may use FileVexa for personal and commercial purposes, provided that you:</p>
        <ul>
          <li>Only convert files you own or have the legal right to convert</li>
          <li>Do not attempt to misuse, disrupt, or reverse-engineer the service</li>
          <li>Comply with all applicable laws and regulations</li>
        </ul>

        <h2>Intellectual Property</h2>
        <p>
          You retain full ownership of any files you convert using FileVexa. FileVexa does not claim any rights to your
          files or converted output.
        </p>

        <h2>Disclaimer of Warranties</h2>
        <p>
          FileVexa is provided "as is" to the extent permitted by applicable law. We do not guarantee continuous
          availability, compatibility with every browser or file, or that a conversion will preserve every element of
          the source. Check important results independently before use.
        </p>

        <h2>Limitation of Liability</h2>
        <p>
          To the fullest extent permitted by law, FileVexa shall not be liable for any indirect, incidental, special, or
          consequential damages arising from your use of the service.
        </p>

        <h2>Changes to Terms</h2>
        <p>
          We may update these terms as the service changes. The latest revision date appears at the top of this page.
          Your use of FileVexa is subject to the version currently published.
        </p>

        <h2>Contact</h2>
        <p>
          For questions about these terms, please contact us via the <a href="/contact">Contact page</a>.
        </p>
      </div>
    </div>
  )
}
