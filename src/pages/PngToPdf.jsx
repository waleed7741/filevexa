import { useEffect, useRef, useState } from 'react'
import { PDFDocument } from 'pdf-lib'
import Breadcrumb from '../components/Breadcrumb'
import DownloadButton from '../components/DownloadButton'
import ErrorMessage from '../components/ErrorMessage'
import FaqSection from '../components/FaqSection'
import RelatedTools from '../components/RelatedTools'
import ToolPageLayout from '../components/ToolPageLayout'
import SEO from '../components/SEO'
import { getToolFaqItems } from '../config/toolsSEOData'
import { formatBytes } from '../utils/fileHelpers'

const FAQ = getToolFaqItems('png-to-pdf')
const RELATED = [
  { label: 'Merge PDF', href: '/merge-pdf', emoji: '📚' },
  { label: 'JPG to PDF', href: '/jpg-to-pdf', emoji: '🖼️' },
  { label: 'PDF to PNG', href: '/pdf-to-png', emoji: '📄' },
  { label: 'Extract PDF Pages', href: '/extract-pdf-pages', emoji: '✂️' },
  { label: 'Remove PDF Pages', href: '/remove-pdf-pages', emoji: '🗑️' },
]
const PAPER_SIZES = {
  a4: [595.28, 841.89],
  letter: [612, 792],
}

function getPageDimensions(pageSize, orientation, imageWidth, imageHeight) {
  let [width, height] = pageSize === 'fit'
    ? [imageWidth, imageHeight]
    : PAPER_SIZES[pageSize]
  const pageOrientation = orientation === 'auto'
    ? (imageWidth > imageHeight ? 'landscape' : 'portrait')
    : orientation

  if (
    (pageOrientation === 'landscape' && width < height) ||
    (pageOrientation === 'portrait' && width > height)
  ) {
    const previousWidth = width
    width = height
    height = previousWidth
  }

  return [width, height]
}

