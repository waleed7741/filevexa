/**
 * imageHelpers.js
 * Browser-based image conversion utilities using Canvas API
 */

/**
 * Load a File as an HTMLImageElement
 */
export function loadImage(file) {
  return new Promise((resolve, reject) => {
    const url = URL.createObjectURL(file)
    const img = new Image()
    img.onload = () => {
      URL.revokeObjectURL(url)
      resolve(img)
    }
    img.onerror = () => {
      URL.revokeObjectURL(url)
      reject(new Error('Could not load the image. The file may be corrupted or in an unsupported format.'))
    }
    img.src = url
  })
}

/**
 * Convert an HTMLImageElement to a JPEG Blob using a canvas
 * @param {HTMLImageElement} img
 * @param {number} quality  0–1 (default 0.92)
 * @param {string} bgColor  background fill for transparent images (default '#ffffff')
 */
export function imageToJpegBlob(img, quality = 0.92, bgColor = '#ffffff') {
  return new Promise((resolve, reject) => {
    const canvas = document.createElement('canvas')
    canvas.width = img.naturalWidth
    canvas.height = img.naturalHeight
    const ctx = canvas.getContext('2d')

    // Fill background first to handle transparency
    ctx.fillStyle = bgColor
    ctx.fillRect(0, 0, canvas.width, canvas.height)
    ctx.drawImage(img, 0, 0)

    canvas.toBlob(
      (blob) => {
        if (blob) {
          resolve(blob)
        } else {
          reject(new Error('Something went wrong while converting the image. Please try again.'))
        }
      },
      'image/jpeg',
      quality
    )
  })
}

/**
 * Convert an HTMLImageElement to a PNG Blob using a canvas
 * Preserves transparency
 * @param {HTMLImageElement} img
 */
export function imageToPngBlob(img) {
  return new Promise((resolve, reject) => {
    const canvas = document.createElement('canvas')
    canvas.width = img.naturalWidth
    canvas.height = img.naturalHeight
    const ctx = canvas.getContext('2d')

    ctx.drawImage(img, 0, 0)

    canvas.toBlob(
      (blob) => {
        if (blob) {
          resolve(blob)
        } else {
          reject(new Error('Something went wrong while converting the image. Please try again.'))
        }
      },
      'image/png'
    )
  })
}

/**
 * Convert an AVIF/any image File to JPEG blob using browser's native decoding
 * Relies on browser support for the image format
 */
export async function fileToJpegBlob(file, quality = 0.92) {
  const img = await loadImage(file)
  return imageToJpegBlob(img, quality)
}

/**
 * Convert an AVIF/any image File to PNG blob using browser's native decoding
 */
export async function fileToPngBlob(file) {
  const img = await loadImage(file)
  return imageToPngBlob(img)
}
