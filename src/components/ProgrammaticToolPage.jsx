import { useEffect, useRef, useState } from 'react'
import { useLocation } from 'react-router-dom'
import Breadcrumb from './Breadcrumb'
import ErrorMessage from './ErrorMessage'
import FileUploader from './FileUploader'
import ToolPageLayout from './ToolPageLayout'
import { TOOLS_SEO_DATA } from '../config/toolsSEOData'
import { PROGRAMMATIC_TOOLS } from '../data/programmaticTools'
import { createObjectUrl, formatBytes } from '../utils/fileHelpers'
import { fileToJpegBlob, fileToWebpBlob } from '../utils/imageHelpers'

const MAX_FILE_BYTES = 25 * 1024 * 1024

export default function ProgrammaticToolPage() {
  const { pathname } = useLocation()
  const slug = pathname.slice(1)
  const page = PROGRAMMATIC_TOOLS[slug]
  const [file, setFile] = useState(null)
  const [sourceUrl, setSourceUrl] = useState('')
  const [resultUrl, setResultUrl] = useState('')
  const [busy, setBusy] = useState(false)
  const [error, setError] = useState('')
  const urlsRef = useRef([])
  const isMountedRef = useRef(false)

  useEffect(() => {
    isMountedRef.current = true
    return () => {
      isMountedRef.current = false
      urlsRef.current.forEach((url) => URL.revokeObjectURL(url))
    }
  }, [])

  function revoke(url) {
    if (!url) return
    URL.revokeObjectURL(url)
    urlsRef.current = urlsRef.current.filter((item) => item !== url)
  }

  function handleFile(nextFile) {
    setError('')
    if (nextFile.type !== 'image/png' && !nextFile.name.toLowerCase().endsWith('.png')) {
      setError('Choose a PNG image.')
      return
    }
    if (nextFile.size > MAX_FILE_BYTES) {
      setError('Choose an image smaller than 25 MB.')
      return
    }

    revoke(sourceUrl)
    revoke(resultUrl)
    const url = URL.createObjectURL(nextFile)
    urlsRef.current.push(url)
    setFile(nextFile)
    setSourceUrl(url)
    setResultUrl('')
  }

  async function handleConvert() {
    if (!file || busy) return
    setBusy(true)
    setError('')
    try {
      const blob = page.format === 'jpeg'
        ? await fileToJpegBlob(file, 0.92)
        : await fileToWebpBlob(file, 0.92)
      if (!isMountedRef.current) return
      const { url } = createObjectUrl(blob)
      urlsRef.current.push(url)
      revoke(resultUrl)
      setResultUrl(url)
    } catch (conversionError) {
      console.error(conversionError)
      if (isMountedRef.current) {
        setError(conversionError.message || `Could not convert this PNG to ${page.outputLabel}.`)
      }
    } finally {
      if (isMountedRef.current) setBusy(false)
    }
  }

  if (!page) return null

  return (
    <div className="tool-page">
      <div className="container">
        <Breadcrumb items={[{ label: 'Home', href: '/' }, { label: page.heading }]} />
        <header className="tool-page-header">
          <h1>{TOOLS_SEO_DATA[slug]?.h1 || page.heading}</h1>
          <p>{page.intro}</p>
          {page.kind === 'image' && (
            <p className="privacy-notice"><span aria-hidden="true">🔒</span> Your image is processed locally and is not uploaded.</p>
          )}
        </header>

        {page.kind === 'image' ? (
          <>
            {!file && (
              <FileUploader
                accept=".png,image/png"
                acceptLabel="PNG · up to 25 MB"
                onFile={handleFile}
              />
            )}
            {file && (
              <section className="programmatic-converter" aria-label={`${page.heading} controls`}>
                <div className="file-info-card">
                  <img className="programmatic-image-preview" src={sourceUrl} alt={`Preview of ${file.name}`} />
                  <div className="file-info-details">
                    <div className="file-info-name">{file.name}</div>
                    <div className="file-info-size">{formatBytes(file.size)}</div>
                  </div>
                </div>
                <ErrorMessage message={error} />
                <div className="programmatic-actions">
                  <button type="button" className="btn btn-primary" onClick={handleConvert} disabled={busy}>
                    {busy ? 'Converting…' : `Convert to ${page.outputLabel}`}
                  </button>
                  {resultUrl && (
                    <a className="btn btn-success" href={resultUrl} download={`${file.name.replace(/\.png$/i, '')}.${page.format === 'jpeg' ? 'jpg' : 'webp'}`}>
                      Download {page.outputLabel}
                    </a>
                  )}
                  <button
                    type="button"
                    className="btn btn-secondary"
                    onClick={() => {
                      revoke(sourceUrl)
                      revoke(resultUrl)
                      setFile(null)
                      setSourceUrl('')
                      setResultUrl('')
                    }}
                    disabled={busy}
                  >
                    Choose another image
                  </button>
                </div>
              </section>
            )}
          </>
        ) : null}

        <ToolPageLayout
          toolId={slug}
          containerClassName="tool-seo-content"
        />
      </div>
    </div>
  )
}
