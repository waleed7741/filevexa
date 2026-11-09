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
import { loadPdfJs, removePagesFromPdf } from '../utils/pdfHelpers'

const MAX_MB = 100
const ALLOWED_EXTS = ['pdf']
const ALLOWED_MIMES = ['application/pdf']

const FAQ = [
  {
    question: 'Are my PDF files uploaded to a server?',
    answer: 'No. All processing happens locally in your browser. Your files never leave your device.'
  },
  {
    question: 'Can I remove multiple pages at once?',
    answer: 'Yes! Simply click on all the pages you want to delete. They will be highlighted in red. When you generate the new PDF, all selected pages will be removed.'
  },
  {
    question: 'Does this change my original file?',
    answer: 'No. The original file remains untouched. The tool generates a brand new PDF file that you download separately.'
  }
]

const RELATED = [
  { label: 'Extract PDF Pages', href: '/extract-pdf-pages', emoji: '✂️' },
  { label: 'PDF to PNG', href: '/pdf-to-png', emoji: '📄' },
]

function PdfThumbnail({ pdfDoc, pageNum, isSelected, onToggle }) {
  const canvasRef = useRef(null)

  useEffect(() => {
    let renderTask = null
    async function renderPage() {
      try {
        const page = await pdfDoc.getPage(pageNum)
        // Use a smaller scale for the thumbnail to save memory and render fast
        const viewport = page.getViewport({ scale: 0.5 })
        const canvas = canvasRef.current
        if (!canvas) return

        const context = canvas.getContext('2d')
        canvas.height = viewport.height
        canvas.width = viewport.width

        renderTask = page.render({ canvasContext: context, viewport })
        await renderTask.promise
      } catch (err) {
        if (err.name !== 'RenderingCancelledException') {
          console.error(`Error rendering page ${pageNum}:`, err)
        }
      }
    }
    renderPage()

    return () => {
      if (renderTask) {
        renderTask.cancel()
      }
    }
  }, [pdfDoc, pageNum])

  return (
    <div
      onClick={() => onToggle(pageNum)}
      style={{
        position: 'relative',
        cursor: 'pointer',
        border: `2px solid ${isSelected ? 'var(--color-error)' : 'transparent'}`,
        borderRadius: 'var(--radius-sm)',
        overflow: 'hidden',
        boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
        background: isSelected ? 'var(--color-error-bg)' : 'white',
        padding: '4px',
        transition: 'all var(--transition)',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center'
      }}
      role="button"
      aria-pressed={isSelected}
      aria-label={`Select page ${pageNum} for removal`}
    >
      <canvas ref={canvasRef} style={{ width: '100%', height: 'auto', display: 'block', background: 'white' }} />

      <div style={{
        position: 'absolute',
        bottom: '8px',
        right: '8px',
        background: 'rgba(0,0,0,0.6)',
        color: 'white',
        padding: '2px 8px',
        borderRadius: '12px',
        fontSize: '12px',
        fontWeight: 'bold'
      }}>
        {pageNum}
      </div>

      {isSelected && (
        <div style={{
          position: 'absolute',
          top: 0, left: 0, right: 0, bottom: 0,
          background: 'rgba(239, 68, 68, 0.2)', // Visual red overlay
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center'
        }}>
          <div style={{
            background: 'white',
            borderRadius: '50%',
            width: '40px',
            height: '40px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            boxShadow: '0 2px 4px rgba(0,0,0,0.2)'
          }}>
            <span style={{ fontSize: '20px' }} aria-hidden="true">🗑️</span>
          </div>
        </div>
      )}
    </div>
  )
}

