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
import { loadPdfJs, extractTextFromPage } from '../utils/pdfHelpers'

const MAX_MB = 100
const ALLOWED_EXTS = ['pdf']
const ALLOWED_MIMES = ['application/pdf']

const FAQ = [
  {
    question: 'Are my PDF files uploaded to a server?',
    answer: 'No. All processing happens locally in your browser using JavaScript. Your files never leave your device.'
  },
  {
    question: 'Why is the text gibberish or empty?',
    answer: 'This tool extracts text embedded in the PDF file. If your PDF is a scanned image (like a scan from a physical printer), there is no embedded text. You would need an OCR (Optical Character Recognition) tool to extract text from images.'
  }
]

const RELATED = [
  { label: 'PDF to Markdown', href: '/pdf-to-markdown', emoji: '⬇️' },
  { label: 'PDF to PNG', href: '/pdf-to-png', emoji: '📄' },
]

export default function PdfToText() {
  const [file, setFile] = useState(null)
  const [status, setStatus] = useState('idle')
  const [error, setError] = useState('')
  const [extractedText, setExtractedText] = useState('')
  const [resultUrl, setResultUrl] = useState(null)
  const [resultName, setResultName] = useState('')
  const [copied, setCopied] = useState(false)
  const revokeRef = useRef(null)

  useEffect(() => {
    setPageMeta({
      title: 'PDF to Text Converter – Free Online | FileVexa',
      description: 'Extract plain text from PDF files. Copy or download as a .txt file. Browser-based, no signup.',
      canonical: 'https://filevexa.pages.dev/pdf-to-text',
    })
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
        const pageText = await extractTextFromPage(pdfDoc, i)
        fullText += pageText + '\n\n'
      }

      const textToSave = fullText.trim()
      setExtractedText(textToSave)

      if (textToSave) {
        const blob = new Blob([textToSave], { type: 'text/plain' })
        const { url, revoke } = createObjectUrl(blob)
        revokeRef.current = revoke
        setResultUrl(url)
        setResultName(replaceExtension(file.name, 'txt'))
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
      <div className="container">
        <Breadcrumb items={[{ label: 'Home', href: '/' }, { label: 'PDF to Text' }]} />

        <div className="tool-page-header">
          <h1>PDF to Text Converter</h1>
          <p>Extract plain text from text-based PDF files. Copy to clipboard or download as a .txt file.</p>
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
            <div className="file-info-icon" aria-hidden="true">📝</div>
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
              Extract Text
            </button>
          </div>
        )}

        {status === 'processing' && <LoadingState message="Extracting text..." />}

        {status === 'done' && (
          <div className="mt-6">
            <div className="result-card" style={{ marginBottom: '24px' }}>
              <div className="result-icon" aria-hidden="true">✓</div>
              <div className="result-info">
                <h3>Extraction successful!</h3>
                <p>Extracted {extractedText.length} characters.</p>
              </div>
              <div className="result-actions">
                {resultUrl && (
                  <DownloadButton url={resultUrl} filename={resultName} label="Download TXT" />
                )}
                <button className="btn btn-secondary" onClick={handleCopy}>
                  {copied ? 'Copied!' : 'Copy Text'}
                </button>
                <button className="btn btn-ghost" onClick={handleReset}>Extract another file</button>
              </div>
            </div>

            <textarea
              className="form-textarea"
              style={{ minHeight: '300px', width: '100%', fontFamily: 'monospace' }}
              value={extractedText}
              readOnly
              aria-label="Extracted PDF text"
            />
          </div>
        )}

        <div className="tool-info">
          <div className="info-section">
            <h2>How to extract text from PDF</h2>
            <ol>
              <li>Click <strong>Choose File</strong> or drag and drop your PDF.</li>
              <li>Click <strong>Extract Text</strong>.</li>
              <li>Review the extracted text below.</li>
              <li>Click <strong>Copy Text</strong> or <strong>Download TXT</strong> to save it.</li>
            </ol>
          </div>
          <div className="info-section">
            <h2>Limitations</h2>
            <p>
              This tool only extracts text embedded directly in the PDF file.
              <strong>Scanned PDFs or image-only PDFs are not supported</strong> in this version, as they require OCR (Optical Character Recognition) technology to read the text inside the images.
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
