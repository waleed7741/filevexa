import { useEffect, useState, useRef } from 'react'
import Breadcrumb from '../components/Breadcrumb'
import FileUploader from '../components/FileUploader'
import LoadingState from '../components/LoadingState'
import ErrorMessage from '../components/ErrorMessage'
import DownloadButton from '../components/DownloadButton'
import FaqSection from '../components/FaqSection'
import RelatedTools from '../components/RelatedTools'
import SEO from '../components/SEO'
import { formatBytes, validateFileSize, validateFileType, replaceExtension, createObjectUrl } from '../utils/fileHelpers'

const MAX_MB = 50
const ALLOWED_EXTS = ['heic', 'heif']
const ALLOWED_MIMES = ['image/heic', 'image/heif', 'image/heic-sequence', 'image/heif-sequence']

const FAQ = [
  {
    question: 'What is a HEIC file?',
    answer:
      'HEIC (High Efficiency Image Container) is a file format used by Apple devices such as iPhone and Mac. It stores images more efficiently than JPEG, but many non-Apple apps and websites do not support it directly.',
  },
  {
    question: 'Will my file be uploaded to a server?',
    answer:
      'No. FileVexa converts HEIC files entirely inside your browser using JavaScript. Your file is never sent to any server.',
  },
  {
    question: 'Why is the converted file larger than the original?',
    answer:
      'HEIC uses a more efficient compression algorithm than JPEG. Converting to JPG can result in a larger file even at good quality settings. You can lower the quality slider to reduce the output size.',
  },
  {
    question: 'Can I convert HEIF files too?',
    answer:
      'Yes. HEIF (High Efficiency Image Format) is the underlying format that HEIC is based on. Both .heic and .heif files are supported.',
  },
  {
    question: 'What quality setting should I use?',
    answer:
      'The default quality of 90% is a good balance between file size and image quality. For photos you plan to print or edit further, use 95–100%. For web use, 80–90% is usually sufficient.',
  },
]

const RELATED = [
  { label: 'HEIC to PNG', href: '/heic-to-png', emoji: '📸' },
  { label: 'WebP to JPG', href: '/webp-to-jpg', emoji: '🔄' },
  { label: 'WebP to PNG', href: '/webp-to-png', emoji: '🏞️' },
  { label: 'AVIF to JPG', href: '/avif-to-jpg', emoji: '🎨' },
]

