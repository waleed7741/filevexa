export const PROGRAMMATIC_TOOLS = {
  'convert-png-to-jpg': {
    title: 'Convert PNG to JPG Online Free — Private & Fast | FileVexa',
    description: 'Convert PNG images to JPG in your browser. Adjust quality, download the result, and keep your files on your device.',
    heading: 'Convert PNG to JPG Online',
    intro: 'Turn PNG images into widely compatible JPG files with browser-based conversion. Choose an image, convert it locally, and download the result without sending the image to a conversion server.',
    kind: 'image',
    format: 'jpeg',
    outputLabel: 'JPG',
    faqs: [
      { question: 'Are my PNG images uploaded?', answer: 'No. The selected image is decoded and converted by your browser. FileVexa does not upload the input or output image.' },
      { question: 'Does JPG support transparency?', answer: 'No. Transparent pixels in a PNG are rendered on a white background when exported as JPG.' },
      { question: 'Can I choose the JPG quality?', answer: 'This tool exports at a high-quality browser setting. JPG is a lossy format, so some compression is expected.' },
    ],
    related: [
      { label: 'Convert WebP to JPG', href: '/webp-to-jpg', emoji: '🔄' },
      { label: 'Image Tools', href: '/image-tools', emoji: '🖼️' },
    ],
  },
  'convert-png-to-webp': {
    title: 'Convert PNG to WebP Online Free — Private & Fast | FileVexa',
    description: 'Convert PNG images to compact WebP files in your browser. No uploads; download your converted image directly.',
    heading: 'Convert PNG to WebP Online',
    intro: 'Create a WebP copy of a PNG image using your browser’s built-in canvas encoder. Your image stays on your device throughout conversion.',
    kind: 'image',
    format: 'webp',
    outputLabel: 'WebP',
    faqs: [
      { question: 'Are PNG images uploaded to FileVexa?', answer: 'No. Your browser performs the conversion locally, and neither the selected image nor the output is uploaded.' },
      { question: 'Does WebP preserve transparency?', answer: 'Yes. Modern browsers preserve PNG transparency when encoding to WebP.' },
      { question: 'Will WebP always be smaller than PNG?', answer: 'WebP is often smaller for photographic images, but the result depends on the image content and browser encoder.' },
    ],
    related: [
      { label: 'Convert WebP to PNG', href: '/webp-to-png', emoji: '🏞️' },
      { label: 'Image Tools', href: '/image-tools', emoji: '🖼️' },
    ],
  },
  'compress-pdf-to-200kb': {
    title: 'Compress PDF to 200KB — Free Online PDF Guide | FileVexa',
    description: 'Learn how to reduce PDF size toward 200KB while protecting your privacy. FileVexa processes supported files locally in your browser.',
    heading: 'How to Reduce a PDF Toward 200KB',
    intro: 'A PDF’s final size depends on its page count, embedded images, and fonts. FileVexa does not currently offer a PDF compressor, so we will not claim to produce a 200KB file. This guide explains what affects PDF size and links to the PDF tools that are available in your browser.',
    kind: 'guide',
    format: null,
    outputLabel: null,
    faqs: [
      { question: 'Can FileVexa currently compress a PDF to 200KB?', answer: 'No. A PDF compression tool is not currently available on FileVexa. The requested size also depends on the document contents, so no tool can guarantee 200KB for every PDF.' },
      { question: 'Does FileVexa upload PDF files?', answer: 'No. Existing PDF tools process files in your browser. FileVexa does not upload document contents to a conversion server.' },
      { question: 'What affects PDF file size?', answer: 'Page count, embedded image resolution and quality, fonts, and document structure all affect the final PDF size.' },
    ],
    related: [
      { label: 'Extract text from PDF', href: '/pdf-to-text', emoji: '📝' },
      { label: 'Convert PDF pages to PNG', href: '/pdf-to-png', emoji: '📄' },
      { label: 'Browse PDF tools', href: '/pdf-tools', emoji: '📚' },
    ],
  },
}

export const PROGRAMMATIC_FAQS = [
  { question: 'Are files uploaded to FileVexa?', answer: 'No. FileVexa tools process file contents locally in your browser without uploading them to a processing service.' },
  { question: 'Does FileVexa require an account?', answer: 'No account or signup is required to use the available FileVexa tools.' },
]
