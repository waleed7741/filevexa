import { useEffect, useRef, useState } from 'react'
import Breadcrumb from '../Breadcrumb'
import ErrorMessage from '../ErrorMessage'
import FaqSection from '../FaqSection'
import FileUploader from '../FileUploader'
import LoadingState from '../LoadingState'
import ToolPageLayout from '../ToolPageLayout'
import { getToolFaqItems } from '../../config/toolsSEOData'
import { createObjectUrl, formatBytes, replaceExtension } from '../../utils/fileHelpers'

const PRESETS = [20, 50, 100, 200, 500]
const MAX_FILE_BYTES = 50 * 1024 * 1024
const ALLOWED_EXTENSIONS = ['jpg', 'jpeg', 'png', 'webp', 'heic', 'heif']
const ALLOWED_TYPES = [
  'image/jpeg',
  'image/jpg',
  'image/png',
  'image/webp',
  'image/heic',
  'image/heif',
  'image/heic-sequence',
  'image/heif-sequence',
]
const MIN_QUALITY = 0.05
const MAX_QUALITY = 0.95

function isHeicFile(file) {
  const extension = file.name.split('.').pop()?.toLowerCase()
  return ['heic', 'heif'].includes(extension) || file.type.startsWith('image/heic') || file.type.startsWith('image/heif')
}

async function decodeImage(file) {
  let sourceBlob = file
  if (isHeicFile(file)) {
    const heic2any = (await import('heic2any')).default
    const decoded = await heic2any({ blob: file, toType: 'image/jpeg', quality: 0.95 })
    sourceBlob = Array.isArray(decoded) ? decoded[0] : decoded
  }

  const url = URL.createObjectURL(sourceBlob)
  try {
    const image = new Image()
    await new Promise((resolve, reject) => {
      image.onload = resolve
      image.onerror = () => reject(new Error('Could not decode this image. Please try a different file.'))
      image.src = url
    })
    return { image, url }
  } catch (error) {
    URL.revokeObjectURL(url)
    throw error
  }
}

function canvasToJpeg(canvas, quality) {
  return new Promise((resolve, reject) => {
    canvas.toBlob((blob) => {
      if (!blob) {
        reject(new Error('Your browser could not encode this image. Please try another browser or image.'))
        return
      }
      if (blob.type !== 'image/jpeg') {
        reject(new Error('JPEG image compression is not supported by this browser.'))
        return
      }
      resolve(blob)
    }, 'image/jpeg', quality)
  })
}

async function compressImageToTarget(image, targetBytes) {
  let width = image.naturalWidth
  let height = image.naturalHeight
  const canvas = document.createElement('canvas')
  const context = canvas.getContext('2d')
  if (!context) throw new Error('Your browser could not create an image canvas.')

  for (let resizeAttempt = 0; resizeAttempt < 32; resizeAttempt += 1) {
    canvas.width = width
    canvas.height = height
    context.fillStyle = '#ffffff'
    context.fillRect(0, 0, width, height)
    context.drawImage(image, 0, 0, width, height)

    const lowestQualityBlob = await canvasToJpeg(canvas, MIN_QUALITY)
    if (lowestQualityBlob.size <= targetBytes) {
      let bestBlob = lowestQualityBlob
      let lowQuality = MIN_QUALITY
      let highQuality = MAX_QUALITY
      const highestQualityBlob = await canvasToJpeg(canvas, MAX_QUALITY)
      if (highestQualityBlob.size <= targetBytes) {
        bestBlob = highestQualityBlob
      } else {
        for (let searchAttempt = 0; searchAttempt < 10; searchAttempt += 1) {
          const quality = (lowQuality + highQuality) / 2
          const candidate = await canvasToJpeg(canvas, quality)
          if (candidate.size <= targetBytes) {
            bestBlob = candidate
            lowQuality = quality
          } else {
            highQuality = quality
          }
        }
      }
      return { blob: bestBlob, width, height, metTarget: bestBlob.size <= targetBytes }
    }

    if (width === 1 && height === 1) {
      return { blob: lowestQualityBlob, width, height, metTarget: false }
    }

    const scale = Math.min(0.9, Math.sqrt(targetBytes / lowestQualityBlob.size) * 0.9)
    width = Math.max(1, Math.floor(width * scale))
    height = Math.max(1, Math.floor(height * scale))
  }

  throw new Error('Could not reach the requested file size. Try a larger target size.')
}

function formatKilobytes(bytes) {
  return `${(bytes / 1024).toFixed(1)} KB`
}

