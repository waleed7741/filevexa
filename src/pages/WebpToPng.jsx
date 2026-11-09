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
import { fileToPngBlob } from '../utils/imageHelpers'

const MAX_MB = 50
const ALLOWED_EXTS = ['webp']
const ALLOWED_MIMES = ['image/webp']

const FAQ = [
  {
    question: 'Does WebP to PNG preserve transparency?',
    answer:
      'Yes. PNG supports an alpha channel, so any transparency in your WebP image will be preserved in the output PNG file.',
  },
  {
    question: 'Is my file uploaded anywhere?',
    answer:
      'No. The conversion happens entirely inside your browser. Your file is never sent to a server.',
  },
  {
    question: 'Why might the PNG file be larger than the WebP?',
    answer:
      'PNG uses lossless compression, while WebP can use lossy compression. If your original WebP was compressed with lossy encoding, the PNG will represent the decoded (uncompressed) version and will naturally be larger.',
  },
  {
    question: 'Can I convert animated WebP to PNG?',
    answer:
      'This tool only converts the first frame of animated WebP files. Full animated WebP to APNG conversion is not supported.',
  },
]

const RELATED = [
  { label: 'WebP to JPG', href: '/webp-to-jpg', emoji: '🔄' },
  { label: 'HEIC to PNG', href: '/heic-to-png', emoji: '📸' },
  { label: 'HEIC to JPG', href: '/heic-to-jpg', emoji: '🖼️' },
  { label: 'AVIF to JPG', href: '/avif-to-jpg', emoji: '🎨' },
]

export default function WebpToPng() {
  const [file, setFile] = useState(null)
  const [status, setStatus] = useState('idle')
  const [error, setError] = useState('')
  const [resultUrl, setResultUrl] = useState(null)
  const [resultName, setResultName] = useState('')
  const revokeRef = useRef(null)

  const schema = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    "name": "WebP to PNG Converter",
    "url": "https://filevexa.pages.dev/webp-to-png",
    "description": "Convert WebP images to lossless, transparent PNG format directly in your browser. Free and private.",
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
      const blob = await fileToPngBlob(file)
      const { url, revoke } = createObjectUrl(blob)
      revokeRef.current = revoke
      setResultUrl(url)
      setResultName(replaceExtension(file.name, 'png'))
      setStatus('done')
    } catch (err) {
      console.error(err)
      setError(err.message || 'Something went wrong while converting this file. Please try again.')
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
        title="WebP to PNG Converter – Free Online | FileVexa"
        description="Convert WebP images to PNG online for free. Preserves transparency. Browser-based conversion, no signup required."
        canonical="https://filevexa.pages.dev/webp-to-png"
        schema={schema}
        faqs={FAQ}
      />
      <div className="container">
        <Breadcrumb items={[{ label: 'Home', href: '/' }, { label: 'WebP to PNG' }]} />

        <div className="tool-page-header">
          <h1>Free Online WebP to PNG Converter</h1>
          <p>Convert WebP images to PNG format, preserving transparency where possible.</p>
          <p className="privacy-notice">
            <span aria-hidden="true">🔒</span>
            Your files are processed locally and are not uploaded to any server.
          </p>
        </div>

        {status === 'idle' && !file && (
          <FileUploader
            accept=".webp,image/webp"
            acceptLabel=".webp"
            onFile={handleFile}
          />
        )}

        {file && status !== 'converting' && (
          <div className="file-info-card">
            <div className="file-info-icon" aria-hidden="true">🏞️</div>
            <div className="file-info-details">
              <div className="file-info-name">{file.name}</div>
              <div className="file-info-size">{formatBytes(file.size)}</div>
            </div>
            <button className="file-info-remove" onClick={handleReset} aria-label="Remove file">✕</button>
          </div>
        )}

        <ErrorMessage message={error} />

        {file && status !== 'converting' && status !== 'done' && (
          <div className="mt-6">
            <button id="convert-btn" className="btn btn-primary btn-lg" onClick={handleConvert}>
              Convert to PNG
            </button>
          </div>
        )}

        {status === 'converting' && <LoadingState message="Converting your WebP file to PNG…" />}

        {status === 'done' && resultUrl && (
          <div className="result-card mt-6">
            <div className="result-icon" aria-hidden="true">✓</div>
            <div className="result-info">
              <h3>Conversion successful!</h3>
              <p>{resultName}</p>
            </div>
            <div className="result-actions">
              <DownloadButton url={resultUrl} filename={resultName} label="Download PNG" />
              <button className="btn btn-ghost" onClick={handleReset}>Convert another file</button>
            </div>
          </div>
        )}

        <div className="tool-info">
          <ToolPageLayout toolId="webp-to-png" sections={['steps']} containerClassName="tool-seo-content" includeSEO={false} />

          <div className="info-section">
            <h2>About WebP to PNG conversion</h2>
            <p>
              PNG is a lossless image format that supports transparency (alpha channel). Converting WebP to PNG is useful
              when you need to preserve transparent backgrounds, or when working with applications that accept PNG but
              not WebP.
            </p>
            <p>
              This tool uses the browser's Canvas API to decode and re-encode the image entirely in-browser. No data
              leaves your device.
            </p>
          </div>

          <div className="info-section">
            <h2>Supported formats</h2>
            <ul>
              <li><strong>.webp</strong> – WebP images (with or without transparency)</li>
            </ul>
            <p className="mt-4"><strong>Output:</strong> PNG (.png) with transparency preserved.</p>
            <p><strong>Note:</strong> Animated WebP files are not fully supported; only the first frame is exported.</p>
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
