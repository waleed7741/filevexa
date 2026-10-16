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
import { fileToJpegBlob } from '../utils/imageHelpers'

const MAX_MB = 50
const ALLOWED_EXTS = ['webp']
const ALLOWED_MIMES = ['image/webp']

const FAQ = [
  {
    question: 'What is WebP?',
    answer:
      'WebP is a modern image format developed by Google that provides excellent compression. It is widely used on the web but may not be supported by all software or devices.',
  },
  {
    question: 'Will my file be uploaded?',
    answer:
      'No. All conversion happens inside your browser using the Canvas API. Your file never leaves your device.',
  },
  {
    question: 'Why does my transparent WebP have a white background in the JPG?',
    answer:
      'JPEG does not support transparency. When converting a WebP with a transparent (alpha) channel to JPG, the transparent areas are filled with a white background. If you need to preserve transparency, use WebP to PNG instead.',
  },
  {
    question: 'Is there a file size limit?',
    answer:
      'The tool accepts files up to 50 MB. Very large images may take a moment to process depending on your device.',
  },
]

const RELATED = [
  { label: 'WebP to PNG', href: '/webp-to-png', emoji: '🏞️' },
  { label: 'HEIC to JPG', href: '/heic-to-jpg', emoji: '🖼️' },
  { label: 'AVIF to JPG', href: '/avif-to-jpg', emoji: '🎨' },
  { label: 'HEIC to PNG', href: '/heic-to-png', emoji: '📸' },
]

export default function WebpToJpg() {
  const [file, setFile] = useState(null)
  const [quality, setQuality] = useState(92)
  const [status, setStatus] = useState('idle')
  const [error, setError] = useState('')
  const [resultUrl, setResultUrl] = useState(null)
  const [resultName, setResultName] = useState('')
  const revokeRef = useRef(null)

  useEffect(() => {
    setPageMeta({
      title: 'WebP to JPG Converter – Free Online | FileVexa',
      description:
        'Convert WebP images to JPG online for free. Fast, browser-based conversion with no signup required. Transparent WebP images get a white background.',
      canonical: 'https://filevexa.pages.dev/webp-to-jpg',
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
      const blob = await fileToJpegBlob(file, quality / 100)
      const { url, revoke } = createObjectUrl(blob)
      revokeRef.current = revoke
      setResultUrl(url)
      setResultName(replaceExtension(file.name, 'jpg'))
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
      <div className="container">
        <Breadcrumb items={[{ label: 'Home', href: '/' }, { label: 'WebP to JPG' }]} />

        <div className="tool-page-header">
          <h1>WebP to JPG Converter</h1>
          <p>Convert WebP images to JPG format. Transparent areas are given a white background automatically.</p>
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
            <div className="file-info-icon" aria-hidden="true">🔄</div>
            <div className="file-info-details">
              <div className="file-info-name">{file.name}</div>
              <div className="file-info-size">{formatBytes(file.size)}</div>
            </div>
            <button className="file-info-remove" onClick={handleReset} aria-label="Remove file">✕</button>
          </div>
        )}

        {file && status !== 'converting' && status !== 'done' && (
          <div className="quality-control">
            <label htmlFor="quality-slider-webp">JPG Quality</label>
            <input
              id="quality-slider-webp"
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
            <button id="convert-btn" className="btn btn-primary btn-lg" onClick={handleConvert}>
              Convert to JPG
            </button>
          </div>
        )}

        {status === 'converting' && <LoadingState message="Converting your WebP file to JPG…" />}

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
          <div className="info-section">
            <h2>How to convert WebP to JPG</h2>
            <ol>
              <li>Click <strong>Choose File</strong> or drag and drop your WebP image.</li>
              <li>Optionally adjust the quality slider.</li>
              <li>Click <strong>Convert to JPG</strong>.</li>
              <li>Click <strong>Download JPG</strong> to save your file.</li>
            </ol>
          </div>

          <div className="info-section">
            <h2>About WebP to JPG conversion</h2>
            <p>
              WebP is a modern image format supported by all major browsers. However, some older applications, email
              clients, and devices may not render WebP images correctly. Converting to JPG ensures maximum compatibility.
            </p>
            <p>
              This tool uses the browser's built-in Canvas API to draw the WebP image and re-encode it as JPEG. No
              external service or upload is involved. Transparent WebP images will have their transparent areas filled
              with a white background, since JPEG does not support transparency.
            </p>
          </div>

          <div className="info-section">
            <h2>Supported formats</h2>
            <ul>
              <li><strong>.webp</strong> – WebP images (with or without transparency)</li>
            </ul>
            <p className="mt-4"><strong>Output:</strong> JPEG (.jpg)</p>
            <p><strong>Note:</strong> Animated WebP files are not supported; only the first frame will be exported.</p>
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