export default function HeicToJpg() {
  const [file, setFile] = useState(null)
  const [quality, setQuality] = useState(90)
  const [status, setStatus] = useState('idle') // idle | converting | done | error
  const [error, setError] = useState('')
  const [resultUrl, setResultUrl] = useState(null)
  const [resultName, setResultName] = useState('')
  const revokeRef = useRef(null)

  const schema = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    "name": "HEIC to JPG Converter",
    "url": "https://filevexa.pages.dev/heic-to-jpg",
    "description": "Convert HEIC and HEIF images from iPhone or Mac to JPG format directly in your browser. Fast, free, and completely private.",
    "applicationCategory": "UtilitiesApplication",
    "operatingSystem": "All",
    "offers": {
      "@type": "Offer",
      "price": "0",
      "priceCurrency": "USD"
    }
  };

  useEffect(() => {
    return () => {
      revokeRef.current?.()
    }
  }, [])

  function handleFile(f) {
    // Reset
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
      // Lazy-load heic2any only when needed
      const heic2any = (await import('heic2any')).default

      const blob = await heic2any({
        blob: file,
        toType: 'image/jpeg',
        quality: quality / 100,
      })

      // heic2any can return an array if the file is a burst
      const outputBlob = Array.isArray(blob) ? blob[0] : blob

      const { url, revoke } = createObjectUrl(outputBlob)
      revokeRef.current = revoke
      setResultUrl(url)
      setResultName(replaceExtension(file.name, 'jpg'))
      setStatus('done')
    } catch (err) {
      console.error(err)
      setError('Something went wrong while converting this file. Please make sure it is a valid HEIC image and try again.')
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
        title="HEIC to JPG Converter – Free Online | FileVexa"
        description="Convert HEIC images to JPG online for free. Fast browser-based HEIC to JPG conversion with no signup required."
        canonical="https://filevexa.pages.dev/heic-to-jpg"
        schema={schema}
      />
      <div className="container">
        <Breadcrumb items={[{ label: 'Home', href: '/' }, { label: 'HEIC to JPG' }]} />

        <div className="tool-page-header">
          <h1>HEIC to JPG Converter</h1>
          <p>Convert HEIC images to JPG quickly and easily. Your files are processed directly in your browser.</p>
          <p className="privacy-notice">
            <span aria-hidden="true">🔒</span>
            Your files are processed locally and are not uploaded to any server.
          </p>
        </div>

        {/* Upload */}
        {status === 'idle' && !file && (
          <FileUploader
            accept=".heic,.heif,image/heic,image/heif"
            acceptLabel=".heic, .heif"
            onFile={handleFile}
          />
        )}

        {/* File selected – show info */}
        {file && status !== 'converting' && (
          <div className="file-info-card">
            <div className="file-info-icon" aria-hidden="true">🖼️</div>
            <div className="file-info-details">
              <div className="file-info-name">{file.name}</div>
              <div className="file-info-size">{formatBytes(file.size)}</div>
            </div>
            <button className="file-info-remove" onClick={handleReset} aria-label="Remove file and start over">
              ✕
            </button>
          </div>
        )}

        {/* Quality control */}
        {file && status !== 'converting' && status !== 'done' && (
          <div className="quality-control">
            <label htmlFor="quality-slider">JPG Quality</label>
            <input
              id="quality-slider"
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

        {/* Error */}
        <ErrorMessage message={error} />

        {/* Convert button */}
        {file && status !== 'converting' && status !== 'done' && (
          <div className="mt-6">
            <button
              id="convert-btn"
              className="btn btn-primary btn-lg"
              onClick={handleConvert}
              aria-label="Convert file to JPG"
            >
              Convert to JPG
            </button>
          </div>
        )}

        {/* Converting */}
        {status === 'converting' && <LoadingState message="Converting your HEIC file to JPG…" />}

        {/* Result */}
        {status === 'done' && resultUrl && (
          <div className="result-card mt-6">
            <div className="result-icon" aria-hidden="true">✓</div>
            <div className="result-info">
              <h3>Conversion successful!</h3>
              <p>{resultName}</p>
            </div>
            <div className="result-actions">
              <DownloadButton url={resultUrl} filename={resultName} label="Download JPG" />
              <button className="btn btn-ghost" onClick={handleReset}>
                Convert another file
              </button>
            </div>
          </div>
        )}

        {/* Tool Info */}
        <div className="tool-info">
          <div className="info-section">
            <h2>How to convert HEIC to JPG</h2>
            <ol>
              <li>Click <strong>Choose File</strong> or drag and drop your HEIC file into the upload area.</li>
              <li>Adjust the <strong>JPG Quality</strong> slider if needed (90% is recommended for most uses).</li>
              <li>Click <strong>Convert to JPG</strong> and wait a moment.</li>
              <li>Click <strong>Download JPG</strong> to save your converted image.</li>
            </ol>
          </div>

          <div className="info-section">
            <h2>About HEIC to JPG conversion</h2>
            <p>
              HEIC (High Efficiency Image Container) is the default image format on iPhones and iPads running iOS 11 or
              later. While HEIC offers better compression than JPEG, many applications, websites, and Windows systems do
              not natively support it.
            </p>
            <p>
              Converting to JPG ensures your images can be opened anywhere — in Windows Photo Viewer, on websites, in
              design tools, and by anyone you share them with.
            </p>
            <p>
              FileVexa uses the open-source <strong>heic2any</strong> library to decode HEIC/HEIF files directly inside
              your browser. No plugins or software installation required.
            </p>
          </div>

          <div className="info-section">
            <h2>Supported formats</h2>
            <ul>
              <li><strong>.heic</strong> – Standard HEIC images from iPhone and iPad</li>
              <li><strong>.heif</strong> – HEIF images (the base format underlying HEIC)</li>
            </ul>
            <p className="mt-4">
              <strong>Output:</strong> JPEG (.jpg) with your chosen quality setting.
            </p>
            <p>
              <strong>Limitations:</strong> HEIC burst photos and live photos may only export the primary frame. Very
              large files may be slow to process depending on your device.
            </p>
          </div>

          <div className="info-section">
            <h2>Frequently asked questions</h2>
            <FaqSection items={FAQ} />
          </div>

          <RelatedTools tools={RELATED} />
        </div>
      </div>
    </div>
  )
}
