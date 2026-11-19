import { useEffect, useRef, useState } from 'react'
import { PDFDocument } from 'pdf-lib'
import Breadcrumb from '../components/Breadcrumb'
import ErrorMessage from '../components/ErrorMessage'
import FileUploader from '../components/FileUploader'
import LoadingState from '../components/LoadingState'
import ToolPageLayout from '../components/ToolPageLayout'
import { TOOLS_SEO_DATA } from '../config/toolsSEOData'
import { formatBytes, validateFileType } from '../utils/fileHelpers'
import { loadPdfJs } from '../utils/pdfHelpers'

const MAX_FILE_BYTES = 50 * 1024 * 1024
const MAX_IMAGE_PIXELS = 20_000_000
const MAX_IMAGE_SIDE = 6000
const MAX_PDF_PAGES = 20
const MAX_PDF_PAGE_PIXELS = 4_000_000
const NO_BOXES = []
const IMAGE_EXTENSIONS = ['jpg', 'jpeg', 'png', 'webp']
const IMAGE_TYPES = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp']

function createCanvas(width, height) {
  const canvas = document.createElement('canvas')
  canvas.width = width
  canvas.height = height
  if (!canvas.getContext('2d')) throw new Error('Your browser could not create a canvas for this file.')
  return canvas
}

function imageToCanvas(file) {
  return new Promise((resolve, reject) => {
    const url = URL.createObjectURL(file)
    const image = new Image()
    image.onload = () => {
      URL.revokeObjectURL(url)
      if (image.naturalWidth > MAX_IMAGE_SIDE || image.naturalHeight > MAX_IMAGE_SIDE ||
        image.naturalWidth * image.naturalHeight > MAX_IMAGE_PIXELS) {
        reject(new Error('Images are limited to 6,000 pixels per side and 20 megapixels to protect browser memory.'))
        return
      }
      try {
        const canvas = createCanvas(image.naturalWidth, image.naturalHeight)
        canvas.getContext('2d').drawImage(image, 0, 0)
        resolve(canvas)
      } catch (error) {
        reject(error)
      }
    }
    image.onerror = () => {
      URL.revokeObjectURL(url)
      reject(new Error('This image could not be decoded. Choose a valid JPG, PNG, or WebP file.'))
    }
    image.src = url
  })
}

async function renderPdfPage(pdf, pageNumber) {
  const page = await pdf.getPage(pageNumber)
  const baseViewport = page.getViewport({ scale: 1 })
  const scale = Math.min(
    1.5,
    Math.sqrt(MAX_PDF_PAGE_PIXELS / (baseViewport.width * baseViewport.height)),
    MAX_IMAGE_SIDE / Math.max(baseViewport.width, baseViewport.height)
  )
  const viewport = page.getViewport({ scale })
  const canvas = createCanvas(Math.ceil(viewport.width), Math.ceil(viewport.height))
  const context = canvas.getContext('2d')
  await page.render({ canvasContext: context, viewport }).promise
  return {
    canvas,
    scale,
    pageWidth: baseViewport.width,
    pageHeight: baseViewport.height,
  }
}

function boxForPixelation(context, source, box) {
  const blockWidth = Math.max(1, Math.ceil(box.width / 14))
  const blockHeight = Math.max(1, Math.ceil(box.height / 14))
  const pixelCanvas = createCanvas(blockWidth, blockHeight)
  const pixelContext = pixelCanvas.getContext('2d')
  pixelContext.drawImage(source, box.x, box.y, box.width, box.height, 0, 0, blockWidth, blockHeight)
  context.imageSmoothingEnabled = false
  context.drawImage(pixelCanvas, 0, 0, blockWidth, blockHeight, box.x, box.y, box.width, box.height)
  context.imageSmoothingEnabled = true
}

