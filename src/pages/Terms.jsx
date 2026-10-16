import { useEffect } from 'react'
import { setPageMeta } from '../utils/seoHelpers'
import Breadcrumb from '../components/Breadcrumb'

export default function Terms() {
  useEffect(() => {
    setPageMeta({
      title: 'Terms of Use | FileVexa',
      description: 'FileVexa Terms of Use. Read our terms before using our free file conversion tools.',
      canonical: 'https://filevexa.pages.dev/terms',
    })
  }, [])

  return (
    <div className="container">
      <div className="static-page">
        <Breadcrumb items={[{ label: 'Home', href: '/' }, { label: 'Terms of Use' }]} />
        <h1>Terms of Use</h1>
        <p className="page-meta">Last updated: September 2026</p>

        <h2>Acceptance of Terms</h2>
        <p>
          By accessing and using FileVexa, you accept and agree to be bound by these Terms of Use. If you do not agree
          to these terms, please do not use this service.
        </p>

        <h2>Description of Service</h2>
        <p>
          FileVexa provides free, browser-based file conversion tools. All processing is performed locally in your
          browser. We do not store, transmit, or process your files on our servers.
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
          FileVexa is provided "as is" without any warranties, expressed or implied. We do not guarantee that the
          service will be error-free, uninterrupted, or produce perfectly accurate conversions in all cases.
        </p>

        <h2>Limitation of Liability</h2>
        <p>
          To the fullest extent permitted by law, FileVexa shall not be liable for any indirect, incidental, special, or
          consequential damages arising from your use of the service.
        </p>

        <h2>Changes to Terms</h2>
        <p>
          We may update these Terms of Use from time to time. Continued use of the service after changes constitutes
          acceptance of the revised terms.
        </p>

        <h2>Contact</h2>
        <p>
          For questions about these terms, please contact us via the <a href="/contact">Contact page</a>.
        </p>
      </div>
    </div>
  )
}
