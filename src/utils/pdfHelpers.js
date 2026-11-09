import * as pdfjsLib from 'pdfjs-dist';
import { PDFDocument } from 'pdf-lib';
import pdfWorkerUrl from 'pdfjs-dist/build/pdf.worker.min.mjs?url';

pdfjsLib.GlobalWorkerOptions.workerSrc = pdfWorkerUrl;

/**
 * Loads a PDF document from a File object
 * @param {File} file 
 * @returns {Promise<import('pdfjs-dist').PDFDocumentProxy>}
 */
export async function loadPdfJs(file) {
  const arrayBuffer = await file.arrayBuffer();
  const loadingTask = pdfjsLib.getDocument({ data: new Uint8Array(arrayBuffer) });
  return loadingTask.promise;
}

/**
 * Render a specific page of a PDF to a PNG Blob
 * @param {import('pdfjs-dist').PDFDocumentProxy} pdfDoc 
 * @param {number} pageNumber 1-based index
 * @param {number} scale Optional scale factor
 * @returns {Promise<Blob>}
 */
export async function renderPdfPageToPngBlob(pdfDoc, pageNumber, scale = 2.0) {
  const page = await pdfDoc.getPage(pageNumber);
  const viewport = page.getViewport({ scale });
  
  const canvas = document.createElement('canvas');
  const context = canvas.getContext('2d');
  canvas.height = viewport.height;
  canvas.width = viewport.width;

  const renderContext = {
    canvasContext: context,
    viewport: viewport
  };

  await page.render(renderContext).promise;

  return new Promise((resolve, reject) => {
    canvas.toBlob((blob) => {
      if (blob) {
        resolve(blob);
      } else {
        reject(new Error('Canvas to Blob conversion failed'));
      }
    }, 'image/png');
  });
}

export async function extractTextFromPage(pdfDoc, pageNumber) {
  const page = await pdfDoc.getPage(pageNumber);
  const textContent = await page.getTextContent();
  
  let extractedText = '';
  let lastY = null;

  for (const item of textContent.items) {
    if (item.str === undefined) continue;

    const currentY = item.transform[5];
    const height = item.height || 12;

    if (lastY !== null) {
      const yDifference = Math.abs(currentY - lastY);
      
      if (yDifference > height * 1.5) {
        // Large vertical gap: simulated paragraph
        extractedText += '\n\n';
      } else if (yDifference > height * 0.4) {
        // Small vertical gap: simple line break
        extractedText += '\n';
      } else if (extractedText.length > 0 && !extractedText.endsWith(' ') && !extractedText.endsWith('\n')) {
        // Same line, insert space
        extractedText += ' ';
      }
    }

    extractedText += item.str;
    
    if (item.hasEOL) {
      extractedText += '\n';
      lastY = null; // Reset so the next item doesn't trigger a double newline
    } else {
      lastY = currentY;
    }
  }

  return extractedText.trim();
}

/**
 * Extracts text and applies basic Markdown formatting heuristically
 * @param {import('pdfjs-dist').PDFDocumentProxy} pdfDoc 
 * @param {number} pageNumber 1-based index
 * @returns {Promise<string>}
 */
export async function extractMarkdownFromPage(pdfDoc, pageNumber) {
  const page = await pdfDoc.getPage(pageNumber);
  const textContent = await page.getTextContent();
  
  let markdown = '';
  let lastY = null;
  let lineText = '';
  
  // Calculate average height to distinguish headings from paragraphs
  const heights = textContent.items.map(item => item.height).filter(h => h > 0);
  const avgHeight = heights.length ? heights.reduce((a, b) => a + b, 0) / heights.length : 12;

  textContent.items.forEach((item, i) => {
    // Basic newline detection based on Y coordinate changes
    const currentY = item.transform[5]; // Y translation
    
    if (lastY !== null && Math.abs(currentY - lastY) > item.height * 0.5) {
      markdown += lineText.trim() + '\n\n';
      lineText = '';
    }
    
    // Heuristic for headers: significantly taller than average
    const isHeading = item.height > avgHeight * 1.5;
    
    let text = item.str;
    if (isHeading && text.trim().length > 0) {
      text = '## ' + text;
    }
    
    lineText += text + ' ';
    lastY = currentY;
  });
  
  if (lineText) {
    markdown += lineText.trim() + '\n\n';
  }

  return markdown;
}

/**
 * Removes specific pages from a PDF
 * @param {File} file 
 * @param {number[]} pagesToRemove Array of 1-based page indices to remove
 * @returns {Promise<Uint8Array>}
 */
export async function removePagesFromPdf(file, pagesToRemove) {
  const arrayBuffer = await file.arrayBuffer();
  const pdfDoc = await PDFDocument.load(arrayBuffer);
  
  // pdf-lib uses 0-based page indices
  // We sort in descending order so that removing a page doesn't shift the indices of subsequent pages to remove
  const indicesToRemove = pagesToRemove
    .map(p => p - 1)
    .sort((a, b) => b - a);

  for (const index of indicesToRemove) {
    pdfDoc.removePage(index);
  }

  return pdfDoc.save();
}

/**
 * Extracts specific pages from a PDF to form a new PDF
 * @param {File} file 
 * @param {number[]} pagesToKeep Array of 1-based page indices to keep
 * @returns {Promise<Uint8Array>}
 */
export async function extractPagesFromPdf(file, pagesToKeep) {
  const arrayBuffer = await file.arrayBuffer();
  const sourcePdf = await PDFDocument.load(arrayBuffer);
  
  const newPdf = await PDFDocument.create();
  
  // pdf-lib uses 0-based page indices
  const indicesToKeep = pagesToKeep.map(p => p - 1);
  
  const copiedPages = await newPdf.copyPages(sourcePdf, indicesToKeep);
  
  for (const page of copiedPages) {
    newPdf.addPage(page);
  }

  return newPdf.save();
}
