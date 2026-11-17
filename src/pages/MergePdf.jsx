import { useEffect, useRef, useState } from 'react'
import { PDFDocument } from 'pdf-lib'
import Breadcrumb from '../components/Breadcrumb'
import DownloadButton from '../components/DownloadButton'
import ErrorMessage from '../components/ErrorMessage'
import ToolPageLayout from '../components/ToolPageLayout'
import { formatBytes } from '../utils/fileHelpers'

const MAX_FILE_BYTES = 50 * 1024 * 1024
const MAX_TOTAL_BYTES = 100 * 1024 * 1024
const MAX_FILES = 20
const MAX_PAGES = 500

function isPdfFile(file) {
  return file.name.toLowerCase().endsWith('.pdf') || file.type === 'application/pdf'
}

function getPdfReadError(error) {
  const message = error instanceof Error ? error.message : ''
  if (/encrypt|password/i.test(message)) {
    return 'This PDF is password-protected or encrypted. Unlock it in a trusted PDF application and select an unprotected copy.'
  }
  return 'This file is corrupted or is not a readable PDF. Try exporting a fresh, unprotected copy and add it again.'
}

function getOutputFilename(value) {
  const cleaned = [...value.trim()]
    .filter((character) => !/[<>:"/\\|?*]/.test(character) && character.charCodeAt(0) >= 32 && character.charCodeAt(0) !== 127)
    .join('')
    .replace(/\.pdf$/i, '')
    .trim()
  return cleaned ? `${cleaned}.pdf` : ''
}

export default function MergePdf() {
  const [pdfs, setPdfs] = useState([])
  const [outputFilename, setOutputFilename] = useState('merged')
  const [error, setError] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [isMerging, setIsMerging] = useState(false)
  const [isDragging, setIsDragging] = useState(false)
  const [result, setResult] = useState(null)
  const inputRef = useRef(null)
  const resultUrlRef = useRef('')
  const nextIdRef = useRef(0)

  useEffect(() => () => {
    if (resultUrlRef.current) URL.revokeObjectURL(resultUrlRef.current)
  }, [])

  function clearResult() {
    if (resultUrlRef.current) URL.revokeObjectURL(resultUrlRef.current)
    resultUrlRef.current = ''
    setResult(null)
  }

  async function addFiles(fileList) {
    const selectedFiles = Array.from(fileList || [])
    if (!selectedFiles.length) return

    clearResult()
    setError('')
    setIsLoading(true)
    const accepted = []
    const issues = []
    let totalBytes = pdfs.reduce((sum, item) => sum + item.file.size, 0)
    let totalPages = pdfs.reduce((sum, item) => sum + item.pageCount, 0)
    let fileCount = pdfs.length

    for (const file of selectedFiles) {
      if (!isPdfFile(file)) {
        issues.push(`${file.name}: select a PDF file.`)
        continue
      }
      if (file.size > MAX_FILE_BYTES) {
        issues.push(`${file.name}: exceeds the 50 MB per-file limit.`)
        continue
      }
      if (fileCount >= MAX_FILES) {
        issues.push(`Only ${MAX_FILES} PDF files can be merged at once.`)
        break
      }
      if (totalBytes + file.size > MAX_TOTAL_BYTES) {
        issues.push(`${file.name}: adding it would exceed the 100 MB combined limit.`)
        continue
      }

      try {
        const document = await PDFDocument.load(await file.arrayBuffer())
        const pageCount = document.getPageCount()
        if (totalPages + pageCount > MAX_PAGES) {
          issues.push(`${file.name}: adding ${pageCount} pages would exceed the ${MAX_PAGES}-page limit.`)
          continue
        }
        nextIdRef.current += 1
        accepted.push({
          id: `${file.name}-${file.size}-${file.lastModified}-${nextIdRef.current}`,
          file,
          pageCount,
        })
        totalBytes += file.size
        totalPages += pageCount
        fileCount += 1
      } catch (readError) {
        issues.push(`${file.name}: ${getPdfReadError(readError)}`)
      }
    }

    if (accepted.length) setPdfs((current) => [...current, ...accepted])
    setError(issues.join(' '))
    setIsLoading(false)
  }

  function handleInputChange(event) {
    addFiles(event.target.files)
    event.target.value = ''
  }

  function movePdf(index, direction) {
    setPdfs((current) => {
      const destination = index + direction
      if (destination < 0 || destination >= current.length) return current
      const reordered = [...current]
      const currentPdf = reordered[index]
      reordered[index] = reordered[destination]
      reordered[destination] = currentPdf
      return reordered
    })
    clearResult()
  }

  function removePdf(id) {
    setPdfs((current) => current.filter((item) => item.id !== id))
    clearResult()
  }

  async function handleMerge() {
    if (pdfs.length < 2 || isMerging) {
      setError('Add at least two valid PDF files to merge.')
      return
    }
    const filename = getOutputFilename(outputFilename)
    if (!filename) {
      setError('Enter a filename using at least one letter or number.')
      return
    }

    clearResult()
    setError('')
    setIsMerging(true)
    try {
      const mergedPdf = await PDFDocument.create()
      for (const { file } of pdfs) {
        const sourcePdf = await PDFDocument.load(await file.arrayBuffer())
        const pages = await mergedPdf.copyPages(sourcePdf, sourcePdf.getPageIndices())
        pages.forEach((page) => mergedPdf.addPage(page))
      }

      const blob = new Blob([await mergedPdf.save()], { type: 'application/pdf' })
      const url = URL.createObjectURL(blob)
      resultUrlRef.current = url
      setResult({ url, filename })
      const downloadLink = document.createElement('a')
      downloadLink.href = url
      downloadLink.download = filename
      document.body.appendChild(downloadLink)
      downloadLink.click()
      downloadLink.remove()
    } catch (mergeError) {
      console.error(mergeError)
      setError(`Could not merge the selected PDFs. ${getPdfReadError(mergeError)} Large documents may also exceed available browser memory.`)
    } finally {
      setIsMerging(false)
    }
  }

  const totalBytes = pdfs.reduce((sum, item) => sum + item.file.size, 0)
  const totalPages = pdfs.reduce((sum, item) => sum + item.pageCount, 0)

  return (
    <div className="tool-page">
      <div className="container">
        <Breadcrumb items={[
          { label: 'Home', href: '/' },
          { label: 'PDF Tools', href: '/pdf-tools' },
          { label: 'Merge PDF' },
        ]} />
        <header className="tool-page-header">
          <h1>Merge PDF Files Online</h1>
          <p>Combine multiple PDFs into one document, arrange their order, and download the result.</p>
          <p className="privacy-notice"><span aria-hidden="true">🔒</span> PDFs are processed locally in your browser and are never uploaded for merging.</p>
        </header>

        <section
          className={`uploader ${isDragging ? 'drag-over' : ''}`}
          onDragOver={(event) => {
            event.preventDefault()
            if (!isLoading && !isMerging) setIsDragging(true)
          }}
          onDragLeave={(event) => {
            if (!event.currentTarget.contains(event.relatedTarget)) setIsDragging(false)
          }}
          onDrop={(event) => {
            event.preventDefault()
            setIsDragging(false)
            if (!isLoading && !isMerging) addFiles(event.dataTransfer.files)
          }}
          aria-label="PDF file drop area"
        >
          <div className="uploader-icon" aria-hidden="true">📚</div>
          <h2>{pdfs.length ? 'Add more PDF files' : 'Drag and drop PDF files here'}</h2>
          <div className="uploader-or"><span>or</span></div>
          <button type="button" className="btn btn-secondary btn-sm" onClick={() => inputRef.current?.click()} disabled={isLoading || isMerging}>
            Choose PDF Files
          </button>
          <p className="uploader-formats">PDF · Up to {MAX_FILES} files · 50 MB each · 100 MB combined</p>
          <input
            ref={inputRef}
            type="file"
            accept=".pdf,application/pdf"
            multiple
            className="uploader-input"
            onClick={(event) => event.stopPropagation()}
            onChange={handleInputChange}
            disabled={isLoading || isMerging}
            aria-label="Choose PDF files"
          />
        </section>

        <ErrorMessage message={error} />
        {(isLoading || isMerging) && (
          <p className="tool-status" role="status" aria-live="polite">
            {isLoading ? 'Checking PDF files and page counts locally…' : 'Merging PDF pages in your browser…'}
          </p>
        )}

        {pdfs.length > 0 && (
          <section className="multi-file-tool-section" aria-labelledby="merge-pdf-files-heading">
            <div className="multi-file-tool-heading">
              <div>
                <h2 id="merge-pdf-files-heading">PDF merge order</h2>
                <p>{pdfs.length} files · {totalPages} pages · {formatBytes(totalBytes)} total</p>
              </div>
            </div>
            <ol className="multi-file-list">
              {pdfs.map(({ id, file, pageCount }, index) => (
                <li className="multi-file-item" key={id}>
                  <div className="multi-file-details">
                    <strong>{index + 1}. {file.name}</strong>
                    <span>{formatBytes(file.size)} · {pageCount} page{pageCount === 1 ? '' : 's'}</span>
                  </div>
                  <div className="multi-file-actions">
                    <button type="button" className="btn btn-secondary btn-sm" onClick={() => movePdf(index, -1)} disabled={isLoading || isMerging || index === 0} aria-label={`Move ${file.name} up`}>Move up</button>
                    <button type="button" className="btn btn-secondary btn-sm" onClick={() => movePdf(index, 1)} disabled={isLoading || isMerging || index === pdfs.length - 1} aria-label={`Move ${file.name} down`}>Move down</button>
                    <button type="button" className="btn btn-ghost btn-sm" onClick={() => removePdf(id)} disabled={isLoading || isMerging} aria-label={`Remove ${file.name}`}>Remove</button>
                  </div>
                </li>
              ))}
            </ol>

            <label className="pdf-output-name">
              Output filename (without extension)
              <span className="pdf-output-name-control">
                <input type="text" value={outputFilename} maxLength={100} onChange={(event) => { setOutputFilename(event.target.value); clearResult() }} disabled={isMerging} aria-describedby="merge-pdf-output-extension" />
                <span id="merge-pdf-output-extension">.pdf</span>
              </span>
            </label>
            <button type="button" className="btn btn-primary btn-lg" onClick={handleMerge} disabled={isMerging || isLoading || pdfs.length < 2}>
              {isMerging ? 'Merging PDFs…' : 'Merge PDF & Download'}
            </button>
            {pdfs.length < 2 && <p className="text-muted">Add at least two valid PDFs to merge.</p>}
          </section>
        )}

        {result && (
          <div className="result-card" role="status" style={{ marginTop: '24px' }}>
            <div className="result-icon" aria-hidden="true">✓</div>
            <div className="result-info">
              <h2>PDF merged successfully</h2>
              <p>Your merged file was downloaded. You can also download it again.</p>
            </div>
            <div className="result-actions">
              <DownloadButton url={result.url} filename={result.filename} label="Download Merged PDF" />
            </div>
          </div>
        )}

        <div className="tool-info">
          <ToolPageLayout toolId="merge-pdf" sections={['summary', 'steps', 'details', 'faqs', 'related']} containerClassName="tool-seo-content" />
        </div>
      </div>
    </div>
  )
}
