import { useEffect, useState, useRef } from 'react'
import JSZip from 'jszip'
import Breadcrumb from '../components/Breadcrumb'
import FileUploader from '../components/FileUploader'
import LoadingState from '../components/LoadingState'
import ErrorMessage from '../components/ErrorMessage'
import DownloadButton from '../components/DownloadButton'
import FaqSection from '../components/FaqSection'
import RelatedTools from '../components/RelatedTools'
import SEO from '../components/SEO'
import { formatBytes, validateFileSize, validateFileType, replaceExtension, createObjectUrl } from '../utils/fileHelpers'
import { loadPdfJs, renderPdfPageToPngBlob } from '../utils/pdfHelpers'

const MAX_MB = 100
const ALLOWED_EXTS = ['pdf']
const ALLOWED_MIMES = ['application/pdf']

const FAQ = [
  {
    question: 'Are my PDF files uploaded to a server?',
    answer: 'No. All processing happens locally in your browser using JavaScript. Your files never leave your device.'
  },
  {
    question: 'Is there a limit on the number of pages?',
    answer: 'While there is no strict page limit, extremely large PDFs (hundreds of pages) might consume a lot of memory and slow down your browser. If it crashes, try a smaller file.'
  }
]

const RELATED = [
  { label: 'Remove PDF Pages', href: '/remove-pdf-pages', emoji: '🗑️' },
  { label: 'Extract PDF Pages', href: '/extract-pdf-pages', emoji: '✂️' },
  { label: 'WebP to PNG', href: '/webp-to-png', emoji: '🏞️' },
]