export default function PngToPdf() {
  const [images, setImages] = useState([])
  const [pageSize, setPageSize] = useState('fit')
  const [orientation, setOrientation] = useState('auto')
  const [isDragging, setIsDragging] = useState(false)
  const [isConverting, setIsConverting] = useState(false)
  const [error, setError] = useState('')
  const [pdfUrl, setPdfUrl] = useState('')
  const [pdfName, setPdfName] = useState('')
  const inputRef = useRef(null)
  const previewUrlsRef = useRef(new Set())
  const pdfUrlRef = useRef('')
  const nextIdRef = useRef(0)

  useEffect(() => () => {
    previewUrlsRef.current.forEach((url) => URL.revokeObjectURL(url))
    if (pdfUrlRef.current) URL.revokeObjectURL(pdfUrlRef.current)
  }, [])

  function clearOutput() {
    if (pdfUrlRef.current) {
      URL.revokeObjectURL(pdfUrlRef.current)
      pdfUrlRef.current = ''
    }
    setPdfUrl('')
    setPdfName('')
  }

  function addFiles(fileList) {
    const selectedFiles = Array.from(fileList || [])
    if (selectedFiles.length === 0) return

    clearOutput()
    const pngFiles = selectedFiles.filter((file) => file.type === 'image/png')
    const invalidCount = selectedFiles.length - pngFiles.length
    const addedImages = pngFiles.map((file) => {
      const url = URL.createObjectURL(file)
      previewUrlsRef.current.add(url)
      nextIdRef.current += 1
      return {
        id: `${file.name}-${file.size}-${file.lastModified}-${nextIdRef.current}`,
        file,
        url,
      }
    })

    if (addedImages.length > 0) {
      setImages((current) => [...current, ...addedImages])
    }
    setError(
      invalidCount > 0
        ? `Skipped ${invalidCount} file${invalidCount === 1 ? '' : 's'}: only PNG images are supported.`
        : ''
    )
  }

  function handleInputChange(event) {
    addFiles(event.target.files)
    event.target.value = ''
  }

  function handleDrop(event) {
    event.preventDefault()
    setIsDragging(false)
    if (!isConverting) addFiles(event.dataTransfer.files)
  }

  function removeImage(id) {
    const image = images.find((item) => item.id === id)
    if (image) {
      URL.revokeObjectURL(image.url)
      previewUrlsRef.current.delete(image.url)
    }
    setImages((current) => current.filter((item) => item.id !== id))
    clearOutput()
  }

  function moveImage(index, direction) {
    setImages((current) => {
      const destination = index + direction
      if (destination < 0 || destination >= current.length) return current
      const reordered = [...current]
      const imageAtIndex = reordered[index]
      reordered[index] = reordered[destination]
      reordered[destination] = imageAtIndex
      return reordered
    })
    clearOutput()
  }

  function setImageDimensions(id, width, height) {
    setImages((current) => current.map((image) => (
      image.id === id ? { ...image, width, height } : image
    )))
  }

  function updateLayout(setter, value) {
    setter(value)
    clearOutput()
  }

  async function handleConvert() {
    if (images.length === 0 || isConverting) return

    const imagesToConvert = [...images]
    clearOutput()
    setError('')
    setIsConverting(true)

    try {
      const pdf = await PDFDocument.create()
      for (const { file } of imagesToConvert) {
        const png = await pdf.embedPng(await file.arrayBuffer())
        const dimensions = getPageDimensions(pageSize, orientation, png.width, png.height)

        const page = pdf.addPage(dimensions)
        const margin = pageSize === 'fit' ? 0 : 24
        const scale = Math.min(
          (dimensions[0] - margin * 2) / png.width,
          (dimensions[1] - margin * 2) / png.height
        )
        const imageWidth = png.width * scale
        const imageHeight = png.height * scale
        page.drawImage(png, {
          x: (dimensions[0] - imageWidth) / 2,
          y: (dimensions[1] - imageHeight) / 2,
          width: imageWidth,
          height: imageHeight,
        })
      }

      const blob = new Blob([await pdf.save()], { type: 'application/pdf' })
      const url = URL.createObjectURL(blob)
      const name = imagesToConvert.length === 1
        ? `${imagesToConvert[0].file.name.replace(/\.png$/i, '')}.pdf`
        : 'png-images.pdf'
      pdfUrlRef.current = url
      setPdfUrl(url)
      setPdfName(name)

      const downloadLink = document.createElement('a')
      downloadLink.href = url
      downloadLink.download = name
      document.body.appendChild(downloadLink)
      downloadLink.click()
      downloadLink.remove()
    } catch (conversionError) {
      console.error(conversionError)
      setError('Could not create the PDF. Check that each selected file is a valid PNG image, then try again.')
    } finally {
      setIsConverting(false)
    }
  }

  return (
    <div className="tool-page">
      <SEO
        title="PNG to PDF Converter - Free Online & Private | FileVexa"
        description="Convert one or multiple PNG images into a single PDF online for free. Choose page size and order; your files stay private in your browser."
        canonical="https://filevexa.pages.dev/png-to-pdf"
      />
      <div className="container">
        <Breadcrumb items={[{ label: 'Home', href: '/' }, { label: 'PDF Tools', href: '/pdf-tools' }, { label: 'PNG to PDF' }]} />

        <div className="tool-page-header">
          <h1>PNG to PDF Converter</h1>
          <p>Combine one or more PNG images into a PDF, arrange the pages, and download the result instantly.</p>
          <p className="privacy-notice">
            <span aria-hidden="true">🔒</span> Images are processed locally in your browser and are never uploaded.
          </p>
        </div>

        <div
          className={`uploader ${isDragging ? 'drag-over' : ''}`}
          onDragOver={(event) => {
            event.preventDefault()
            if (!isConverting) setIsDragging(true)
          }}
          onDragLeave={(event) => {
            if (!event.currentTarget.contains(event.relatedTarget)) setIsDragging(false)
          }}
          onDrop={handleDrop}
          aria-label="PNG image upload area"
        >
          <div className="uploader-icon" aria-hidden="true">📑</div>
          <h3>{images.length > 0 ? 'Add more PNG images' : 'Drag and drop your PNG images here'}</h3>
          <div className="uploader-or"><span>or</span></div>
          <button
            type="button"
            className="btn btn-secondary btn-sm"
            onClick={() => inputRef.current?.click()}
            disabled={isConverting}
          >
            Choose PNG Images
          </button>
          <p className="uploader-formats">Supported format: PNG · Select multiple images at once</p>
          <input
            ref={inputRef}
            type="file"
            accept="image/png,.png"
            multiple
            className="uploader-input"
            onClick={(event) => event.stopPropagation()}
            onChange={handleInputChange}
            disabled={isConverting}
            aria-label="Choose PNG images"
          />
        </div>

        <ErrorMessage message={error} />

        {images.length > 0 && (
          <>
            <section className="info-section" aria-labelledby="png-pdf-layout-heading" style={{ marginTop: '24px' }}>
              <h2 id="png-pdf-layout-heading">PDF layout</h2>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '16px', marginTop: '16px' }}>
                <label style={{ display: 'grid', gap: '6px', fontWeight: 600, fontSize: '14px' }}>
                  Page size
                  <select
                    value={pageSize}
                    onChange={(event) => updateLayout(setPageSize, event.target.value)}
                    disabled={isConverting}
                    style={{ minWidth: '180px', padding: '10px 12px', border: '1px solid var(--color-border)', borderRadius: 'var(--radius-sm)', background: 'white', color: 'var(--color-text)' }}
                  >
                    <option value="fit">Fit to Image</option>
                    <option value="a4">A4</option>
                    <option value="letter">Letter</option>
                  </select>
                </label>
                <label style={{ display: 'grid', gap: '6px', fontWeight: 600, fontSize: '14px' }}>
                  Orientation
                  <select
                    value={orientation}
                    onChange={(event) => updateLayout(setOrientation, event.target.value)}
                    disabled={isConverting}
                    style={{ minWidth: '180px', padding: '10px 12px', border: '1px solid var(--color-border)', borderRadius: 'var(--radius-sm)', background: 'white', color: 'var(--color-text)' }}
                  >
                    <option value="auto">Auto</option>
                    <option value="portrait">Portrait</option>
                    <option value="landscape">Landscape</option>
                  </select>
                </label>
              </div>
              <p style={{ marginTop: '12px' }}>
                {images.length} PNG image{images.length === 1 ? '' : 's'} selected. Each image becomes one PDF page.
              </p>
            </section>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(210px, 1fr))', gap: '16px', marginTop: '20px' }}>
              {images.map((image, index) => (
                <article
                  key={image.id}
                  style={{ border: '1px solid var(--color-border)', borderRadius: 'var(--radius-md)', padding: '14px', display: 'flex', flexDirection: 'column', minWidth: 0 }}
                >
                  <div
                    className="png-pdf-preview-frame"
                    style={{
                      aspectRatio: getPageDimensions(
                        pageSize,
                        orientation,
                        image.width || 1,
                        image.height || 1
                      ).join(' / '),
                    }}
                  >
                    <img
                      src={image.url}
                      alt={`Preview of ${image.file.name}`}
                      onLoad={(event) => setImageDimensions(
                        image.id,
                        event.currentTarget.naturalWidth,
                        event.currentTarget.naturalHeight
                      )}
                    />
                  </div>
                  <p title={image.file.name} style={{ fontSize: '14px', fontWeight: 600, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                    Page {index + 1}: {image.file.name}
                  </p>
                  <p style={{ fontSize: '12px', marginTop: '3px' }}>{formatBytes(image.file.size)}</p>
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px', marginTop: '12px' }}>
                    <button
                      type="button"
                      className="btn btn-secondary btn-sm png-pdf-reorder-btn"
                      onClick={() => moveImage(index, -1)}
                      disabled={isConverting || index === 0}
                      aria-label={`Move ${image.file.name} up`}
                    >
                      Move up
                    </button>
                    <button
                      type="button"
                      className="btn btn-secondary btn-sm png-pdf-reorder-btn"
                      onClick={() => moveImage(index, 1)}
                      disabled={isConverting || index === images.length - 1}
                      aria-label={`Move ${image.file.name} down`}
                    >
                      Move down
                    </button>
                    <button
                      type="button"
                      className="btn btn-ghost btn-sm"
                      onClick={() => removeImage(image.id)}
                      disabled={isConverting}
                      aria-label={`Remove ${image.file.name}`}
                    >
                      Remove
                    </button>
                  </div>
                </article>
              ))}
            </div>

            <div className="mt-6" style={{ display: 'flex', flexWrap: 'wrap', gap: '12px', alignItems: 'center' }}>
              <button
                type="button"
                className="btn btn-primary btn-lg"
                onClick={handleConvert}
                disabled={isConverting || images.length === 0}
              >
                {isConverting ? 'Creating PDF…' : 'Convert to PDF'}
              </button>
              {isConverting && <span role="status" aria-live="polite">Creating PDF locally in your browser…</span>}
            </div>
          </>
        )}

        {pdfUrl && (
          <div className="result-card" style={{ marginTop: '24px' }}>
            <div className="result-icon" aria-hidden="true">✓</div>
            <div className="result-info">
              <h3>PDF created successfully</h3>
              <p>Your download should start automatically.</p>
            </div>
            <div className="result-actions">
              <DownloadButton url={pdfUrl} filename={pdfName} label="Download PDF" />
            </div>
          </div>
        )}

        <div className="tool-info">
          <ToolPageLayout
            toolId="png-to-pdf"
            sections={['steps']}
            containerClassName="tool-seo-content"
            includeSEO={false}
          />
          <section className="info-section" aria-labelledby="png-pdf-privacy-heading">
            <h2 id="png-pdf-privacy-heading">Private PNG to PDF conversion in your browser</h2>
            <p>
              Your selected images are read by this page and assembled with JavaScript on your device.
              FileVexa does not send PNG files to a conversion server, so there is no remote upload or
              processing queue. You can reorder or remove images before creating the PDF, and the original
              PNG files are left unchanged on your device.
            </p>
          </section>
          <section className="info-section" aria-labelledby="png-pdf-faq-heading">
            <h2 id="png-pdf-faq-heading">Frequently Asked Questions</h2>
            <FaqSection items={FAQ} />
          </section>
          <RelatedTools tools={RELATED} />
        </div>
      </div>
    </div>
  )
}
