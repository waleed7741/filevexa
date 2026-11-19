import { useEffect, useMemo, useState } from 'react'
import Breadcrumb from '../components/Breadcrumb'
import ErrorMessage from '../components/ErrorMessage'
import FileUploader from '../components/FileUploader'
import ToolPageLayout from '../components/ToolPageLayout'
import { TOOLS_SEO_DATA } from '../config/toolsSEOData'
import { validateFileType } from '../utils/fileHelpers'

const MAX_FILE_BYTES = 50 * 1024 * 1024
const MAX_PIXELS = 24_000_000
const MAX_SIDE = 6000
const ALLOWED_EXTENSIONS = ['jpg', 'jpeg', 'png', 'webp']
const ALLOWED_TYPES = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp']

const PHOTO_PRESETS = {
  passport: { width: 413, height: 531, targetKB: 50 },
  exam: { width: 200, height: 230, targetKB: 20 },
}
const SIGNATURE_PRESETS = {
  'strip-small': { width: 140, height: 60, targetKB: 10 },
  'strip-large': { width: 300, height: 100, targetKB: 20 },
}

function readImage(url) {
  return new Promise((resolve, reject) => {
    const image = new Image()
    image.onload = () => resolve(image)
    image.onerror = () => reject(new Error('This image could not be decoded. Try a valid JPG, PNG, or WebP file.'))
    image.src = url
  })
}

function canvasToBlob(canvas, type, quality) {
  return new Promise((resolve, reject) => {
    canvas.toBlob((blob) => {
      if (!blob) {
        reject(new Error('Your browser could not encode this image. Try another image or browser.'))
        return
      }
      resolve(blob)
    }, type, quality)
  })
}

async function resizeImage(image, width, height, targetKB, useWhiteBackground) {
  const canvas = document.createElement('canvas')
  canvas.width = width
  canvas.height = height
  const context = canvas.getContext('2d')
  if (!context) throw new Error('Your browser could not create an image canvas.')

  if (useWhiteBackground) {
    context.fillStyle = '#ffffff'
    context.fillRect(0, 0, width, height)
  }
  context.drawImage(image, 0, 0, width, height)

  if (!useWhiteBackground) {
    return { blob: await canvasToBlob(canvas, 'image/png'), extension: 'png' }
  }

  const targetBytes = targetKB * 1024
  let low = 0.1
  let high = 0.95
  let bestBlob = await canvasToBlob(canvas, 'image/jpeg', low)
  const highQualityBlob = await canvasToBlob(canvas, 'image/jpeg', high)
  if (highQualityBlob.size <= targetBytes) {
    return { blob: highQualityBlob, extension: 'jpg' }
  }

  for (let attempt = 0; attempt < 9; attempt += 1) {
    const quality = (low + high) / 2
    const candidate = await canvasToBlob(canvas, 'image/jpeg', quality)
    if (candidate.size <= targetBytes) {
      bestBlob = candidate
      low = quality
    } else {
      high = quality
    }
  }
  return { blob: bestBlob, extension: 'jpg' }
}

function downloadBlob(blob, filename) {
  const url = URL.createObjectURL(blob)
  const anchor = document.createElement('a')
  anchor.href = url
  anchor.download = filename
  anchor.click()
  window.setTimeout(() => URL.revokeObjectURL(url), 1000)
}

