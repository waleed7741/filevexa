import Breadcrumb from '../components/Breadcrumb'
import SEO from '../components/SEO'

export default function Privacy() {
  return (
    <div className="container">
      <SEO
        title="Privacy Policy | FileVexa"
        description="FileVexa privacy policy. Learn how we handle your files and data."
        canonical="https://filevexa.pages.dev/privacy"
      />
      <div className="static-page">
        <Breadcrumb items={[{ label: 'Home', href: '/' }, { label: 'Privacy Policy' }]} />
        <h1>Privacy Policy</h1>
        <p className="page-meta">Last updated: September 2026</p>

        <h2>Overview</h2>
        <p>
          FileVexa is a browser-based file conversion service. We are committed to protecting your privacy. This page
          explains how FileVexa handles files and data.
        </p>

        <h2>File Processing</h2>
        <p>FileVexa's image and PDF tools process selected files entirely in your browser. File contents are not uploaded to a processing service.</p>

        <h2>Data Handling</h2>
        <ul>
          <li>FileVexa does not ask for personal information or require an account.</li>
          <li>Browser-based tools keep file contents in your device's browser while processing.</li>
        </ul>

        <h2>Analytics and Cookies</h2>
        <p>
          FileVexa does not currently use any analytics services or tracking cookies. If this changes in the future, this
          policy will be updated to reflect it.
        </p>

        <h2>Third-Party Libraries</h2>
        <p>
          FileVexa uses open-source JavaScript libraries to power browser-based tools. File contents are processed
          locally and are not sent to library maintainers.
        </p>

        <h2>Children's Privacy</h2>
        <p>
          FileVexa does not knowingly collect personal information from children under 13. If you are under 13, please
          do not use this service without parental guidance.
        </p>

        <h2>Changes to This Policy</h2>
        <p>
          We may update this Privacy Policy from time to time. Any changes will be reflected on this page with an
          updated date.
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
