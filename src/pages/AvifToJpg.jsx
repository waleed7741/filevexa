import { useEffect, useState, useRef } from 'react'
import Breadcrumb from '../components/Breadcrumb'
import FileUploader from '../components/FileUploader'
import LoadingState from '../components/LoadingState'
import ErrorMessage from '../components/ErrorMessage'
import DownloadButton from '../components/DownloadButton'
import FaqSection from '../components/FaqSection'
import RelatedTools from '../components/RelatedTools'
import ToolPageLayout from '../components/ToolPageLayout'
import SEO from '../components/SEO'
import { formatBytes, validateFileSize, validateFileType, replaceExtension, createObjectUrl } from '../utils/fileHelpers'
import { fileToJpegBlob } from '../utils/imageHelpers'

const MAX_MB = 50
const ALLOWED_EXTS = ['avif']
const ALLOWED_MIMES = ['image/avif']

const FAQ = [
  {
    question: 'What is AVIF?',
    answer:
      'AVIF (AV1 Image File Format) is a modern image format based on the AV1 video codec. It offers excellent compression and quality but is not yet supported by all software.',
  },
  {
    question: 'Does this work in all browsers?',
    answer:
      'AVIF decoding depends on your browser. Chrome 85+, Firefox 93+, and Safari 16+ support AVIF. If your browser does not support AVIF, you will see a clear error message.',
  },
  {
    question: 'Are my files uploaded?',
    answer: 'No. Everything happens inside your browser. Your AVIF file never leaves your device.',
  },
  {
    question: 'What if my browser says it cannot decode the file?',
    answer:
      'Update your browser to the latest version. Chrome, Edge, and Firefox all support AVIF in recent versions. If the problem persists, your file may be corrupted or in an unsupported variant.',
  },
]

const RELATED = [
  { label: 'WebP to JPG', href: '/webp-to-jpg', emoji: '🔄' },
  { label: 'HEIC to JPG', href: '/heic-to-jpg', emoji: '🖼️' },
  { label: 'WebP to PNG', href: '/webp-to-png', emoji: '🏞️' },
]