function ResizerPanel({ kind, onOutput }) {
  const isSignature = kind === 'signature'
  const presets = isSignature ? SIGNATURE_PRESETS : PHOTO_PRESETS
  const defaultPreset = isSignature ? 'strip-small' : 'passport'
  const [file, setFile] = useState(null)
  const [preset, setPreset] = useState(defaultPreset)
  const [width, setWidth] = useState(presets[defaultPreset].width)
  const [height, setHeight] = useState(presets[defaultPreset].height)
  const [targetKB, setTargetKB] = useState(presets[defaultPreset].targetKB)
  const [whiteBackground, setWhiteBackground] = useState(true)
  const [error, setError] = useState('')
  const [status, setStatus] = useState('idle')
  const [dimensions, setDimensions] = useState(null)
  const [result, setResult] = useState(null)

  const sourceUrl = useMemo(() => file ? URL.createObjectURL(file) : '', [file])
  const resultUrl = useMemo(() => result ? URL.createObjectURL(result.blob) : '', [result])

  useEffect(() => () => {
    if (sourceUrl) URL.revokeObjectURL(sourceUrl)
  }, [sourceUrl])

  useEffect(() => () => {
    if (resultUrl) URL.revokeObjectURL(resultUrl)
  }, [resultUrl])

  useEffect(() => {
    onOutput(kind, result)
  }, [kind, onOutput, result])

  useEffect(() => {
    if (!sourceUrl) return
    let active = true
    readImage(sourceUrl)
      .then((image) => {
        if (active) setDimensions({ width: image.naturalWidth, height: image.naturalHeight })
      })
      .catch((decodeError) => {
        if (active) {
          setError(decodeError.message)
          setFile(null)
        }
      })
    return () => { active = false }
  }, [sourceUrl])

  function handleFile(nextFile) {
    setError('')
    setResult(null)
    if (nextFile.size === 0) {
      setError('This file is empty. Choose a valid image.')
      return
    }
    if (nextFile.size > MAX_FILE_BYTES) {
      setError('Images must be 50 MB or smaller to protect browser memory.')
      return
    }
    const typeError = validateFileType(nextFile, ALLOWED_TYPES, ALLOWED_EXTENSIONS)
    if (typeError) {
      setError('Choose a JPG, JPEG, PNG, or WebP image.')
      return
    }
    setDimensions(null)
    setFile(nextFile)
  }

  function handlePresetChange(event) {
    const nextPreset = event.target.value
    setPreset(nextPreset)
    if (presets[nextPreset]) {
      setWidth(presets[nextPreset].width)
      setHeight(presets[nextPreset].height)
      setTargetKB(presets[nextPreset].targetKB)
    }
  }

  async function handleResize() {
    const outputWidth = Number(width)
    const outputHeight = Number(height)
    const outputTarget = Number(targetKB)
    if (!Number.isInteger(outputWidth) || !Number.isInteger(outputHeight) ||
      outputWidth < 1 || outputHeight < 1 || outputWidth > MAX_SIDE || outputHeight > MAX_SIDE ||
      outputWidth * outputHeight > MAX_PIXELS) {
      setError('Dimensions must be whole pixels, at most 6,000 per side and no more than 24 megapixels.')
      return
    }
    if (!Number.isFinite(outputTarget) || outputTarget < 10 || outputTarget > 200) {
      setError('Choose a target file size between 10 KB and 200 KB.')
      return
    }

    setError('')
    setStatus('working')
    try {
      const image = await readImage(sourceUrl)
      const resized = await resizeImage(image, outputWidth, outputHeight, outputTarget, !isSignature || whiteBackground)
      setResult({
        ...resized,
        width: outputWidth,
        height: outputHeight,
        targetKB: outputTarget,
      })
      setStatus('done')
    } catch (resizeError) {
      setError(resizeError.message || 'Could not resize this image. Try a different file.')
      setStatus('ready')
    }
  }

  function reset() {
    setFile(null)
    setDimensions(null)
    setResult(null)
    setError('')
    setStatus('idle')
  }

  const title = isSignature ? 'Applicant signature' : 'Applicant photo'
  const fileLabel = isSignature ? 'signature-resized' : 'photo-resized'

  return (
    <section className="exam-resizer-panel" aria-labelledby={`${kind}-resizer-heading`}>
      <h2 id={`${kind}-resizer-heading`}>{title}</h2>
      {!file && (
        <FileUploader
          accept=".jpg,.jpeg,.png,.webp,image/jpeg,image/png,image/webp"
          acceptLabel=".jpg, .jpeg, .png, .webp (up to 50 MB)"
          onFile={handleFile}
        />
      )}
      {file && (
        <>
          <div className="file-info-card">
            <div className="file-info-icon" aria-hidden="true">{isSignature ? '✍️' : '🪪'}</div>
            <div className="file-info-details">
              <div className="file-info-name">{file.name}</div>
              <div className="file-info-size">{(file.size / 1024).toFixed(1)} KB{dimensions ? ` · Original ${dimensions.width} × ${dimensions.height} px` : ''}</div>
            </div>
            <button type="button" className="file-info-remove" onClick={reset} aria-label={`Remove ${title.toLowerCase()}`}>✕</button>
          </div>

          <img className="exam-resizer-preview" src={sourceUrl} alt={`Preview of ${file.name}`} />

          <div className="exam-resizer-controls">
            <label>
              Size preset
              <select value={preset} onChange={handlePresetChange}>
                {isSignature ? (
                  <>
                    <option value="strip-small">Signature strip · 140 × 60 px</option>
                    <option value="strip-large">Signature strip · 300 × 100 px</option>
                    <option value="custom">Custom dimensions</option>
                  </>
                ) : (
                  <>
                    <option value="passport">Passport / Visa · 35 × 45 mm ratio (413 × 531 px)</option>
                    <option value="exam">Exam / Job form · 200 × 230 px</option>
                    <option value="custom">Custom dimensions</option>
                  </>
                )}
              </select>
            </label>
            <div className="exam-resizer-dimensions">
              <label>
                Width (px)
                <input type="number" min="1" max={MAX_SIDE} value={width} onChange={(event) => { setWidth(event.target.value); setPreset('custom') }} />
              </label>
              <span aria-hidden="true">×</span>
              <label>
                Height (px)
                <input type="number" min="1" max={MAX_SIDE} value={height} onChange={(event) => { setHeight(event.target.value); setPreset('custom') }} />
              </label>
            </div>
            <label>
              Maximum output size (10–200 KB)
              <input type="number" min="10" max="200" step="1" value={targetKB} onChange={(event) => setTargetKB(event.target.value)} />
            </label>
            {isSignature && (
              <label className="exam-resizer-checkbox">
                <input type="checkbox" checked={whiteBackground} onChange={(event) => setWhiteBackground(event.target.checked)} />
                Fill transparent areas with white (turn off to keep PNG transparency)
              </label>
            )}
            <button type="button" className="btn btn-primary" onClick={handleResize} disabled={status === 'working'}>
              {status === 'working' ? 'Resizing locally…' : result ? 'Resize again' : `Resize ${isSignature ? 'signature' : 'photo'}`}
            </button>
          </div>
        </>
      )}

      <ErrorMessage message={error} />

      {result && resultUrl && (
        <div className="exam-resizer-output" aria-live="polite">
          <h3>Resized {isSignature ? 'signature' : 'photo'}</h3>
          <img className="exam-resizer-preview" src={resultUrl} alt={`Resized ${isSignature ? 'signature' : 'photo'} preview`} />
          <p>Output: {result.width} × {result.height} px · {(result.blob.size / 1024).toFixed(1)} KB ({result.extension.toUpperCase()})</p>
          {result.blob.size > result.targetKB * 1024 && (
            <p className="exam-resizer-warning" role="status">
              The selected target was not achievable at these exact dimensions and format. The actual output size is shown above.
            </p>
          )}
          <a className="btn btn-success" href={resultUrl} download={`${fileLabel}.${result.extension}`}>
            Download {fileLabel}.{result.extension}
          </a>
        </div>
      )}
    </section>
  )
}

