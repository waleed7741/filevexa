/**
 * fileHelpers.js
 * Shared utility functions for file handling
 */

const MAX_SIZE_MB = 50
const MAX_SIZE_BYTES = MAX_SIZE_MB * 1024 * 1024

/**
 * Format bytes to a human-readable string
 */
export function formatBytes(bytes) {
  if (bytes === 0) return '0 B'
  const k = 1024
  const sizes = ['B', 'KB', 'MB', 'GB']
  const i = Math.floor(Math.log(bytes) / Math.log(k))
  return `${parseFloat((bytes / Math.pow(k, i)).toFixed(1))} ${sizes[i]}`
}

/**
 * Check if file size is within the allowed limit
 * Returns an error string or null
 */
export function validateFileSize(file, maxMb = MAX_SIZE_MB) {
  const maxBytes = maxMb * 1024 * 1024
  if (file.size > maxBytes) {
    return `This file is too large for browser-based conversion. Maximum size is ${maxMb} MB. Please try a smaller file.`
  }
  return null
}

/**
 * Strip extension from filename and append a new one
 */
export function replaceExtension(filename, newExt) {
  const base = filename.replace(/\.[^/.]+$/, '')
  return `${base}.${newExt}`
}

/**
 * Create a safe object URL and return both URL and a revoke function
 */
export function createObjectUrl(blob) {
  const url = URL.createObjectURL(blob)
  return {
    url,
    revoke: () => URL.revokeObjectURL(url),
  }
}

/**
 * Validate that a file's type matches one of the allowed MIME types or extensions
 * Returns an error string or null
 */
export function validateFileType(file, allowedMimes, allowedExts) {
  const ext = file.name.split('.').pop().toLowerCase()

  if (allowedMimes && allowedMimes.length > 0 && file.type) {
    if (allowedMimes.includes(file.type)) return null
  }

  if (allowedExts && allowedExts.length > 0) {
    if (allowedExts.includes(ext)) return null
  }

  return `Please select a supported file. Accepted formats: ${allowedExts ? allowedExts.join(', ').toUpperCase() : ''}`
}
