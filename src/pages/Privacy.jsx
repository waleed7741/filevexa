import { useEffect } from 'react'
import { setPageMeta } from '../utils/seoHelpers'
import Breadcrumb from '../components/Breadcrumb'

export default function Privacy() {
  useEffect(() => {
    setPageMeta({
      title: 'Privacy Policy | FileVexa',
      description: 'FileVexa privacy policy. Learn how we handle your files and data.',
      canonical: 'https://filevexa.pages.dev/privacy',
    })
  }, [])

  return (
    <div className="container">
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
        <p>
          <strong>All file conversion on FileVexa happens entirely inside your browser.</strong> When you use a
          conversion tool on FileVexa, your files are processed using JavaScript running locally on your device.
        </p>
        <p>
          Your files are <strong>never uploaded to our servers</strong>, stored on our servers, or transmitted to any
          third party. We have no access to the content of your files.
        </p>

        <h2>Data We Do Not Collect</h2>
        <ul>
          <li>File content or file names</li>
          <li>Converted output files</li>
          <li>Personal information (we have no accounts or login system)</li>
        </ul>

        <h2>Analytics and Cookies</h2>
        <p>
          FileVexa does not currently use any analytics services or tracking cookies. If this changes in the future, this
          policy will be updated to reflect it.
        </p>

        <h2>Third-Party Libraries</h2>
        <p>
          FileVexa uses open-source JavaScript libraries (such as heic2any) that run entirely in your browser. These
          libraries do not transmit your files or data externally.
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
