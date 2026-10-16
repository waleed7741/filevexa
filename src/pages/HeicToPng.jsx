import { useEffect, useState, useRef } from 'react'
import Breadcrumb from '../components/Breadcrumb'
import FileUploader from '../components/FileUploader'
import LoadingState from '../components/LoadingState'
import ErrorMessage from '../components/ErrorMessage'
import DownloadButton from '../components/DownloadButton'
import FaqSection from '../components/FaqSection'
import RelatedTools from '../components/RelatedTools'
import { setPageMeta } from '../utils/seoHelpers'
import { formatBytes, validateFileSize, validateFileType, replaceExtension, createObjectUrl } from '../utils/fileHelpers'

const MAX_MB = 50
const ALLOWED_EXTS = ['heic', 'heif']
const ALLOWED_MIMES = ['image/heic', 'image/heif', 'image/heic-sequence', 'image/heif-sequence']

const FAQ = [
  {
    question: 'Why convert HEIC to PNG instead of JPG?',
    answer:
      'PNG uses lossless compression, which means no quality is lost during conversion. If you need to edit the image further or require a transparent background, PNG is the better choice.',
  },
  {
    question: 'Are my files uploaded?',
    answer: 'No. All processing happens in your browser. Your files never leave your device.',
  },
  {
    question: 'Does HEIC to PNG preserve the full image quality?',
    answer:
      'Yes. PNG is lossless, so the converted PNG will represent the decoded HEIC image without any additional quality loss.',
  },
]

const RELATED = [
  { label: 'HEIC to JPG', href: '/heic-to-jpg', emoji: '🖼️' },
  { label: 'WebP to PNG', href: '/webp-to-png', emoji: '🏞️' },
  { label: 'WebP to JPG', href: '/webp-to-jpg', emoji: '🔄' },
]

export default function HeicToPng() {
  const [file, setFile] = useState(null)
  const [status, setStatus] = useState('idle')
  const [error, setError] = useState('')
  const [resultUrl, setResultUrl] = useState(null)
  const [resultName, setResultName] = useState('')
  const revokeRef = useRef(null)

  useEffect(() => {
    setPageMeta({
      title: 'HEIC to PNG Converter – Free Online | FileVexa',
      description:
        'Convert HEIC images to PNG online for free. Lossless browser-based conversion, no signup required.',
      canonical: 'https://filevexa.pages.dev/heic-to-png',
    })
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
      const heic2any = (await import('heic2any')).default
      const blob = await heic2any({ blob: file, toType: 'image/png' })
      const outputBlob = Array.isArray(blob) ? blob[0] : blob
      const { url, revoke } = createObjectUrl(outputBlob)
      revokeRef.current = revoke
      setResultUrl(url)
      setResultName(replaceExtension(file.name, 'png'))
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
      <div className="container">
        <Breadcrumb items={[{ label: 'Home', href: '/' }, { label: 'HEIC to PNG' }]} />
        <div className="tool-page-header">
          <h1>HEIC to PNG Converter</h1>
          <p>Convert HEIC/HEIF images to PNG format. Lossless output, no upload required.</p>
          <p className="privacy-notice"><span aria-hidden="true">🔒</span> Your files are processed locally and are not uploaded to any server.</p>
        </div>

        {status === 'idle' && !file && (
          <FileUploader accept=".heic,.heif,image/heic,image/heif" acceptLabel=".heic, .heif" onFile={handleFile} />
        )}

        {file && status !== 'converting' && (
          <div className="file-info-card">
            <div className="file-info-icon" aria-hidden="true">📸</div>
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
            <button id="convert-btn" className="btn btn-primary btn-lg" onClick={handleConvert}>Convert to PNG</button>
          </div>
        )}

        {status === 'converting' && <LoadingState message="Converting your HEIC file to PNG…" />}

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
          <div className="info-section">
            <h2>How to convert HEIC to PNG</h2>
            <ol>
              <li>Click <strong>Choose File</strong> or drag your HEIC file into the upload area.</li>
              <li>Click <strong>Convert to PNG</strong>.</li>
              <li>Click <strong>Download PNG</strong> to save the result.</li>
            </ol>
          </div>
          <div className="info-section">
            <h2>About HEIC to PNG</h2>
            <p>PNG is a lossless image format widely supported across all platforms and devices. Converting HEIC to PNG is ideal when image quality is a priority and file size is less of a concern.</p>
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