export default function ExamPhotoSignatureResizer() {
  const [outputs, setOutputs] = useState({ photo: null, signature: null })
  const handleOutput = (kind, result) => {
    setOutputs((current) => current[kind] === result ? current : { ...current, [kind]: result })
  }
  const tool = TOOLS_SEO_DATA['exam-photo-signature-resizer']

  function downloadBoth() {
    if (outputs.photo) downloadBlob(outputs.photo.blob, `photo-resized.${outputs.photo.extension}`)
    if (outputs.signature) {
      window.setTimeout(() => downloadBlob(outputs.signature.blob, `signature-resized.${outputs.signature.extension}`), 250)
    }
  }

  return (
    <ToolPageLayout toolId="exam-photo-signature-resizer">
      <div className="tool-page">
        <div className="container">
          <Breadcrumb items={[
            { label: 'Home', href: '/' },
            { label: 'Image Tools', href: '/image-tools' },
            { label: tool.name },
          ]} />
          <header className="tool-page-header">
            <h1>Exam &amp; Visa Photo + Signature Resizer</h1>
            <p>Resize both application images locally with exact pixel dimensions and a best-effort file-size target.</p>
            <p className="privacy-notice"><span aria-hidden="true">🔒</span> Images are processed in this browser and are not uploaded.</p>
          </header>

          <div className="exam-resizer-grid">
            <ResizerPanel kind="photo" onOutput={handleOutput} />
            <ResizerPanel kind="signature" onOutput={handleOutput} />
          </div>
          <div className="exam-resizer-combined">
            <button
              type="button"
              className="btn btn-secondary"
              onClick={downloadBoth}
              disabled={!outputs.photo && !outputs.signature}
            >
              Download ready photo and signature
            </button>
            <p>Each image is downloaded as its own file. JPEG quality is adjusted toward the selected maximum; transparent signatures can be saved as PNG.</p>
          </div>
        </div>
      </div>
    </ToolPageLayout>
  )
}