export default function RemovePdfPages() {
  const [file, setFile] = useState(null)
  const [pdfDoc, setPdfDoc] = useState(null)
  const [status, setStatus] = useState('idle') // idle | parsing | selecting | processing | done | error
  const [error, setError] = useState('')
  const [totalPages, setTotalPages] = useState(0)
  const [selectedToRemove, setSelectedToRemove] = useState(new Set())
  const [resultUrl, setResultUrl] = useState(null)
  const [resultName, setResultName] = useState('')
  const revokeRef = useRef(null)

  const schema = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    "name": "Remove PDF Pages",
    "url": "https://filevexa.pages.dev/remove-pdf-pages",
    "description": "Select and delete unwanted pages from PDF files and download a new PDF instantly in your browser.",
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
    revokeRef.current?.()
    setResultUrl(null)
    setPdfDoc(null)
    setTotalPages(0)
    setSelectedToRemove(new Set())
    setError('')
    setStatus('idle')

    const sizeErr = validateFileSize(f, MAX_MB)
    if (sizeErr) { setError(sizeErr); return }

    const typeErr = validateFileType(f, ALLOWED_MIMES, ALLOWED_EXTS)
    if (typeErr) { setError(typeErr); return }

    setFile(f)
    parsePdf(f)
  }

  async function parsePdf(f) {
    setStatus('parsing')
    try {
      const doc = await loadPdfJs(f)
      setPdfDoc(doc)
      setTotalPages(doc.numPages)
      setStatus('selecting')
    } catch (err) {
      console.error(err)
      setError('Could not read the PDF file. It might be corrupted or password-protected.')
      setStatus('error')
    }
  }

  function togglePage(pageNum) {
    const newSet = new Set(selectedToRemove)
    if (newSet.has(pageNum)) {
      newSet.delete(pageNum)
    } else {
      newSet.add(pageNum)
    }
    setSelectedToRemove(newSet)
  }

  async function handleRemove() {
    if (selectedToRemove.size === 0) {
      setError('Please select at least one page to remove.')
      return
    }
    if (selectedToRemove.size === totalPages) {
      setError('You cannot remove all pages from the PDF.')
      return
    }

    setStatus('processing')
    setError('')

    try {
      const pagesToRemoveArray = Array.from(selectedToRemove)
      const newPdfBytes = await removePagesFromPdf(file, pagesToRemoveArray)

      const blob = new Blob([newPdfBytes], { type: 'application/pdf' })
      const { url, revoke } = createObjectUrl(blob)
      revokeRef.current = revoke
      setResultUrl(url)
      setResultName(replaceExtension(file.name, '_removed.pdf'))

      setStatus('done')
    } catch (err) {
      console.error(err)
      setError('Something went wrong while modifying the PDF.')
      setStatus('error')
    }
  }

  function handleReset() {
    revokeRef.current?.()
    setFile(null)
    setPdfDoc(null)
    setTotalPages(0)
    setSelectedToRemove(new Set())
    setResultUrl(null)
    setResultName('')
    setError('')
    setStatus('idle')
  }

  return (
    <div className="tool-page">
      <SEO
        title="Remove PDF Pages – Free Online | FileVexa"
        description="Remove specific pages from a PDF file in your browser. No signup, no upload."
        canonical="https://filevexa.pages.dev/remove-pdf-pages"
        schema={schema}
        faqs={FAQ}
      />
      <div className="container">
        <Breadcrumb items={[{ label: 'Home', href: '/' }, { label: 'Remove PDF Pages' }]} />

        <div className="tool-page-header">
          <h1>Free Online Remove PDF Pages Tool</h1>
          <p>Upload a PDF, visually select pages to delete, and download the updated PDF.</p>
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

        {file && status !== 'parsing' && (
          <div className="file-info-card">
            <div className="file-info-icon" aria-hidden="true">🗑️</div>
            <div className="file-info-details">
              <div className="file-info-name">{file.name}</div>
              <div className="file-info-size">{formatBytes(file.size)}</div>
            </div>
            <button className="file-info-remove" onClick={handleReset} aria-label="Remove file">✕</button>
          </div>
        )}

        {status === 'parsing' && <LoadingState message="Reading PDF structure..." />}

        <ErrorMessage message={error} />

        {status === 'selecting' && (
          <div className="mt-6">
            <h3 style={{ marginBottom: '16px', fontSize: '18px' }}>Select pages to remove:</h3>
            <p style={{ marginBottom: '24px', color: 'var(--color-text-secondary)', fontSize: '14px' }}>
              Click on the pages you want to delete. They will be highlighted with a red overlay.
            </p>

            <div style={{
              display: 'grid',
              // Clean responsive grid layout similar to grid-cols-2 md:grid-cols-4 lg:grid-cols-5
              gridTemplateColumns: 'repeat(auto-fill, minmax(140px, 1fr))',
              gap: '16px',
              maxHeight: '600px',
              overflowY: 'auto',
              padding: '16px',
              border: '1px solid var(--color-border)',
              borderRadius: 'var(--radius-md)',
              background: 'var(--color-bg-subtle)'
            }}>
              {Array.from({ length: totalPages }, (_, i) => i + 1).map(pageNum => (
                <PdfThumbnail
                  key={pageNum}
                  pdfDoc={pdfDoc}
                  pageNum={pageNum}
                  isSelected={selectedToRemove.has(pageNum)}
                  onToggle={togglePage}
                />
              ))}
            </div>

            <div className="mt-6">
              <button className="btn btn-primary btn-lg" onClick={handleRemove}>
                Remove {selectedToRemove.size} Page(s)
              </button>
            </div>
          </div>
        )}

        {status === 'processing' && <LoadingState message="Generating new PDF..." />}

        {status === 'done' && (
          <div className="mt-6">
            <div className="result-card">
              <div className="result-icon" aria-hidden="true">✓</div>
              <div className="result-info">
                <h3>PDF Updated Successfully!</h3>
                <p>Removed {selectedToRemove.size} page(s). {totalPages - selectedToRemove.size} page(s) remaining.</p>
              </div>
              <div className="result-actions">
                {resultUrl && (
                  <DownloadButton url={resultUrl} filename={resultName} label="Download PDF" />
                )}
                <button className="btn btn-ghost" onClick={handleReset}>Modify another file</button>
              </div>
            </div>
          </div>
        )}

        <div className="tool-info">
          <ToolPageLayout toolId="remove-pdf-pages" sections={['steps']} containerClassName="tool-seo-content" includeSEO={false} />
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
