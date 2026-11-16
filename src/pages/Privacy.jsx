import Breadcrumb from '../components/Breadcrumb'
import SEO from '../components/SEO'

export default function Privacy() {
  return (
    <div className="container">
      <SEO
        title="FileVexa Privacy Policy: Local File Processing & Data"
        description="Learn what FileVexa processes in your browser, what the site analytics script may collect, and how to protect files on shared devices."
        canonical="https://filevexa.pages.dev/privacy"
      />
      <div className="static-page">
        <Breadcrumb items={[{ label: 'Home', href: '/' }, { label: 'Privacy Policy' }]} />
        <h1>Privacy Policy</h1>
        <p className="page-meta">Last updated: November 2026</p>

        <h2>Overview</h2>
        <p>
          FileVexa provides image, PDF, text, and utility tools. File contents selected for conversion or editing are
          processed by the tool in your browser; FileVexa does not send those file contents to a FileVexa file-processing
          server or store uploaded copies.
        </p>

        <h2>Files and local processing</h2>
        <p>
          Image and PDF tools read the file you select using browser capabilities and create the result in the page.
          Text utilities and calculators work with information entered into their controls. Temporary previews and
          results may remain in the open page while you use a tool; close the page when finished and keep your own
          original file. The site does not provide cloud backup or account storage.
        </p>
        <p>
          File handling depends on your browser and device. Large or complex files can use substantial memory, and
          unsupported or damaged files may fail. Use an up-to-date browser, review each tool's stated formats and
          limits, and check the downloaded result before sharing it.
        </p>

        <h2>Website requests and analytics</h2>
        <ul>
          <li>You can use the tools without creating a FileVexa account.</li>
          <li>The site loads Cloudflare Web Analytics. A page analytics request is separate from the local file-processing flow; consult Cloudflare's privacy information for its handling of analytics requests.</li>
          <li>Contacting us by email sends the message and any details you include through your email provider. Do not attach confidential files unless you are comfortable sending them by email.</li>
        </ul>

        <h2>Browser storage and your device</h2>
        <p>
          FileVexa registers a service worker to cache site resources and support offline loading. This cache is for
          the site experience, not a destination for your selected documents. Browser extensions, shared-device access,
          malware, and the settings of your device or browser are outside FileVexa's control.
        </p>

        <h2>Libraries and external services</h2>
        <p>
          The tools use JavaScript libraries delivered as part of the site to read and transform files in your browser.
          Loading the website requires network requests for site resources, and analytics is described above. The
          selected file contents are not sent to those library maintainers by FileVexa's tool workflow.
        </p>

        <h2>Children's privacy</h2>
        <p>
          FileVexa is a general-purpose utility site and is not designed to collect personal information from children.
          If you have a question about information sent to us by email, contact us using the details on the{' '}
          <a href="/contact">Contact page</a>.
        </p>

        <h2>Changes to this policy</h2>
        <p>
          We may revise this policy when the site or its data practices change. The latest revision date appears at the
          top of this page.
        </p>

        <h2>Contact</h2>
        <p>
          If you have any questions about this Privacy Policy, please contact us via the{' '}
          <a href="/contact">Contact page</a>.
        </p>
      </div>
    </div>
  )
}