function paintRedactions(targetCanvas, sourceCanvas, boxes, mode, draft, fillWhite = false) {
  const context = targetCanvas.getContext('2d')
  context.clearRect(0, 0, targetCanvas.width, targetCanvas.height)
  if (fillWhite) {
    context.fillStyle = '#ffffff'
    context.fillRect(0, 0, targetCanvas.width, targetCanvas.height)
  }
  context.drawImage(sourceCanvas, 0, 0)
  for (const box of boxes) {
    if (mode === 'black') {
      context.fillStyle = '#000000'
      context.fillRect(box.x, box.y, box.width, box.height)
    } else {
      boxForPixelation(context, sourceCanvas, box)
    }
    context.strokeStyle = '#ffffff'
    context.lineWidth = Math.max(1, targetCanvas.width / 1200)
    context.strokeRect(box.x, box.y, box.width, box.height)
  }
  if (draft && draft.width > 0 && draft.height > 0) {
    context.fillStyle = mode === 'black' ? 'rgba(0, 0, 0, 0.75)' : 'rgba(24, 24, 24, 0.7)'
    context.fillRect(draft.x, draft.y, draft.width, draft.height)
    context.strokeStyle = '#facc15'
    context.lineWidth = Math.max(2, targetCanvas.width / 900)
    context.strokeRect(draft.x, draft.y, draft.width, draft.height)
  }
}

function canvasToBlob(canvas, type) {
  return new Promise((resolve, reject) => {
    canvas.toBlob((blob) => {
      if (blob) resolve(blob)
      else reject(new Error('Your browser could not encode the redacted output. Try a smaller file.'))
    }, type, 0.95)
  })
}

function getErrorMessage(error, isPdf) {
  const message = String(error?.message || '')
  if (isPdf && (error?.name === 'PasswordException' || /password|encrypt/i.test(message))) {
    return 'Encrypted or password-protected PDFs are not supported. Save an unencrypted copy and try again.'
  }
  if (isPdf && message.startsWith('This tool supports PDFs')) return message
  if (isPdf) return 'This PDF could not be parsed or rendered. It may be corrupt, unsupported, or exceed the browser’s memory limits.'
  return message || 'Could not open this file. Try another image.'
}

