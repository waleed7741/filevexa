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
import { loadPdfJs, extractMarkdownFromPage } from '../utils/pdfHelpers'

const MAX_MB = 100
const ALLOWED_EXTS = ['pdf']
const ALLOWED_MIMES = ['application/pdf']

const FAQ = [
  {
    question: 'Are my PDF files uploaded to a server?',
    answer: 'No. All processing happens locally in your browser using JavaScript. Your files never leave your device.'
  },
  {
    question: 'Why is the Markdown formatting not perfect?',
    answer: 'PDFs store text in complex structures. Our tool uses simple rules (like checking font size) to guess where headings and paragraphs are. Complex layouts, tables, and columns might not convert perfectly.'
  },
  {
    question: 'Why is the text gibberish or empty?',
    answer: 'If your PDF is a scanned image, it contains no text data. You need OCR technology for those files, which is not supported in this tool.'
  }
]

const RELATED = [
  { label: 'PDF to Text', href: '/pdf-to-text', emoji: '📝' },
  { label: 'PDF to PNG', href: '/pdf-to-png', emoji: '📄' },
]

export default function PdfToMarkdown() {
  const [file, setFile] = useState(null)
  const [status, setStatus] = useState('idle')
  const [error, setError] = useState('')
  const [extractedText, setExtractedText] = useState('')
  const [resultUrl, setResultUrl] = useState(null)
  const [resultName, setResultName] = useState('')
  const [copied, setCopied] = useState(false)
  const revokeRef = useRef(null)

  const schema = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    "name": "PDF to Markdown Converter",
    "url": "https://filevexa.pages.dev/pdf-to-markdown",
    "description": "Convert PDF documents into clean, structured Markdown text directly in your browser.",
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
    setExtractedText('')
    setCopied(false)
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
    setStatus('processing')
    setError('')
    setExtractedText('')

    try {
      const pdfDoc = await loadPdfJs(file)
      const totalPages = pdfDoc.numPages
      let fullText = ''

      for (let i = 1; i <= totalPages; i++) {
        const pageText = await extractMarkdownFromPage(pdfDoc, i)
        fullText += pageText
      }

      // Cleanup extra newlines
      const textToSave = fullText.replace(/\n{3,}/g, '\n\n').trim()
      setExtractedText(textToSave)

      if (textToSave) {
        const blob = new Blob([textToSave], { type: 'text/markdown' })
        const { url, revoke } = createObjectUrl(blob)
        revokeRef.current = revoke
        setResultUrl(url)
        setResultName(replaceExtension(file.name, 'md'))
      }

      setStatus('done')
    } catch (err) {
      console.error(err)
      setError('Something went wrong while processing this PDF. It might be corrupted or password-protected.')
      setStatus('error')
    }
  }

  function handleCopy() {
    navigator.clipboard.writeText(extractedText)
      .then(() => {
        setCopied(true)
        setTimeout(() => setCopied(false), 2000)
      })
      .catch(() => {
        setError('Failed to copy text to clipboard.')
      })
  }

  function handleReset() {
    revokeRef.current?.()
    setFile(null)
    setExtractedText('')
    setResultUrl(null)
    setResultName('')
    setCopied(false)
    setError('')
    setStatus('idle')
  }

  return (
    <div className="tool-page">
      <SEO
        title="PDF to Markdown Converter – Free Online | FileVexa"
        description="Convert PDF text content to Markdown format. Copy or download the result. Browser-based, no signup."
        canonical="https://filevexa.pages.dev/pdf-to-markdown"
        schema={schema}
      />
      <div className="container">
        <Breadcrumb items={[{ label: 'Home', href: '/' }, { label: 'PDF to Markdown' }]} />

        <div className="tool-page-header">
          <h1>PDF to Markdown Converter</h1>
          <p>Convert text-based PDFs to basic Markdown format. View, copy, and download the result.</p>
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

        {file && status !== 'processing' && (
          <div className="file-info-card">
            <div className="file-info-icon" aria-hidden="true">⬇️</div>
            <div className="file-info-details">
              <div className="file-info-name">{file.name}</div>
              <div className="file-info-size">{formatBytes(file.size)}</div>
            </div>
            <button className="file-info-remove" onClick={handleReset} aria-label="Remove file">✕</button>
          </div>
        )}

        <ErrorMessage message={error} />

        {file && status !== 'processing' && status !== 'done' && (
          <div className="mt-6">
            <button id="convert-btn" className="btn btn-primary btn-lg" onClick={handleConvert}>
              Convert to Markdown
            </button>
          </div>
        )}

        {status === 'processing' && <LoadingState message="Extracting and formatting text..." />}

        {status === 'done' && (
          <div className="mt-6">
            <div className="result-card" style={{ marginBottom: '24px' }}>
              <div className="result-icon" aria-hidden="true">✓</div>
              <div className="result-info">
                <h3>Conversion successful!</h3>
                <p>Extracted {extractedText.length} characters.</p>
              </div>
              <div className="result-actions">
                {resultUrl && (
                  <DownloadButton url={resultUrl} filename={resultName} label="Download MD" />
                )}
                <button className="btn btn-secondary" onClick={handleCopy}>
                  {copied ? 'Copied!' : 'Copy Markdown'}
                </button>
                <button className="btn btn-ghost" onClick={handleReset}>Convert another file</button>
              </div>
            </div>

            <textarea
              className="form-textarea"
              style={{ minHeight: '300px', width: '100%', fontFamily: 'monospace' }}
              value={extractedText}
              readOnly
              aria-label="Extracted PDF Markdown"
            />
          </div>
        )}

        <div className="tool-info">
          <div className="info-section">
            <h2>How to convert PDF to Markdown</h2>
            <ol>
              <li>Click <strong>Choose File</strong> or drag and drop your PDF.</li>
              <li>Click <strong>Convert to Markdown</strong>.</li>
              <li>Review the generated Markdown below.</li>
              <li>Click <strong>Copy Markdown</strong> or <strong>Download MD</strong> to save it.</li>
            </ol>
          </div>
          <div className="info-section">
            <h2>Limitations</h2>
            <p>
              This tool only extracts text embedded directly in the PDF file and attempts basic layout preservation.
              <strong>Scanned PDFs or image-only PDFs are not supported.</strong>
            </p>
            <p>
              Formatting such as bold text, lists, tables, and complex multi-column layouts will not be perfectly preserved.
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