export default function CompressImageToKB() {
  const [file, setFile] = useState(null)
  const [image, setImage] = useState(null)
  const [originalPreview, setOriginalPreview] = useState('')
  const [targetKB, setTargetKB] = useState('100')
  const [status, setStatus] = useState('idle')
  const [error, setError] = useState('')
  const [warning, setWarning] = useState('')
  const [result, setResult] = useState(null)
  const [uploadKey, setUploadKey] = useState(0)
  const originalUrlRef = useRef(null)
  const resultUrlRef = useRef(null)
  const selectionRef = useRef(0)

  useEffect(() => () => {
    selectionRef.current += 1
    if (originalUrlRef.current) URL.revokeObjectURL(originalUrlRef.current)
    if (resultUrlRef.current) URL.revokeObjectURL(resultUrlRef.current)
  }, [])

  async function handleFile(selectedFile) {
    selectionRef.current += 1
    const selection = selectionRef.current
    if (originalUrlRef.current) URL.revokeObjectURL(originalUrlRef.current)
    if (resultUrlRef.current) URL.revokeObjectURL(resultUrlRef.current)
    originalUrlRef.current = null
    resultUrlRef.current = null
    setFile(null)
    setImage(null)
    setOriginalPreview('')
    setResult(null)
    setWarning('')
    setError('')
    setUploadKey((key) => key + 1)

    if (selectedFile.size > MAX_FILE_BYTES) {
      setStatus('idle')
      setError('This image is too large for browser-based compression. The maximum file size is 50 MB.')
      return
    }

    const extension = selectedFile.name.split('.').pop()?.toLowerCase()
    if (!ALLOWED_EXTENSIONS.includes(extension) && !ALLOWED_TYPES.includes(selectedFile.type)) {
      setStatus('idle')
      setError('Please choose a JPEG, PNG, WebP, or HEIC image.')
      return
    }

    setFile(selectedFile)
    setStatus('loading')
    try {
      const decoded = await decodeImage(selectedFile)
      if (selection !== selectionRef.current) {
        URL.revokeObjectURL(decoded.url)
        return
      }
      originalUrlRef.current = decoded.url
      setImage(decoded.image)
      setOriginalPreview(decoded.url)
      setStatus('ready')
    } catch (decodeError) {
      if (selection !== selectionRef.current) return
      console.error(decodeError)
      setError(decodeError.message || 'Could not open this image. Please check the file and try again.')
      setStatus('error')
    }
  }

  async function handleCompress() {
    const target = Number(targetKB)
    if (!image || !Number.isFinite(target) || target <= 0) {
      setError('Enter a target size greater than 0 KB.')
      return
    }

    setStatus('compressing')
    setError('')
    setWarning('')
    try {
      const compressed = await compressImageToTarget(image, target * 1024)
      const objectUrl = createObjectUrl(compressed.blob)
      if (resultUrlRef.current) URL.revokeObjectURL(resultUrlRef.current)
      resultUrlRef.current = objectUrl.url
      setResult({
        ...compressed,
        url: objectUrl.url,
        filename: replaceExtension(file.name, 'jpg'),
      })
      if (!compressed.metTarget) {
        setWarning('This image cannot be reduced to the requested size without making it smaller than 1 × 1 pixel. The smallest possible JPEG is shown below.')
      }
      setStatus('done')
    } catch (compressError) {
      console.error(compressError)
      setError(compressError.message || 'Could not compress this image. Please try again.')
      setStatus('ready')
    }
  }

  function handleReset() {
    selectionRef.current += 1
    if (originalUrlRef.current) URL.revokeObjectURL(originalUrlRef.current)
    if (resultUrlRef.current) URL.revokeObjectURL(resultUrlRef.current)
    originalUrlRef.current = null
    resultUrlRef.current = null
    setFile(null)
    setImage(null)
    setOriginalPreview('')
    setResult(null)
    setError('')
    setWarning('')
    setStatus('idle')
    setUploadKey((key) => key + 1)
  }

  const faqItems = getToolFaqItems('compress-image-to-kb')

  return (
    <ToolPageLayout
      toolId="compress-image-to-kb"
      sections={['summary', 'steps', 'features', 'related']}
    >
      <div className="tool-page">
        <div className="container">
          <Breadcrumb items={[{ label: 'Home', href: '/' }, { label: 'Image Tools', href: '/image-tools' }, { label: 'Compress Image to KB' }]} />

          <header className="tool-page-header">
            <h1>Compress Image to a Specific Size in KB</h1>
            <p>Reduce JPEG, PNG, WebP, or HEIC photos to 20 KB, 50 KB, 100 KB, or your own target size.</p>
            <p className="privacy-notice">
              <span aria-hidden="true">🔒</span>
              Your images are processed privately in this browser and are never uploaded.
            </p>
          </header>

          {!file && (
            <FileUploader
              key={uploadKey}
              accept=".jpg,.jpeg,.png,.webp,.heic,.heif,image/jpeg,image/png,image/webp,image/heic,image/heif"
              acceptLabel=".jpg, .png, .webp, .heic"
              onFile={handleFile}
            />
          )}

          {file && (
            <div className="compress-image-workspace">
              <div className="compress-image-source">
                <h2>Original image</h2>
                {originalPreview ? (
                  <img className="compress-image-preview" src={originalPreview} alt={`Preview of ${file.name}`} />
                ) : (
                  <div className="compress-image-preview-placeholder">Preparing image preview…</div>
                )}
                <p className="compress-image-file-name">{file.name}</p>
                <p className="compress-image-file-size">Original size: {formatBytes(file.size)} ({formatKilobytes(file.size)})</p>
              </div>

              <div className="compress-image-controls">
                <h2>Choose target size</h2>
                <p>Pick a preset or enter any custom target in KB.</p>
                <div className="compress-image-presets" aria-label="Target size presets">
                  {PRESETS.map((preset) => (
                    <button
                      type="button"
                      key={preset}
                      className={`btn ${Number(targetKB) === preset ? 'btn-primary' : 'btn-secondary'}`}
                      onClick={() => setTargetKB(String(preset))}
                    >
                      {preset} KB
                    </button>
                  ))}
                </div>
                <label className="compress-image-target-label" htmlFor="compress-target-kb">Custom target size (KB)</label>
                <input
                  id="compress-target-kb"
                  className="compress-image-target-input"
                  type="number"
                  min="0.01"
                  step="any"
                  value={targetKB}
                  onChange={(event) => setTargetKB(event.target.value)}
                />
                {(status === 'ready' || status === 'done') && (
                  <button type="button" className="btn btn-primary btn-lg" onClick={handleCompress}>
                    {status === 'done' ? 'Compress again' : `Compress to ${targetKB || '…'} KB`}
                  </button>
                )}
                {status === 'loading' && <LoadingState message="Preparing your image locally…" />}
                {status === 'compressing' && <LoadingState message="Finding the best image quality for your target size…" />}
              </div>
            </div>
          )}

          <ErrorMessage message={error} />

          {result && (
            <section className="compress-image-result" aria-live="polite">
              <div className="compress-image-result-preview">
                <h2>Compressed image</h2>
                <img className="compress-image-preview" src={result.url} alt={`Compressed preview of ${file.name}`} />
                <p className="compress-image-file-size">Output size: {formatBytes(result.blob.size)} ({formatKilobytes(result.blob.size)})</p>
                <p className="compress-image-dimensions">Dimensions: {result.width} × {result.height} px</p>
              </div>
              <div className="compress-image-result-actions">
                <span className="compress-image-reduction">
                  {result.blob.size <= file.size
                    ? `${Math.round((1 - result.blob.size / file.size) * 100)}% smaller`
                    : `${Math.round((result.blob.size / file.size - 1) * 100)}% larger`}
                </span>
                <a className="btn btn-success btn-lg" href={result.url} download={result.filename}>
                  Download Compressed Image
                </a>
                <button type="button" className="btn btn-ghost" onClick={handleReset}>Compress another image</button>
              </div>
            </section>
          )}

          {warning && <p className="compress-image-warning" role="status">{warning}</p>}

          {file && status !== 'loading' && (
            <button type="button" className="btn btn-ghost compress-image-change" onClick={handleReset}>
              Choose a different image
            </button>
          )}

          <section className="info-section compress-image-faq" aria-labelledby="compress-image-faq-heading">
            <h2 id="compress-image-faq-heading">Image size compression questions</h2>
            <p>
              To compress an image for a job application, choose 20 KB, 50 KB, or 100 KB (or enter the limit shown by the application), select your photo, and download the result. The image is resized only when quality adjustment alone cannot meet your requested size. FileVexa processes your photo locally, so it is not uploaded or shared.
            </p>
            <FaqSection items={faqItems} />
          </section>
        </div>
      </div>
    </ToolPageLayout>
  )
}