export default function RedactPdfImage() {
  const [file, setFile] = useState(null)
  const [fileType, setFileType] = useState('')
  const [pageCount, setPageCount] = useState(0)
  const [pageNumber, setPageNumber] = useState(1)
  const [pageCanvas, setPageCanvas] = useState(null)
  const [redactions, setRedactions] = useState({})
  const [mode, setMode] = useState('black')
  const [imageFormat, setImageFormat] = useState('image/png')
  const [status, setStatus] = useState('idle')
  const [error, setError] = useState('')
  const [outputUrl, setOutputUrl] = useState('')
  const [outputName, setOutputName] = useState('')
  const pdfRef = useRef(null)
  const displayCanvasRef = useRef(null)
  const dragStartRef = useRef(null)
  const [draft, setDraft] = useState(null)

  const currentBoxes = redactions[pageNumber] || NO_BOXES

  useEffect(() => () => {
    pdfRef.current?.destroy()
  }, [])

  useEffect(() => {
    if (!pageCanvas || !displayCanvasRef.current) return
    const display = displayCanvasRef.current
    display.width = pageCanvas.width
    display.height = pageCanvas.height
    paintRedactions(display, pageCanvas, currentBoxes, mode, draft)
  }, [pageCanvas, currentBoxes, mode, draft])

  useEffect(() => () => {
    if (outputUrl) URL.revokeObjectURL(outputUrl)
  }, [outputUrl])

  function setErrorAndIdle(message) {
    setError(message)
    setStatus('idle')
  }

  async function handleFile(nextFile) {
    setError('')
    setOutputUrl('')
    setOutputName('')
    setPageCanvas(null)
    setRedactions({})
    setPageCount(0)
    setPageNumber(1)
    setFile(null)
    pdfRef.current = null

    if (!nextFile.size) {
      setErrorAndIdle('This file is empty. Choose a valid image or PDF.')
      return
    }
    if (nextFile.size > MAX_FILE_BYTES) {
      setErrorAndIdle('Files must be 50 MB or smaller to protect browser memory.')
      return
    }

    const extension = nextFile.name.split('.').pop()?.toLowerCase()
    const isPdf = extension === 'pdf' || nextFile.type === 'application/pdf'
    if (isPdf) {
      if (nextFile.type && nextFile.type !== 'application/pdf' && extension !== 'pdf') {
        setErrorAndIdle('Choose a valid PDF document or JPG, PNG, or WebP image.')
        return
      }
    } else {
      const typeError = validateFileType(nextFile, IMAGE_TYPES, IMAGE_EXTENSIONS)
      if (typeError) {
        setErrorAndIdle('Choose a JPG, JPEG, PNG, WebP, or PDF file.')
        return
      }
    }

    setStatus('loading')
    try {
      if (isPdf) {
        const pdf = await loadPdfJs(nextFile)
        if (!pdf.numPages || pdf.numPages > MAX_PDF_PAGES) {
          const actualPageCount = pdf.numPages
          await pdf.destroy()
          throw new Error(`This tool supports PDFs with 1 to ${MAX_PDF_PAGES} pages. This file has ${actualPageCount} pages.`)
        }
        const firstPage = await renderPdfPage(pdf, 1)
        pdfRef.current = pdf
        setFile(nextFile)
        setFileType('pdf')
        setPageCount(pdf.numPages)
        setPageCanvas(firstPage.canvas)
      } else {
        const canvas = await imageToCanvas(nextFile)
        setFile(nextFile)
        setFileType('image')
        setPageCount(1)
        setPageCanvas(canvas)
      }
      setStatus('ready')
    } catch (openError) {
      setErrorAndIdle(getErrorMessage(openError, isPdf))
    }
  }

  async function navigatePage(nextPage) {
    if (!pdfRef.current || nextPage < 1 || nextPage > pageCount || status === 'loading') return
    setStatus('loading')
    setError('')
    setDraft(null)
    try {
      const rendered = await renderPdfPage(pdfRef.current, nextPage)
      setPageNumber(nextPage)
      setPageCanvas(rendered.canvas)
      setStatus('ready')
    } catch (renderError) {
      setErrorAndIdle(getErrorMessage(renderError, true))
    }
  }

  function pointerPosition(event) {
    const canvas = displayCanvasRef.current
    const rect = canvas.getBoundingClientRect()
    return {
      x: Math.max(0, Math.min(canvas.width, (event.clientX - rect.left) * canvas.width / rect.width)),
      y: Math.max(0, Math.min(canvas.height, (event.clientY - rect.top) * canvas.height / rect.height)),
    }
  }

  function handlePointerDown(event) {
    if (!pageCanvas || status !== 'ready') return
    const canvas = displayCanvasRef.current
    canvas.setPointerCapture(event.pointerId)
    dragStartRef.current = pointerPosition(event)
    setDraft(null)
  }

  function handlePointerMove(event) {
    if (!dragStartRef.current) return
    const current = pointerPosition(event)
    const start = dragStartRef.current
    setDraft({
      x: Math.min(start.x, current.x),
      y: Math.min(start.y, current.y),
      width: Math.abs(current.x - start.x),
      height: Math.abs(current.y - start.y),
    })
  }

  function handlePointerUp(event) {
    if (!dragStartRef.current) return
    const end = pointerPosition(event)
    const start = dragStartRef.current
    dragStartRef.current = null
    const box = {
      x: Math.min(start.x, end.x),
      y: Math.min(start.y, end.y),
      width: Math.abs(end.x - start.x),
      height: Math.abs(end.y - start.y),
    }
    setDraft(null)
    if (box.width < 3 || box.height < 3) return
    setOutputUrl('')
    setOutputName('')
    setRedactions((current) => ({
      ...current,
      [pageNumber]: [...(current[pageNumber] || []), box],
    }))
  }

  function undoBox() {
    setOutputUrl('')
    setOutputName('')
    setRedactions((current) => ({
      ...current,
      [pageNumber]: (current[pageNumber] || []).slice(0, -1),
    }))
  }

  function clearPage() {
    setOutputUrl('')
    setOutputName('')
    setRedactions((current) => ({ ...current, [pageNumber]: [] }))
  }

  function changeMode(nextMode) {
    setOutputUrl('')
    setOutputName('')
    setMode(nextMode)
  }

  function changeImageFormat(event) {
    setOutputUrl('')
    setOutputName('')
    setImageFormat(event.target.value)
  }

  async function exportFile() {
    if (!file || !pageCanvas || status === 'exporting') return
    if (Object.values(redactions).every((boxes) => boxes.length === 0)) {
      setError('Draw at least one redaction box before exporting.')
      return
    }

    setError('')
    setStatus('exporting')
    try {
      if (fileType === 'image') {
        const outputCanvas = createCanvas(pageCanvas.width, pageCanvas.height)
        paintRedactions(outputCanvas, pageCanvas, redactions[1] || [], mode, null, imageFormat === 'image/jpeg')
        const blob = await canvasToBlob(outputCanvas, imageFormat)
        const url = URL.createObjectURL(blob)
        setOutputUrl(url)
        setOutputName(`redacted-image.${imageFormat === 'image/jpeg' ? 'jpg' : 'png'}`)
      } else {
        const flattenedPdf = await PDFDocument.create()
        for (let index = 1; index <= pageCount; index += 1) {
          const rendered = await renderPdfPage(pdfRef.current, index)
          const redactedCanvas = createCanvas(rendered.canvas.width, rendered.canvas.height)
          paintRedactions(redactedCanvas, rendered.canvas, redactions[index] || [], mode, null)
          const pngBlob = await canvasToBlob(redactedCanvas, 'image/png')
          const image = await flattenedPdf.embedPng(new Uint8Array(await pngBlob.arrayBuffer()))
          const outputPage = flattenedPdf.addPage([rendered.pageWidth, rendered.pageHeight])
          outputPage.drawImage(image, {
            x: 0,
            y: 0,
            width: rendered.pageWidth,
            height: rendered.pageHeight,
          })
          setStatus(`exporting-${index}`)
        }
        const bytes = await flattenedPdf.save()
        const url = URL.createObjectURL(new Blob([bytes], { type: 'application/pdf' }))
        setOutputUrl(url)
        setOutputName('redacted-document.pdf')
      }
      setStatus('done')
    } catch (exportError) {
      setError(getErrorMessage(exportError, fileType === 'pdf'))
      setStatus('ready')
    }
  }

  function reset() {
    pdfRef.current?.destroy()
    pdfRef.current = null
    setFile(null)
    setFileType('')
    setPageCount(0)
    setPageNumber(1)
    setPageCanvas(null)
    setRedactions({})
    setOutputUrl('')
    setOutputName('')
    setError('')
    setStatus('idle')
  }

  const redactionCount = Object.values(redactions).reduce((total, boxes) => total + boxes.length, 0)
  const isBusy = status === 'loading' || status.startsWith('exporting')
  const tool = TOOLS_SEO_DATA['redact-pdf-image']

  return (
    <ToolPageLayout toolId="redact-pdf-image">
      <div className="tool-page">
        <div className="container">
          <Breadcrumb items={[
            { label: 'Home', href: '/' },
            { label: 'PDF Tools', href: '/pdf-tools' },
            { label: tool.name },
          ]} />
          <header className="tool-page-header">
            <h1>Sensitive Document &amp; Image Redactor</h1>
            <p>Cover private details in an image or PDF on your device, then export a flattened copy.</p>
            <p className="privacy-notice"><span aria-hidden="true">🔒</span> Files are opened, edited, and exported locally in this browser.</p>
          </header>

          {!file && (
            <FileUploader
              accept=".jpg,.jpeg,.png,.webp,.pdf,image/jpeg,image/png,image/webp,application/pdf"
              acceptLabel=".jpg, .jpeg, .png, .webp, .pdf (up to 50 MB; PDFs up to 20 pages)"
              onFile={handleFile}
              disabled={isBusy}
            />
          )}

          {file && (
            <div className="file-info-card">
              <div className="file-info-icon" aria-hidden="true">{fileType === 'pdf' ? '📄' : '🖼️'}</div>
              <div className="file-info-details">
                <div className="file-info-name">{file.name}</div>
                <div className="file-info-size">{formatBytes(file.size)}{fileType === 'pdf' ? ` · ${pageCount} pages` : ''}</div>
              </div>
              <button type="button" className="file-info-remove" onClick={reset} disabled={isBusy} aria-label="Choose another file">✕</button>
            </div>
          )}

          <ErrorMessage message={error} />

          {status === 'loading' && <LoadingState message="Opening file locally…" />}
          {typeof status === 'string' && status.startsWith('exporting') && (
            <LoadingState message={status === 'exporting' ? 'Flattening redactions locally…' : `Rasterizing PDF page ${status.split('-')[1]} of ${pageCount}…`} />
          )}

          {pageCanvas && status !== 'loading' && (
            <section className="redactor-workspace" aria-label="Redaction workspace">
              <div className="redactor-toolbar">
                {fileType === 'pdf' && (
                  <div className="redactor-page-controls" aria-label="PDF page navigation">
                    <button type="button" className="btn btn-secondary btn-sm" onClick={() => navigatePage(pageNumber - 1)} disabled={pageNumber <= 1 || isBusy}>Previous page</button>
                    <span>Page {pageNumber} of {pageCount}</span>
                    <button type="button" className="btn btn-secondary btn-sm" onClick={() => navigatePage(pageNumber + 1)} disabled={pageNumber >= pageCount || isBusy}>Next page</button>
                  </div>
                )}
                <fieldset className="redactor-mode">
                  <legend>Redaction mode</legend>
                  <label><input type="radio" name="redaction-mode" value="black" checked={mode === 'black'} onChange={() => changeMode('black')} /> Solid Blackout</label>
                  <label><input type="radio" name="redaction-mode" value="pixelate" checked={mode === 'pixelate'} onChange={() => changeMode('pixelate')} /> Heavy Pixelate</label>
                </fieldset>
                <div className="redactor-actions">
                  <button type="button" className="btn btn-secondary btn-sm" onClick={undoBox} disabled={!currentBoxes.length || isBusy}>Undo last box</button>
                  <button type="button" className="btn btn-ghost btn-sm" onClick={clearPage} disabled={!currentBoxes.length || isBusy}>Clear this page</button>
                </div>
              </div>

              <p className="redactor-instructions">Click and drag over each detail to hide. Redactions on other pages are kept while you navigate. {redactionCount} box{redactionCount === 1 ? '' : 'es'} marked.</p>
              <div className="redactor-canvas-wrap">
                <canvas
                  ref={displayCanvasRef}
                  className="redactor-canvas"
                  aria-label={`Editable page ${pageNumber}; drag to mark sensitive information`}
                  onPointerDown={handlePointerDown}
                  onPointerMove={handlePointerMove}
                  onPointerUp={handlePointerUp}
                  onPointerCancel={handlePointerUp}
                />
              </div>

              {fileType === 'image' && (
                <label className="redactor-format">
                  Image output format
                  <select value={imageFormat} onChange={changeImageFormat}>
                    <option value="image/png">PNG</option>
                    <option value="image/jpeg">JPEG</option>
                  </select>
                </label>
              )}
              {fileType === 'pdf' && <p className="redactor-note">The PDF export rasterizes every page at up to 4 megapixels per page. It will not retain selectable text or the original embedded document structure.</p>}

              <div className="redactor-export">
                <button type="button" className="btn btn-primary btn-lg" onClick={exportFile} disabled={isBusy || redactionCount === 0}>
                  {fileType === 'pdf' ? 'Export flattened PDF' : 'Export redacted image'}
                </button>
                {outputUrl && (
                  <a className="btn btn-success btn-lg" href={outputUrl} download={outputName}>
                    Download {outputName}
                  </a>
                )}
              </div>
            </section>
          )}
        </div>
      </div>
    </ToolPageLayout>
  )
}
