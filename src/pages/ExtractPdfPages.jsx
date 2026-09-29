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
import { loadPdfJs, extractPagesFromPdf } from '../utils/pdfHelpers'

const MAX_MB = 100
const ALLOWED_EXTS = ['pdf']
const ALLOWED_MIMES = ['application/pdf']

const FAQ = [
  {
    question: 'Are my PDF files uploaded to a server?',
    answer: 'No. All processing happens locally in your browser. Your files never leave your device.'
  },
  {
    question: 'How do I extract multiple pages?',
    answer: 'Simply click on all the pages you want to keep. They will be highlighted in green. The new PDF will contain only those pages in the order they appear.'
  },
  {
    question: 'Does this change my original file?',
    answer: 'No. The original file remains untouched. The tool generates a brand new PDF file.'
  }
]

const RELATED = [
  { label: 'Remove PDF Pages', href: '/remove-pdf-pages', emoji: '🗑️' },
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
        border: `2px solid ${isSelected ? 'var(--color-success)' : 'transparent'}`,
        borderRadius: 'var(--radius-sm)',
        overflow: 'hidden',
        boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
        background: isSelected ? 'var(--color-success-bg)' : 'white',
        padding: '4px',
        transition: 'all var(--transition)',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center'
      }}
      role="button"
      aria-pressed={isSelected}
      aria-label={`Select page ${pageNum} for extraction`}
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
          background: 'rgba(34, 197, 94, 0.2)', // Visual green overlay (Tailwind green-500 eq)
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
            <span style={{ fontSize: '20px', color: 'var(--color-success)', fontWeight: 'bold' }} aria-hidden="true">✓</span>
          </div>
        </div>
      )}
    </div>
  )
}

export default function ExtractPdfPages() {
  const [file, setFile] = useState(null)
  const [pdfDoc, setPdfDoc] = useState(null)
  const [status, setStatus] = useState('idle') // idle | parsing | selecting | processing | done | error
  const [error, setError] = useState('')
  const [totalPages, setTotalPages] = useState(0)
  const [selectedToKeep, setSelectedToKeep] = useState(new Set())
  const [resultUrl, setResultUrl] = useState(null)
  const [resultName, setResultName] = useState('')
  const revokeRef = useRef(null)

  useEffect(() => {
    setPageMeta({
      title: 'Extract PDF Pages – Free Online | FileVexa',
      description: 'Extract specific pages from a PDF and save them as a new document. Free, browser-based, no signup.',
      canonical: 'https://filevexa.com/extract-pdf-pages',
    })
    return () => {
      revokeRef.current?.()
    }
  }, [])

  function handleFile(f) {
    revokeRef.current?.()
    setResultUrl(null)
    setPdfDoc(null)
    setTotalPages(0)
    setSelectedToKeep(new Set())
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
    const newSet = new Set(selectedToKeep)
    if (newSet.has(pageNum)) {
      newSet.delete(pageNum)
    } else {
      newSet.add(pageNum)
    }
    setSelectedToKeep(newSet)
  }

  async function handleExtract() {
    if (selectedToKeep.size === 0) {
      setError('Please select at least one page to extract.')
      return
    }

    setStatus('processing')
    setError('')

    try {
      // Sort pages to keep them in the original document order
      const pagesToKeepArray = Array.from(selectedToKeep).sort((a, b) => a - b)
      const newPdfBytes = await extractPagesFromPdf(file, pagesToKeepArray)
      
      const blob = new Blob([newPdfBytes], { type: 'application/pdf' })
      const { url, revoke } = createObjectUrl(blob)
      revokeRef.current = revoke
      setResultUrl(url)
      setResultName(replaceExtension(file.name, '_extracted.pdf'))
      
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
    setSelectedToKeep(new Set())
    setResultUrl(null)
    setResultName('')
    setError('')
    setStatus('idle')
  }

  return (
    <div className="tool-page">
      <div className="container">
        <Breadcrumb items={[{ label: 'Home', href: '/' }, { label: 'Extract PDF Pages' }]} />

        <div className="tool-page-header">
          <h1>Extract PDF Pages</h1>
          <p>Select specific pages from a PDF and download them as a new document.</p>
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
            <div className="file-info-icon" aria-hidden="true">✂️</div>
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
            <h3 style={{ marginBottom: '16px', fontSize: '18px' }}>Select pages to keep:</h3>
            <p style={{ marginBottom: '24px', color: 'var(--color-text-secondary)', fontSize: '14px' }}>
              Click on the pages you want to extract. They will be highlighted with a green overlay.
            </p>
            
            <div style={{
              display: 'grid',
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
                  isSelected={selectedToKeep.has(pageNum)}
                  onToggle={togglePage}
                />
              ))}
            </div>

            <div className="mt-6">
              <button className="btn btn-primary btn-lg" onClick={handleExtract}>
                Extract {selectedToKeep.size} Page(s)
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
                <h3>Extraction Successful!</h3>
                <p>Extracted {selectedToKeep.size} page(s) into a new PDF document.</p>
              </div>
              <div className="result-actions">
                {resultUrl && (
                  <DownloadButton url={resultUrl} filename={resultName} label="Download PDF" />
                )}
                <button className="btn btn-ghost" onClick={handleReset}>Extract another file</button>
              </div>
            </div>
          </div>
        )}

        <div className="tool-info">
          <div className="info-section">
            <h2>How to extract PDF pages</h2>
            <ol>
              <li>Click <strong>Choose File</strong> or drag and drop your PDF.</li>
              <li>Wait a moment for the tool to read the page count.</li>
              <li>Click on the thumbnails of the pages you want to extract (keep).</li>
              <li>Click the <strong>Extract Pages</strong> button.</li>
              <li>Download your new PDF.</li>
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
