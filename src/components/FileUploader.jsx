import { useRef, useState } from 'react'

/**
 * FileUploader – drag & drop + click-to-browse file input
 *
 * Props:
 *  accept        string   – MIME types / extensions accepted
 *  acceptLabel   string   – Human-readable label shown in uploader
 *  onFile        fn       – Called with a File object when one is selected
 *  disabled      bool     – Disables interaction
 */
export default function FileUploader({ accept, acceptLabel, onFile, disabled }) {
  const inputRef = useRef(null)
  const [dragOver, setDragOver] = useState(false)

  function handleFiles(files) {
    if (disabled || !files || files.length === 0) return
    onFile(files[0])
  }

  function handleDragOver(e) {
    e.preventDefault()
    if (!disabled) setDragOver(true)
  }

  function handleDragLeave() {
    setDragOver(false)
  }

  function handleDrop(e) {
    e.preventDefault()
    setDragOver(false)
    handleFiles(e.dataTransfer.files)
  }

  function handleKeyDown(e) {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault()
      inputRef.current?.click()
    }
  }

  const zoneId = 'file-drop-zone'

  return (
    <div
      id={zoneId}
      className={`uploader ${dragOver ? 'drag-over' : ''}`}
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}
      onClick={() => !disabled && inputRef.current?.click()}
      onKeyDown={handleKeyDown}
      role="button"
      tabIndex={disabled ? -1 : 0}
      aria-label="File upload area. Click or drag a file here."
      aria-disabled={disabled}
      style={{ cursor: disabled ? 'not-allowed' : 'pointer', opacity: disabled ? 0.6 : 1 }}
    >
      <div className="uploader-icon" aria-hidden="true">
        <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/>
          <polyline points="17 8 12 3 7 8"/>
          <line x1="12" y1="3" x2="12" y2="15"/>
        </svg>
      </div>
      <h3>Drag &amp; drop your file here</h3>
      <div className="uploader-or"><span>or</span></div>
      <button
        type="button"
        className="btn btn-secondary btn-sm"
        onClick={(e) => { e.stopPropagation(); inputRef.current?.click() }}
        disabled={disabled}
        tabIndex={-1}
        aria-label="Choose a file from your device"
      >
        Choose File
      </button>
      {acceptLabel && (
        <p className="uploader-formats">Supported formats: {acceptLabel}</p>
      )}
      <input
        ref={inputRef}
        type="file"
        accept={accept}
        className="uploader-input"
        onChange={(e) => handleFiles(e.target.files)}
        disabled={disabled}
        aria-hidden="true"
        tabIndex={-1}
      />
    </div>
  )
}
