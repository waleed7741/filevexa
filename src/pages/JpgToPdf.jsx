import { useEffect, useRef, useState } from 'react'
import { PDFDocument } from 'pdf-lib'
import Breadcrumb from '../components/Breadcrumb'
import DownloadButton from '../components/DownloadButton'
import ErrorMessage from '../components/ErrorMessage'
import ToolPageLayout from '../components/ToolPageLayout'
import { formatBytes } from '../utils/fileHelpers'

const MAX_FILE_BYTES = 25 * 1024 * 1024
const MAX_TOTAL_BYTES = 100 * 1024 * 1024
const MAX_IMAGES = 50
const MAX_IMAGE_PIXELS = 40_000_000
const PAPER_SIZES = {
  a4: [595.28, 841.89],
  letter: [612, 792],
}

function isSupportedImage(file) {
  const extension = file.name.split('.').pop()?.toLowerCase()
  return ['jpg', 'jpeg', 'png'].includes(extension) ||
    ['image/jpeg', 'image/jpg', 'image/png'].includes(file.type)
}

function readImageDimensions(url) {
  return new Promise((resolve, reject) => {
    const image = new Image()
    image.onload = () => resolve({ width: image.naturalWidth, height: image.naturalHeight })
    image.onerror = () => reject(new Error('The image could not be decoded. Try exporting a fresh JPG, JPEG, or PNG copy.'))
    image.src = url
  })
}

function getPageDimensions(pageSize, orientation, imageWidth, imageHeight, margin) {
  let [width, height] = pageSize === 'fit'
    ? [imageWidth + margin * 2, imageHeight + margin * 2]
    : PAPER_SIZES[pageSize]
  const pageOrientation = orientation === 'auto'
    ? (imageWidth > imageHeight ? 'landscape' : 'portrait')
    : orientation

  if (
    (pageOrientation === 'landscape' && width < height) ||
    (pageOrientation === 'portrait' && width > height)
  ) {
    ;[width, height] = [height, width]
  }
  return [width, height]
}

function formatPdfError(error) {
  return error instanceof Error ? error.message : 'The PDF could not be created.'
}