export default function PdfToPng() {
  const [file, setFile] = useState(null)
  const [status, setStatus] = useState('idle') // idle | parsing | rendering | done | error
  const [error, setError] = useState('')
  const [pageCount, setPageCount] = useState(0)
  const [progress, setProgress] = useState(0)
  const [resultPages, setResultPages] = useState([]) // Array of { url, filename, revoke }
  const [zipUrl, setZipUrl] = useState(null)
  const [zipName, setZipName] = useState('')
  const zipRevokeRef = useRef(null)

  const schema = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    "name": "PDF to PNG Converter",
    "url": "https://filevexa.pages.dev/pdf-to-png",
    "description": "Convert PDF pages into high-resolution PNG image files directly in your browser without uploading.",
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
      handleCleanup()
    }
  }, [])

  function handleCleanup() {
    zipRevokeRef.current?.()
    resultPages.forEach(p => p.revoke?.())
  }

  function handleFile(f) {
    handleCleanup()
    setResultPages([])
    setZipUrl(null)
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
    setStatus('parsing')
    setError('')
    setProgress(0)
    setResultPages([])

    try {
      const pdfDoc = await loadPdfJs(file)
      const totalPages = pdfDoc.numPages
      setPageCount(totalPages)

      setStatus('rendering')
      const pagesData = []

      // Render sequentially to prevent out-of-memory on large PDFs
      for (let i = 1; i <= totalPages; i++) {
        const blob = await renderPdfPageToPngBlob(pdfDoc, i, 2.0) // 2.0 scale for good quality
        const { url, revoke } = createObjectUrl(blob)
        const filename = `${replaceExtension(file.name, '')}_page_${i}.png`

        pagesData.push({ url, filename, revoke, blob })
        setProgress(Math.round((i / totalPages) * 100))
      }

      setResultPages(pagesData)

      // Create ZIP if more than 1 page
      if (totalPages > 1) {
        const zip = new JSZip()
        pagesData.forEach(p => {
          zip.file(p.filename, p.blob)
        })
        const zipBlob = await zip.generateAsync({ type: 'blob' })
        const { url, revoke } = createObjectUrl(zipBlob)
        zipRevokeRef.current = revoke
        setZipUrl(url)
        setZipName(`${replaceExtension(file.name, '')}_images.zip`)
      }

      setStatus('done')
    } catch (err) {
      console.error(err)
      setError('Something went wrong while processing this PDF. It might be corrupted or password-protected.')
      setStatus('error')
    }
  }

  function handleReset() {
    handleCleanup()
    setFile(null)
    setResultPages([])
    setZipUrl(null)
    setZipName('')
    setError('')
    setStatus('idle')
  }

  return (
    <div className="tool-page">
      <SEO
        title="PDF to PNG Converter – Free Online | FileVexa"
        description="Convert PDF pages to PNG images online. Download each page as a PNG or as a ZIP. No signup required."
        canonical="https://filevexa.pages.dev/pdf-to-png"
        schema={schema}
      />
      <div className="container">
        <Breadcrumb items={[{ label: 'Home', href: '/' }, { label: 'PDF to PNG' }]} />

        <div className="tool-page-header">
          <h1>PDF to PNG Converter</h1>
          <p>Convert PDF pages to PNG images. Download pages individually or as a ZIP archive.</p>
          <p className="privacy-notice">
            <span aria-hidden="true">🔒</span> Your files are processed locally and are not uploaded to any server.
          </p>
        </div>

        {status === 'idle' && !file && (
          <FileUploader
            accept=".pdf,application/pdf"
            acceptLabel=".pdf"
            onFile={handleFile}
          />
        )}

        {file && status !== 'parsing' && status !== 'rendering' && (
          <div className="file-info-card">
            <div className="file-info-icon" aria-hidden="true">📄</div>
            <div className="file-info-details">
              <div className="file-info-name">{file.name}</div>
              <div className="file-info-size">{formatBytes(file.size)}</div>
            </div>
            <button className="file-info-remove" onClick={handleReset} aria-label="Remove file">✕</button>
          </div>
        )}

        <ErrorMessage message={error} />

        {file && status !== 'parsing' && status !== 'rendering' && status !== 'done' && (
          <div className="mt-6">
            <button id="convert-btn" className="btn btn-primary btn-lg" onClick={handleConvert}>
              Convert to PNG
            </button>
          </div>
        )}

        {(status === 'parsing' || status === 'rendering') && (
          <LoadingState message={status === 'parsing' ? 'Reading PDF...' : `Converting pages... ${progress}%`} />
        )}

        {status === 'done' && resultPages.length > 0 && (
          <div className="mt-6">
            <div className="result-card" style={{ marginBottom: '24px' }}>
              <div className="result-icon" aria-hidden="true">✓</div>
              <div className="result-info">
                <h3>Conversion successful!</h3>
                <p>Converted {pageCount} page(s) to PNG.</p>
              </div>
              <div className="result-actions">
                {zipUrl && (
                  <DownloadButton url={zipUrl} filename={zipName} label="Download All (ZIP)" />
                )}
                <button className="btn btn-ghost" onClick={handleReset}>Convert another file</button>
              </div>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '16px' }}>
              {resultPages.map((page, index) => (
                <div key={index} style={{ border: '1px solid var(--color-border)', borderRadius: 'var(--radius-md)', padding: '16px', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                  <img src={page.url} alt={`Page ${index + 1}`} style={{ maxHeight: '160px', objectFit: 'contain', marginBottom: '16px', border: '1px solid var(--color-border)' }} />
                  <p style={{ fontSize: '13px', fontWeight: '600', marginBottom: '12px' }}>Page {index + 1}</p>
                  <DownloadButton url={page.url} filename={page.filename} label="Download" />
                </div>
              ))}
            </div>
          </div>
        )}

        <div className="tool-info">
          <div className="info-section">
            <h2>How to convert PDF to PNG</h2>
            <ol>
              <li>Click <strong>Choose File</strong> or drag and drop your PDF into the upload area.</li>
              <li>Click <strong>Convert to PNG</strong>. Wait for the pages to render.</li>
              <li>Download your pages individually, or click <strong>Download All (ZIP)</strong>.</li>
            </ol>
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