export default function AvifToJpg() {
  const [file, setFile] = useState(null)
  const [quality, setQuality] = useState(92)
  const [status, setStatus] = useState('idle')
  const [error, setError] = useState('')
  const [resultUrl, setResultUrl] = useState(null)
  const [resultName, setResultName] = useState('')
  const revokeRef = useRef(null)

  const schema = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    "name": "AVIF to JPG Converter",
    "url": "https://filevexa.pages.dev/avif-to-jpg",
    "description": "Convert modern AVIF images to universally supported JPG format fast and locally in your browser.",
    "applicationCategory": "UtilitiesApplication",
    "operatingSystem": "All",
    "offers": {
      "@type": "Offer",
      "price": "0",
      "priceCurrency": "USD"
    }
  };

  useEffect(() => {
    return () => revokeRef.current?.()
  }, [])

  function handleFile(f) {
    revokeRef.current?.()
    setResultUrl(null)
    setError('')
    setStatus('idle')

    const sizeErr = validateFileSize(f, MAX_MB)
    if (sizeErr) { setError(sizeErr); return }

    const typeErr = validateFileType(f, ALLOWED_MIMES, ALLOWED_EXTS)
    if (typeErr) { setError(typeErr); return }

    setFile(f)
  }

  async function handleConvert() {
    if (!file) return
    setStatus('converting')
    setError('')

    try {
      const blob = await fileToJpegBlob(file, quality / 100)
      const { url, revoke } = createObjectUrl(blob)
      revokeRef.current = revoke
      setResultUrl(url)
      setResultName(replaceExtension(file.name, 'jpg'))
      setStatus('done')
    } catch (err) {
      console.error(err)
      if (err.message && err.message.includes('load')) {
        setError('Your browser may not support this AVIF file. Please update your browser to the latest version and try again.')
      } else {
        setError(err.message || 'Something went wrong while converting this file. Please try again.')
      }
      setStatus('error')
    }
  }

  function handleReset() {
    revokeRef.current?.()
    setFile(null)
    setResultUrl(null)
    setResultName('')
    setError('')
    setStatus('idle')
  }

  return (
    <div className="tool-page">
      <SEO
        title="AVIF to JPG Converter – Free Online | FileVexa"
        description="Convert AVIF images to JPG online for free. Uses your browser's built-in AVIF support. No signup, no upload."
        canonical="https://filevexa.pages.dev/avif-to-jpg"
        schema={schema}
        faqs={FAQ}
      />
      <div className="container">
        <Breadcrumb items={[{ label: 'Home', href: '/' }, { label: 'AVIF to JPG' }]} />
        <div className="tool-page-header">
          <h1>Free Online AVIF to JPG Converter</h1>
          <p>Convert AVIF images to JPG using your browser's built-in image support. Fast, private, and free.</p>
          <p className="privacy-notice"><span aria-hidden="true">🔒</span> Your files are processed locally and are not uploaded to any server.</p>
        </div>

        {status === 'idle' && !file && (
          <FileUploader accept=".avif,image/avif" acceptLabel=".avif" onFile={handleFile} />
        )}

        {file && status !== 'converting' && (
          <div className="file-info-card">
            <div className="file-info-icon" aria-hidden="true">🎨</div>
            <div className="file-info-details">
              <div className="file-info-name">{file.name}</div>
              <div className="file-info-size">{formatBytes(file.size)}</div>
            </div>
            <button className="file-info-remove" onClick={handleReset} aria-label="Remove file">✕</button>
          </div>
        )}

        {file && status !== 'converting' && status !== 'done' && (
          <div className="quality-control">
            <label htmlFor="quality-slider-avif">JPG Quality</label>
            <input
              id="quality-slider-avif"
              type="range"
              className="quality-slider"
              min="60"
              max="100"
              step="5"
              value={quality}
              onChange={(e) => setQuality(Number(e.target.value))}
              aria-valuenow={quality}
              aria-valuemin={60}
              aria-valuemax={100}
              aria-valuetext={`${quality}%`}
            />
            <span className="quality-value" aria-hidden="true">{quality}%</span>
          </div>
        )}

        <ErrorMessage message={error} />

        {file && status !== 'converting' && status !== 'done' && (
          <div className="mt-6">
            <button id="convert-btn" className="btn btn-primary btn-lg" onClick={handleConvert}>Convert to JPG</button>
          </div>
        )}

        {status === 'converting' && <LoadingState message="Converting your AVIF file to JPG…" />}

        {status === 'done' && resultUrl && (
          <div className="result-card mt-6">
            <div className="result-icon" aria-hidden="true">✓</div>
            <div className="result-info">
              <h3>Conversion successful!</h3>
              <p>{resultName}</p>
            </div>
            <div className="result-actions">
              <DownloadButton url={resultUrl} filename={resultName} label="Download JPG" />
              <button className="btn btn-ghost" onClick={handleReset}>Convert another file</button>
            </div>
          </div>
        )}

        <div className="tool-info">
          <ToolPageLayout toolId="avif-to-jpg" sections={['steps']} containerClassName="tool-seo-content" includeSEO={false} />
          <div className="info-section">
            <h2>About AVIF to JPG conversion</h2>
            <p>AVIF is a next-generation image format that offers impressive compression and quality. However, it is not yet supported by all applications. Converting to JPG ensures broad compatibility.</p>
            <p>This tool relies on your browser's native AVIF decoding capability and uses the Canvas API to re-encode the image as JPEG. No external services are used.</p>
          </div>
          <div className="info-section">
            <h2>Frequently Asked Questions</h2>
            <FaqSection items={FAQ} />
          </div>
          <RelatedTools tools={RELATED} />
        </div>
      </div>
    </div>
  )
}