export default function JpgToPdf() {
  const [images, setImages] = useState([])
  const [pageSize, setPageSize] = useState('fit')
  const [orientation, setOrientation] = useState('auto')
  const [marginMm, setMarginMm] = useState('10')
  const [error, setError] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [isCreating, setIsCreating] = useState(false)
  const [isDragging, setIsDragging] = useState(false)
  const [result, setResult] = useState(null)
  const inputRef = useRef(null)
  const previewUrlsRef = useRef(new Set())
  const resultUrlRef = useRef('')
  const nextIdRef = useRef(0)

  useEffect(() => () => {
    previewUrlsRef.current.forEach((url) => URL.revokeObjectURL(url))
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
    let totalBytes = images.reduce((sum, item) => sum + item.file.size, 0)
    let imageCount = images.length

    for (const file of selectedFiles) {
      if (!isSupportedImage(file)) {
        issues.push(`${file.name}: select a JPG, JPEG, or PNG image.`)
        continue
      }
      if (file.size > MAX_FILE_BYTES) {
        issues.push(`${file.name}: exceeds the 25 MB per-image limit.`)
        continue
      }
      if (imageCount >= MAX_IMAGES) {
        issues.push(`Only ${MAX_IMAGES} images can be added to one PDF.`)
        break
      }
      if (totalBytes + file.size > MAX_TOTAL_BYTES) {
        issues.push(`${file.name}: adding it would exceed the 100 MB combined limit.`)
        continue
      }

      const url = URL.createObjectURL(file)
      try {
        const dimensions = await readImageDimensions(url)
        if (dimensions.width * dimensions.height > MAX_IMAGE_PIXELS) {
          URL.revokeObjectURL(url)
          issues.push(`${file.name}: images must be 40 megapixels or smaller for browser processing.`)
          continue
        }
        previewUrlsRef.current.add(url)
        nextIdRef.current += 1
        accepted.push({
          id: `${file.name}-${file.size}-${file.lastModified}-${nextIdRef.current}`,
          file,
          url,
          ...dimensions,
        })
        totalBytes += file.size
        imageCount += 1
      } catch (imageError) {
        URL.revokeObjectURL(url)
        issues.push(`${file.name}: ${formatPdfError(imageError)}`)
      }
    }

    if (accepted.length) setImages((current) => [...current, ...accepted])
    setError(issues.join(' '))
    setIsLoading(false)
  }

  function handleInputChange(event) {
    addFiles(event.target.files)
    event.target.value = ''
  }

  function moveImage(index, direction) {
    setImages((current) => {
      const destination = index + direction
      if (destination < 0 || destination >= current.length) return current
      const reordered = [...current]
      const currentImage = reordered[index]
      reordered[index] = reordered[destination]
      reordered[destination] = currentImage
      return reordered
    })
    clearResult()
  }

  function removeImage(id) {
    const image = images.find((item) => item.id === id)
    if (image) {
      URL.revokeObjectURL(image.url)
      previewUrlsRef.current.delete(image.url)
    }
    setImages((current) => current.filter((item) => item.id !== id))
    clearResult()
  }

  async function createPdf() {
    if (!images.length || isCreating) return
    const parsedMargin = Number(marginMm)
    if (!Number.isFinite(parsedMargin) || parsedMargin < 0 || parsedMargin > 30) {
      setError('Enter a page margin between 0 and 30 mm.')
      return
    }

    setError('')
    clearResult()
    setIsCreating(true)
    try {
      const pdf = await PDFDocument.create()
      const margin = parsedMargin * 72 / 25.4
      for (const image of images) {
        const bytes = await image.file.arrayBuffer()
        const embeddedImage = image.file.type === 'image/png' || image.file.name.toLowerCase().endsWith('.png')
          ? await pdf.embedPng(bytes)
          : await pdf.embedJpg(bytes)
        const [width, height] = getPageDimensions(
          pageSize,
          orientation,
          embeddedImage.width,
          embeddedImage.height,
          margin
        )
        const page = pdf.addPage([width, height])
        const scale = Math.min(
          (width - margin * 2) / embeddedImage.width,
          (height - margin * 2) / embeddedImage.height
        )
        const drawWidth = embeddedImage.width * scale
        const drawHeight = embeddedImage.height * scale
        page.drawImage(embeddedImage, {
          x: (width - drawWidth) / 2,
          y: (height - drawHeight) / 2,
          width: drawWidth,
          height: drawHeight,
        })
      }

      const blob = new Blob([await pdf.save()], { type: 'application/pdf' })
      const url = URL.createObjectURL(blob)
      resultUrlRef.current = url
      setResult({ url, filename: 'images.pdf' })
      const downloadLink = document.createElement('a')
      downloadLink.href = url
      downloadLink.download = 'images.pdf'
      document.body.appendChild(downloadLink)
      downloadLink.click()
      downloadLink.remove()
    } catch (createError) {
      console.error(createError)
      setError(`Could not create the PDF. ${formatPdfError(createError)} Check that each image is valid and that the batch fits available browser memory.`)
    } finally {
      setIsCreating(false)
    }
  }

  const totalBytes = images.reduce((sum, item) => sum + item.file.size, 0)

  return (
    <div className="tool-page">
      <div className="container">
        <Breadcrumb items={[
          { label: 'Home', href: '/' },
          { label: 'PDF Tools', href: '/pdf-tools' },
          { label: 'JPG to PDF' },
        ]} />
        <header className="tool-page-header">
          <h1>JPG to PDF Converter</h1>
          <p>Combine JPG, JPEG, and PNG images into a PDF with custom page order, paper size, orientation, and margins.</p>
          <p className="privacy-notice"><span aria-hidden="true">🔒</span> Images are processed locally in your browser and are never uploaded.</p>
        </header>

        <section
          className={`uploader ${isDragging ? 'drag-over' : ''}`}
          onDragOver={(event) => {
            event.preventDefault()
            if (!isLoading && !isCreating) setIsDragging(true)
          }}
          onDragLeave={(event) => {
            if (!event.currentTarget.contains(event.relatedTarget)) setIsDragging(false)
          }}
          onDrop={(event) => {
            event.preventDefault()
            setIsDragging(false)
            if (!isLoading && !isCreating) addFiles(event.dataTransfer.files)
          }}
          aria-label="Image drop area"
        >
          <div className="uploader-icon" aria-hidden="true">🖼️</div>
          <h2>{images.length ? 'Add more images' : 'Drag and drop JPG or PNG images here'}</h2>
          <div className="uploader-or"><span>or</span></div>
          <button type="button" className="btn btn-secondary btn-sm" onClick={() => inputRef.current?.click()} disabled={isLoading || isCreating}>
            Choose Images
          </button>
          <p className="uploader-formats">JPG · JPEG · PNG · Up to {MAX_IMAGES} images · 25 MB each · 100 MB combined</p>
          <input
            ref={inputRef}
            type="file"
            accept=".jpg,.jpeg,.png,image/jpeg,image/png"
            multiple
            className="uploader-input"
            onClick={(event) => event.stopPropagation()}
            onChange={handleInputChange}
            disabled={isLoading || isCreating}
            aria-label="Choose JPG or PNG images"
          />
        </section>

        <ErrorMessage message={error} />
        {(isLoading || isCreating) && (
          <p className="tool-status" role="status" aria-live="polite">
            {isLoading ? 'Checking images locally…' : 'Creating PDF pages in your browser…'}
          </p>
        )}

        <section className="jpg-pdf-layout info-section" aria-labelledby="jpg-pdf-layout-heading">
          <h2 id="jpg-pdf-layout-heading">PDF page layout</h2>
          <div className="jpg-pdf-controls">
            <label>
              Page size
              <select value={pageSize} onChange={(event) => { setPageSize(event.target.value); clearResult() }} disabled={isCreating}>
                <option value="fit">Fit to Image</option>
                <option value="a4">A4</option>
                <option value="letter">US Letter</option>
              </select>
            </label>
            <label>
              Orientation
              <select value={orientation} onChange={(event) => { setOrientation(event.target.value); clearResult() }} disabled={isCreating}>
                <option value="auto">Auto</option>
                <option value="portrait">Portrait</option>
                <option value="landscape">Landscape</option>
              </select>
            </label>
            <label>
              Margin (mm)
              <input type="number" min="0" max="30" step="1" value={marginMm} onChange={(event) => { setMarginMm(event.target.value); clearResult() }} disabled={isCreating} />
            </label>
          </div>
          <p>Uniform margins are added around each image. Select up to {MAX_IMAGES} images, each no larger than 25 MB.</p>
        </section>

        {images.length > 0 && (
          <section className="multi-file-tool-section" aria-labelledby="jpg-pdf-images-heading">
            <div className="multi-file-tool-heading">
              <div>
                <h2 id="jpg-pdf-images-heading">PDF page order</h2>
                <p>{images.length} image{images.length === 1 ? '' : 's'} · {formatBytes(totalBytes)} total</p>
              </div>
            </div>
            <ol className="image-pdf-list">
              {images.map((image, index) => (
                <li className="image-pdf-item" key={image.id}>
                  <img src={image.url} alt={`Preview of ${image.file.name}`} />
                  <div className="multi-file-details">
                    <strong>{index + 1}. {image.file.name}</strong>
                    <span>{formatBytes(image.file.size)} · {image.width} × {image.height} px</span>
                  </div>
                  <div className="multi-file-actions">
                    <button type="button" className="btn btn-secondary btn-sm" onClick={() => moveImage(index, -1)} disabled={isLoading || isCreating || index === 0} aria-label={`Move ${image.file.name} up`}>Move up</button>
                    <button type="button" className="btn btn-secondary btn-sm" onClick={() => moveImage(index, 1)} disabled={isLoading || isCreating || index === images.length - 1} aria-label={`Move ${image.file.name} down`}>Move down</button>
                    <button type="button" className="btn btn-ghost btn-sm" onClick={() => removeImage(image.id)} disabled={isLoading || isCreating} aria-label={`Remove ${image.file.name}`}>Remove</button>
                  </div>
                </li>
              ))}
            </ol>
            <button type="button" className="btn btn-primary btn-lg" onClick={createPdf} disabled={isCreating || isLoading}>
              {isCreating ? 'Creating PDF…' : 'Create PDF & Download'}
            </button>
          </section>
        )}

        {result && (
          <div className="result-card" role="status" style={{ marginTop: '24px' }}>
            <div className="result-icon" aria-hidden="true">✓</div>
            <div className="result-info">
              <h2>PDF created successfully</h2>
              <p>Your PDF was downloaded. You can also download it again.</p>
            </div>
            <div className="result-actions">
              <DownloadButton url={result.url} filename={result.filename} label="Download PDF" />
            </div>
          </div>
        )}

        <div className="tool-info">
          <ToolPageLayout toolId="jpg-to-pdf" sections={['summary', 'steps', 'details', 'faqs', 'related']} containerClassName="tool-seo-content" />
        </div>
      </div>
    </div>
  )
}
