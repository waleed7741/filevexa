import { TOOL_SEO_DATA } from '../data/toolSEO.js'
import { PROGRAMMATIC_TOOLS } from '../data/programmaticTools.js'

const SITE_URL = 'https://filevexa.pages.dev'

const TOOL_DETAILS = {
  'compress-image-to-kb': {
    inputs: 'JPEG, PNG, WebP, HEIC, and HEIF images',
    outputs: 'JPEG image',
    limits: 'Input images must be 50 MB or smaller. Targets include 20, 50, 100, 200, and 500 KB presets or a custom positive size.',
    notes: 'The tool lowers JPEG quality first, then reduces dimensions if needed. PNG/WebP transparency is rendered on white; very small targets may not be achievable.',
  },
  'heic-to-jpg': {
    inputs: 'HEIC and HEIF images',
    outputs: 'JPEG image with an adjustable 60–100% quality setting',
    limits: 'Input images must be 50 MB or smaller.',
    notes: 'JPEG is widely supported but does not preserve transparency. Larger output files are possible because JPEG may be less compact than the original HEIC.',
  },
  'webp-to-jpg': {
    inputs: 'WebP images',
    outputs: 'JPEG image',
    limits: 'Input images must be 50 MB or smaller.',
    notes: 'JPEG does not support transparency, so transparent pixels are rendered on a solid background.',
  },
  'webp-to-png': {
    inputs: 'WebP images',
    outputs: 'PNG image',
    limits: 'Input images must be 50 MB or smaller.',
    notes: 'PNG uses lossless compression for the decoded pixels and can preserve transparency. The PNG may be larger than the source WebP.',
  },
  'heic-to-png': {
    inputs: 'HEIC and HEIF images',
    outputs: 'PNG image',
    limits: 'Input images must be 50 MB or smaller.',
    notes: 'PNG avoids additional lossy encoding after decoding, but it may take more storage than the original HEIC.',
  },
  'avif-to-jpg': {
    inputs: 'AVIF images',
    outputs: 'JPEG image',
    limits: 'Input images must be 50 MB or smaller. Decoding depends on AVIF support in the browser.',
    notes: 'If an AVIF file cannot be decoded, try an up-to-date browser with AVIF support. JPEG does not preserve transparency.',
  },
  'pdf-to-png': {
    inputs: 'PDF documents',
    outputs: 'One PNG per page, with a ZIP download when the document has multiple pages',
    limits: 'PDF files must be 100 MB or smaller. Large or long documents can use substantial device memory.',
    notes: 'Pages are rendered sequentially in the browser; this tool does not run OCR or edit the original PDF.',
  },
  'png-to-pdf': {
    inputs: 'One or more PNG images',
    outputs: 'A single PDF with pages in the order shown',
    limits: 'No fixed file-size limit is shown; the number and dimensions of images are constrained by available browser memory.',
    notes: 'Choose Fit to Image, A4, or Letter page sizing and reorder or remove images before creating the PDF.',
  },
  'merge-pdf': {
    inputs: 'Unencrypted PDF documents',
    outputs: 'One PDF with source documents appended in the selected order',
    limits: 'Up to 20 files and 500 pages; each file must be 50 MB or smaller and combined input must not exceed 100 MB. Practical limits depend on browser memory.',
    notes: 'Password-protected or corrupted PDFs cannot be merged. Source files are read locally and left unchanged.',
  },
  'jpg-to-pdf': {
    inputs: 'JPG, JPEG, and PNG images, up to 25 MB per image and 100 MB combined',
    outputs: 'One PDF page per image, in the selected order',
    limits: 'Up to 50 images; each image must be 25 MB or smaller and combined input must not exceed 100 MB. Practical limits depend on device memory.',
    notes: 'Choose Fit to Image, A4, or US Letter, Auto/Portrait/Landscape orientation, and a 0–30 mm margin. Large images may use substantial memory.',
  },
  'remove-pdf-pages': {
    inputs: 'PDF documents',
    outputs: 'A new PDF containing the pages not selected for removal',
    limits: 'PDF files must be 100 MB or smaller; practical capacity also depends on browser memory and document complexity.',
    notes: 'The original file is not overwritten. Review the selected pages before downloading the rebuilt document.',
  },
  'extract-pdf-pages': {
    inputs: 'PDF documents',
    outputs: 'A new PDF containing the selected pages',
    limits: 'PDF files must be 100 MB or smaller; practical capacity also depends on browser memory and document complexity.',
    notes: 'Select the pages to keep. This is page extraction, not text extraction or OCR.',
  },
  'pdf-to-text': {
    inputs: 'PDF documents',
    outputs: 'Copyable text and a downloadable .txt file when text is found',
    limits: 'PDF files must be 100 MB or smaller. Scanned pages without an embedded text layer are not recognized.',
    notes: 'This tool extracts existing PDF text; it does not perform optical character recognition (OCR).',
  },
  'pdf-to-markdown': {
    inputs: 'PDF documents',
    outputs: 'Copyable Markdown and a downloadable .md file when text is found',
    limits: 'PDF files must be 100 MB or smaller. Scanned pages without an embedded text layer are not recognized.',
    notes: 'Headings and layout are inferred from extracted text, so tables, columns, and complex page designs may need editing.',
  },
  'qr-code-generator': {
    inputs: 'Text or a URL',
    outputs: 'A downloadable PNG containing the QR code',
    limits: 'No input-length limit is specified. Long payloads create denser codes that may be harder for some cameras to scan.',
    notes: 'Test the downloaded code with a phone camera and confirm the encoded text or destination before sharing it.',
  },
  'word-counter': {
    inputs: 'Text typed or pasted into the page',
    outputs: 'Live word, character, non-space character, and paragraph counts',
    limits: 'No server-side processing is used; extremely large text may be limited by the device and browser.',
    notes: 'Words are counted as whitespace-separated tokens, while paragraphs are separated by one or more line breaks.',
  },
  'password-generator': {
    inputs: 'A chosen length and selected character groups',
    outputs: 'A generated password displayed for copying',
    limits: 'Password length can be set from 4 to 64 characters; at least one character group must be selected.',
    notes: 'Generation uses the browser Web Crypto API. Copy the result into a trusted password manager and avoid sharing it.',
  },
  'text-case-converter': {
    inputs: 'Text typed or pasted into the editor',
    outputs: 'UPPERCASE, lowercase, Title Case, or Sentence case text',
    limits: 'No fixed text-length limit is specified; very large input depends on browser memory and responsiveness.',
    notes: 'Case conversion changes the text in the editor. Review names, acronyms, and other capitalization-sensitive terms before using the result.',
  },
  'lorem-ipsum-generator': {
    inputs: 'Generation options selected in the tool',
    outputs: 'Placeholder text for layouts and mockups',
    limits: 'Choose 1–100 paragraphs and 5–200 words per paragraph.',
    notes: 'Placeholder copy is for design and testing, not factual or publication-ready content.',
  },
  'age-calculator': {
    inputs: 'A date of birth and a comparison date',
    outputs: 'An age breakdown in years, months, and days',
    limits: 'Results depend on the dates entered and the calendar; check the comparison date for your intended use.',
    notes: 'The calculation runs in the page and is not a substitute for official age verification or legal advice.',
  },
  'percentage-calculator': {
    inputs: 'The values requested by the selected percentage calculation',
    outputs: 'A percentage, change, or discount calculation',
    limits: 'Results depend on the values entered; the calculator does not validate business, tax, or financial assumptions.',
    notes: 'Check the selected calculation type and units before applying the result.',
  },
  'convert-png-to-jpg': {
    inputs: 'PNG images up to 25 MB',
    outputs: 'JPEG image encoded at a fixed browser quality setting',
    limits: 'Only PNG input is accepted; each file must be smaller than 25 MB.',
    notes: 'Transparent pixels are rendered onto a background by the browser canvas. The quality control is fixed rather than user-adjustable.',
  },
  'convert-png-to-webp': {
    inputs: 'PNG images up to 25 MB',
    outputs: 'WebP image encoded at a fixed browser quality setting',
    limits: 'Only PNG input is accepted; each file must be smaller than 25 MB.',
    notes: 'The browser must support WebP encoding. The quality control is fixed rather than user-adjustable.',
  },
  'compress-pdf-to-200kb': {
    inputs: 'No file input; this is an informational guide',
    outputs: 'Guidance on PDF size factors and links to available PDF utilities',
    limits: 'FileVexa does not currently provide a PDF compression tool or guarantee a 200 KB result.',
    notes: 'PDF size depends on page count, image content, fonts, and document structure. Use the linked tools for extraction or page conversion instead.',
  },
}

const TARGET_SIZE_PAGES = {
  'compress-image-to-20kb': {
    name: 'Image Compressor to 20KB',
    title: 'Compress Image to 20KB Online Free | FileVexa',
    description: 'Compress a JPEG, PNG, WebP, or HEIC photo to 20 KB for PPSC, exam, passport, and government forms. Free, private, and processed in your browser.',
    h1: 'Compress Image to 20KB for Forms',
    intro: 'Set a 20 KB target for passport photos, PPSC submissions, exams, and government forms. Choose a JPEG, PNG, WebP, or HEIC image; the result downloads as a JPEG.',
    faqIntro: 'To compress a photo for a passport, PPSC, exam, or government form, select the image and keep the 20 KB target. The browser adjusts quality first and resizes only if needed. Check the destination’s size, dimensions, and format rules before submitting.',
    entitySummary: 'Reduce a JPEG, PNG, WebP, or HEIC photo to a 20 KB target for application forms. The browser adjusts JPEG quality and, if needed, dimensions; very small targets may affect image clarity.',
    howToAction: 'compress an image to 20 KB',
    presetKB: 20,
    keywords: 'compress image to 20KB, photo compressor 20KB, passport photo 20KB, PPSC photo size, government form photo compressor',
    targetKeywords: {
      primary: 'compress image to 20KB',
      longTail: ['passport photo 20KB online', 'PPSC photo size 20KB', 'compress image for government form'],
    },
    details: {
      inputs: 'JPEG, PNG, WebP, HEIC, and HEIF images',
      outputs: 'JPEG image at or below 20 KB when achievable',
      limits: 'Input images must be 50 MB or smaller. The 20 KB target is a maximum; complex images may not reach it without substantial resizing.',
      notes: 'The browser lowers JPEG quality first, then reduces dimensions if needed. PNG/WebP transparency is rendered on white. Check the destination form’s image dimensions and format rules.',
    },
    faqs: [
      { q: 'How do I compress a passport photo to 20 KB?', a: 'Select your photo, keep the 20 KB preset, and choose Compress. FileVexa adjusts JPEG quality first and resizes only if needed. Download and check the photo against the application’s required dimensions, format, and size.' },
      { q: 'Can I use a 20 KB image for PPSC or government forms?', a: 'The 20 KB preset is useful when a form sets a 20 KB maximum, including some exam and government submissions. Requirements vary, so confirm the specific form’s size, dimensions, and format rules before uploading.' },
      { q: 'Will the result always be exactly 20 KB?', a: 'No. The target is a maximum, so a successful result is at or below 20 KB. If the image cannot reach the target at the smallest supported dimensions, the tool shows the smallest result it could create.' },
      { q: 'Are my photo and ID details uploaded?', a: 'No. The selected image is decoded and compressed in your browser and is not uploaded to FileVexa for processing. Avoid sharing the downloaded image unless the destination form requires it.' },
      { q: 'Which image formats can I compress to 20 KB?', a: 'You can select JPEG, PNG, WebP, HEIC, or HEIF images up to 50 MB. The compressed download is a JPEG, and transparent areas are filled with white.' },
    ],
    relatedToolIds: ['compress-image-to-kb', 'compress-image-to-50kb', 'compress-image-to-100kb'],
  },
  'compress-image-to-50kb': {
    name: 'Image Compressor to 50KB',
    title: 'Compress Image to 50KB Online Free | FileVexa',
    description: 'Reduce a JPEG, PNG, WebP, or HEIC image to 50 KB for university and job applications. Free browser-based compression with no account or file upload.',
    h1: 'Compress Image to 50KB for Applications',
    intro: 'Prepare a photo for university admissions, job portals, and online applications with a 50 KB target. Select a JPEG, PNG, WebP, or HEIC image; the downloaded result is a JPEG.',
    faqIntro: 'For a university or job portal application, select your photo and keep the 50 KB target. FileVexa adjusts image quality first and reduces dimensions only if necessary. Check the portal’s size, dimensions, and format rules before submitting.',
    entitySummary: 'Compress a JPEG, PNG, WebP, or HEIC photo toward a 50 KB maximum for university admissions and job portal applications. Quality is adjusted before image dimensions are reduced.',
    howToAction: 'compress an image to 50 KB',
    presetKB: 50,
    keywords: 'compress image to 50KB, university application photo 50KB, job portal photo compressor, reduce image size to 50KB',
    targetKeywords: {
      primary: 'compress image to 50KB',
      longTail: ['university application photo 50KB', 'job portal image size 50KB', 'reduce photo size to 50KB online'],
    },
    details: {
      inputs: 'JPEG, PNG, WebP, HEIC, and HEIF images',
      outputs: 'JPEG image at or below 50 KB when achievable',
      limits: 'Input images must be 50 MB or smaller. The 50 KB target is a maximum; image content and dimensions affect the result.',
      notes: 'The browser lowers JPEG quality first, then reduces dimensions if needed. PNG/WebP transparency is rendered on white. Check the application’s image dimensions and format requirements.',
    },
    faqs: [
      { q: 'How can I resize a photo to 50 KB for a university application?', a: 'Choose your photo and use the 50 KB preset. FileVexa adjusts quality first and reduces dimensions only if necessary, then downloads a JPEG. Verify the university portal’s image dimensions and accepted formats as well as its file-size limit.' },
      { q: 'Can I compress a job application photo to 50 KB?', a: 'Yes. Select the image, leave the target at 50 KB, and compress it in your browser. The result is a JPEG at or below the target when achievable; check that it remains clear and meets the employer portal’s rules.' },
      { q: 'Does the compressor guarantee an exact 50 KB file?', a: 'No. The 50 KB setting is a maximum target, not a promise of an exact byte count. FileVexa aims for the best JPEG quality that fits; difficult images may need resizing or may not reach the target.' },
      { q: 'Does FileVexa upload application photos?', a: 'No. Your selected photo is processed locally in your browser and is not uploaded to FileVexa for compression. The website does not require an account to use this tool.' },
      { q: 'What formats are supported for 50 KB compression?', a: 'The tool accepts JPEG, PNG, WebP, HEIC, and HEIF images up to 50 MB and creates a JPEG download. Transparent pixels in PNG or WebP inputs are filled with white.' },
    ],
    relatedToolIds: ['compress-image-to-kb', 'compress-image-to-20kb', 'compress-image-to-100kb'],
  },
  'compress-image-to-100kb': {
    name: 'Image Compressor to 100KB',
    title: 'Compress Image to 100KB Online Free | FileVexa',
    description: 'Compress a JPEG, PNG, WebP, or HEIC image to 100 KB for ID cards, resumes, and web uploads. Free local processing in your browser.',
    h1: 'Compress Image to 100KB for ID Cards and Resumes',
    intro: 'Make an image fit a 100 KB file-size limit for ID cards, resumes, profiles, and web uploads. Select a JPEG, PNG, WebP, or HEIC image and download the compressed JPEG.',
    faqIntro: 'For an ID card, resume, profile, or web upload with a 100 KB limit, select your image and keep the 100 KB target. FileVexa adjusts quality first and resizes only when necessary. Check the destination’s dimensions and format rules before uploading.',
    entitySummary: 'Reduce a JPEG, PNG, WebP, or HEIC image toward a 100 KB maximum for ID-card forms, resumes, profiles, and web uploads. The tool tunes JPEG quality and resizes only when necessary.',
    howToAction: 'compress an image to 100 KB',
    presetKB: 100,
    keywords: 'compress image to 100KB, ID card photo 100KB, resume image compressor, reduce image to 100KB online',
    targetKeywords: {
      primary: 'compress image to 100KB',
      longTail: ['ID card photo 100KB', 'resume photo size 100KB', 'compress image for web upload'],
    },
    details: {
      inputs: 'JPEG, PNG, WebP, HEIC, and HEIF images',
      outputs: 'JPEG image at or below 100 KB when achievable',
      limits: 'Input images must be 50 MB or smaller. The 100 KB target is a maximum; the final dimensions and file size depend on the source image.',
      notes: 'The browser lowers JPEG quality first, then reduces dimensions if needed. PNG/WebP transparency is rendered on white. Check the destination’s image dimensions and file type requirements.',
    },
    faqs: [
      { q: 'How do I make an ID card photo 100 KB?', a: 'Select the photo, use the 100 KB preset, and start compression. The browser adjusts JPEG quality and resizes only if needed. Check the ID application’s photo dimensions, background, and file-format rules before submitting.' },
      { q: 'Can I reduce a resume photo or image to 100 KB?', a: 'Yes. Choose the 100 KB target, select your image, and download the JPEG result. Review the image quality and confirm the resume site’s maximum size and accepted dimensions.' },
      { q: 'Is the compressed image exactly 100 KB?', a: 'The 100 KB setting is a maximum, not an exact size guarantee. The result is at or below that target when achievable; the tool reports when an image cannot be reduced enough.' },
      { q: 'Is my image sent to a server during compression?', a: 'No. FileVexa processes the selected image locally in your browser, without uploading it to a FileVexa processing server. No account or payment is required.' },
      { q: 'Can I compress PNG or HEIC files to 100 KB?', a: 'Yes. JPEG, PNG, WebP, HEIC, and HEIF inputs up to 50 MB are supported. The output is JPEG; transparent areas in PNG and WebP files are filled with white.' },
    ],
    relatedToolIds: ['compress-image-to-kb', 'compress-image-to-20kb', 'compress-image-to-50kb'],
  },
}

const ADDITIONAL_TOOL_FAQS = {
  'convert-png-to-jpg': [
    {
      question: 'How do I convert PNG to JPG online free?',
      answer: 'Choose a PNG image and convert it in your browser, then download the JPG. The tool is free, requires no sign-up, and does not upload your image.',
    },
    {
      question: 'Can I convert PNG to JPG without losing quality?',
      answer: 'JPG uses lossy compression, so some image data may be lost. This tool uses a high-quality setting and keeps the image dimensions; keep the PNG if you need a lossless original.',
    },
    {
      question: 'Can I convert multiple PNG files at once?',
      answer: 'This page converts one PNG at a time. Download the JPG, then choose another image to convert.',
    },
    {
      question: 'What happens to a transparent background when converting PNG to JPG?',
      answer: 'JPG does not support transparency, so transparent pixels are filled with white in the converted image.',
    },
  ],
  'heic-to-jpg': [{
    question: 'Will converting an iPhone HEIC photo make it open on Windows or Android?',
    answer: 'The JPG output is supported by many Windows, Android, email, and editing apps that cannot open HEIC directly. Device and app support can vary, so check the saved JPG in the destination app.',
  }],
  'webp-to-jpg': [{
    question: 'What happens to transparent areas in a WebP when I save it as JPG?',
    answer: 'JPG has no transparency channel. Transparent areas are flattened against a solid background during conversion; use WebP to PNG if you need to keep transparency.',
  }],
  'webp-to-png': [{
    question: 'Should I use PNG or JPG when converting a WebP image?',
    answer: 'Choose PNG when you need transparency or want lossless encoding of the decoded pixels. Choose JPG for a broadly supported photo format when transparency is not needed.',
  }],
  'heic-to-png': [{
    question: 'When is PNG a better output than JPG for a HEIC photo?',
    answer: 'PNG is useful when you want to avoid another lossy encoding step or need a format commonly used in graphics workflows. JPG is usually a smaller, widely supported choice for sharing photos.',
  }],
  'avif-to-jpg': [{
    question: 'What can I try if this page cannot open my AVIF image?',
    answer: 'AVIF decoding depends on browser support. Update your browser and try again; if it still fails, use a browser that supports the particular AVIF image or convert it with another compatible application.',
  }],
  'pdf-to-png': [{
    question: 'Can I choose which pages to convert to PNG?',
    answer: 'The converter renders every page in the uploaded PDF and offers individual page downloads. To create a PDF containing only chosen pages, use Extract PDF Pages first.',
  }],
  'remove-pdf-pages': [{
    question: 'Can I recover pages after downloading the edited PDF?',
    answer: 'The downloaded file contains only the pages left in the document. Keep your original PDF if you may need removed pages later; this tool does not overwrite your source file.',
  }],
  'extract-pdf-pages': [{
    question: 'Does page extraction recognize text in scanned pages?',
    answer: 'Extraction keeps selected PDF pages as document pages; it does not read or recognize text. For scanned-page OCR, use a separate OCR application.',
  }],
  'pdf-to-text': [{
    question: 'Why is some extracted PDF text out of order?',
    answer: 'PDFs position text for visual layout rather than storing it as a simple reading sequence. Multiple columns, tables, and positioned text can therefore produce an order that needs manual correction.',
  }, {
    question: 'Can I convert PDF to text free online without email?',
    answer: 'Yes. Select a PDF with selectable text to extract it for free in your browser. No email or sign-up is needed, and the document is not uploaded to a processing server.',
  }],
  'pdf-to-markdown': [{
    question: 'Can this converter preserve tables and page layout?',
    answer: 'It extracts embedded text and applies basic Markdown formatting. Complex tables, columns, images, and page layout are not represented exactly and may need manual cleanup.',
  }],
  'qr-code-generator': [{
    question: 'Can I use a QR code for a link or other text?',
    answer: 'Yes. Enter a URL or other text and the preview updates as you type. Scan the downloaded PNG before printing or sharing it to confirm the content and readability.',
  }],
  'word-counter': [{
    question: 'How does the word counter define a word?',
    answer: 'The counter splits non-empty text on whitespace and counts the resulting tokens. Punctuation stays attached to tokens, so this is a practical count rather than a language-aware word analysis.',
  }],
  'password-generator': [{
    question: 'Does FileVexa store or send the password it generates?',
    answer: 'The password is generated in the browser and is not sent to a FileVexa password service. Copy it to a password manager before leaving the page if you need to keep it.',
  }],
  'text-case-converter': [{
    question: 'Does Title Case preserve acronyms and names exactly?',
    answer: 'Title Case lowercases the input and capitalizes the first character after spaces. Review acronyms, proper names, and specialized capitalization after conversion.',
  }],
  'lorem-ipsum-generator': [{
    question: 'Can generated Lorem Ipsum be used as real published copy?',
    answer: 'No. Lorem Ipsum is placeholder text for visual layout and design review. Replace it with accurate, reviewed copy before publishing or sharing a finished product.',
  }],
  'age-calculator': [{
    question: 'Can I calculate age on a date other than today?',
    answer: 'Yes. Enter the comparison date supported by the calculator to find the age at that point in time; verify both dates before relying on the result.',
  }],
  'percentage-calculator': [{
    question: 'Can I use the result for a tax or financial decision?',
    answer: 'The calculator performs arithmetic on the values entered. It does not determine applicable tax rules, fees, or financial assumptions; verify those separately.',
  }],
  'convert-png-to-webp': [{
    question: 'Will every browser be able to create a WebP file?',
    answer: 'The browser must support WebP canvas encoding. If conversion fails, update the browser or use another browser that supports WebP output.',
  }],
  'compress-pdf-to-200kb': [{
    question: 'What is the practical way to reduce a PDF file size?',
    answer: 'Review image dimensions and quality, remove unnecessary pages, and avoid embedding content the recipient does not need. FileVexa can remove pages but does not currently compress or optimize PDFs.',
  }],
}

const PROGRAMMATIC_SEO_OVERRIDES = {
  'convert-png-to-jpg': {
    title: 'PNG to JPG Converter Online Free (No Upload) | FileVexa',
    description: 'Convert PNG to JPG online free in seconds with high-quality HD results in your browser. No sign-up or upload; images stay on your device.',
    quickAnswer: 'Convert PNG to JPG online free in your browser: choose one PNG up to 25 MB, convert it, and download the JPG. No sign-up or upload; images stay on your device. The high-quality HD conversion uses lossy JPEG, and transparent areas are filled with white. Convert one image at a time.',
    targetKeywords: {
      primary: 'convert png to jpg online free',
      longTail: [
        'png to jpg without losing quality',
        'convert multiple png files to jpg',
        'convert png transparent background to jpg',
        'png to jpg converter no upload',
      ],
    },
  },
}

const RELATED_BY_CATEGORY = {
  'Image Tools': [
    'heic-to-jpg', 'heic-to-png', 'webp-to-jpg', 'webp-to-png',
    'avif-to-jpg', 'compress-image-to-kb', 'convert-png-to-jpg',
    'convert-png-to-webp', 'png-to-pdf',
  ],
  'PDF Tools': [
    'png-to-pdf', 'pdf-to-png', 'remove-pdf-pages', 'extract-pdf-pages',
    'pdf-to-text', 'pdf-to-markdown', 'compress-pdf-to-200kb',
  ],
  'Daily Utilities': [
    'qr-code-generator', 'password-generator', 'word-counter',
    'text-case-converter', 'lorem-ipsum-generator', 'age-calculator',
    'percentage-calculator',
  ],
  'Text Tools': [
    'word-counter', 'text-case-converter', 'lorem-ipsum-generator',
    'qr-code-generator', 'password-generator',
  ],
  Calculators: [
    'age-calculator', 'percentage-calculator', 'word-counter', 'qr-code-generator',
    'text-case-converter', 'lorem-ipsum-generator',
  ],
}

const TOOL_CARD_DESCRIPTIONS = {
  'compress-image-to-kb': 'Compress JPEG, PNG, WebP, or HEIC images to a chosen KB size.',
  'heic-to-jpg': 'Convert HEIC and HEIF photos to widely supported JPG files.',
  'webp-to-jpg': 'Convert WebP images to JPG for broader app compatibility.',
  'webp-to-png': 'Convert WebP images to PNG while preserving transparency.',
  'heic-to-png': 'Convert HEIC and HEIF photos to PNG images.',
  'avif-to-jpg': 'Convert AVIF images to JPG in your browser.',
  'pdf-to-png': 'Render PDF pages as PNG images for viewing or sharing.',
  'png-to-pdf': 'Combine and order PNG images into a single PDF.',
  'merge-pdf': 'Combine and reorder PDF files into one document.',
  'jpg-to-pdf': 'Turn JPG, JPEG, or PNG images into a paginated PDF.',
  'remove-pdf-pages': 'Remove selected pages and save a new PDF.',
  'extract-pdf-pages': 'Select PDF pages and save them in a separate file.',
  'pdf-to-text': 'Extract selectable text from PDF documents.',
  'pdf-to-markdown': 'Extract PDF text and format it as Markdown.',
  'qr-code-generator': 'Create a downloadable QR code from text or a link.',
  'word-counter': 'Count words, characters, and paragraphs as you type.',
  'password-generator': 'Generate a password with your chosen length and characters.',
  'text-case-converter': 'Convert text to uppercase, lowercase, title, or sentence case.',
  'lorem-ipsum-generator': 'Generate placeholder paragraphs for designs and mockups.',
  'age-calculator': 'Calculate age in years, months, and days between dates.',
  'percentage-calculator': 'Calculate percentages, discounts, and percentage changes.',
  'convert-png-to-jpg': 'Convert PNG images to JPG directly in your browser.',
  'convert-png-to-webp': 'Convert PNG images to compact WebP files.',
  'compress-pdf-to-200kb': 'Explore PDF size factors and browser-based PDF tools.',
  'compress-image-to-20kb': 'Compress photos to a 20 KB target for online forms.',
  'compress-image-to-50kb': 'Compress photos to a 50 KB target for applications.',
  'compress-image-to-100kb': 'Compress images to a 100 KB target for uploads.',
}

function routeToId(href) {
  return href.replace(/^\//, '')
}

function shortDescription(text, fallback) {
  const firstSentence = text.split(/[.!?]\s/)[0]
  if (!firstSentence) return fallback
  return firstSentence.length <= 110
    ? firstSentence
    : `${firstSentence.slice(0, 107).trimEnd()}...`
}

function makeMetaDescription(text, name) {
  const firstSentence = text.split(/(?<=[.!?])\s+/)[0] || `${name} runs in your browser.`
  const base = firstSentence.length > 125
    ? `${firstSentence.slice(0, 122).trimEnd()}...`
    : firstSentence
  const description = `${base} Use the ${name.toLowerCase()} tool in your browser.`
  return description.length <= 160
    ? description
    : `${description.slice(0, 157).trimEnd()}...`
}

function getFaqs(slug, sourceFaqs = []) {
  return [
    ...sourceFaqs.map(({ question, answer }) => ({ q: question, a: answer })),
    ...(ADDITIONAL_TOOL_FAQS[slug] || []).map(({ question, answer }) => ({ q: question, a: answer })),
  ]
}

function normalizeTool(slug, source) {
  const name = source.title
  const details = TOOL_DETAILS[slug]
  const dataType = source.category?.name === 'Image Tools'
    ? 'image files'
    : source.category?.name === 'PDF Tools'
      ? 'PDF files'
      : source.category?.name === 'Calculators'
        ? 'dates and numeric inputs'
        : 'text and generated content'
  const action = slug.replace(/-/g, ' ')
  const summary = shortDescription(source.howTo.intro, `${name} runs in your browser.`)
  const howToAction = source.howTo.heading
    .replace(/^How to\s+/i, '')
    .replace(/\s+online.*$/i, '')
  const sourceSteps = source.howTo.steps
  const steps = sourceSteps.length <= 3
    ? sourceSteps.map(({ title, description }) => `${title}: ${description}`)
    : [
        `${sourceSteps[0].title}: ${sourceSteps[0].description}`,
        `${sourceSteps[1].title}: ${sourceSteps[1].description}`,
        `${sourceSteps.slice(2).map(({ title, description }) => `${title}: ${description}`).join(' ')}`,
      ]

  return {
    id: slug,
    slug,
    url: `${SITE_URL}/${slug}`,
    name,
    title: source.metaTitle || `Free Online ${name} (100% Private, No Upload) - FileVexa`,
    h1: `Free Online ${name}`,
    description: source.metaDescription || makeMetaDescription(source.howTo.intro, name),
    keywords: source.keywords,
    targetKeywords: source.targetKeywords || {
      primary: `${action} online`,
      longTail: [
        `free ${action} online`,
        `${action} no upload`,
        `private ${action} tool`,
      ],
    },
    shortDescription: summary,
    dataType,
    entitySummary: summary,
    processingLocation: source.category?.name === 'Image Tools'
      ? 'Client-Side (Browser JavaScript/Wasm)'
      : 'Client-Side (Browser JavaScript)',
    howToAction,
    howToSteps: steps,
    howToTips: source.howTo.tips,
    features: [
      summary,
      `Input: ${details.inputs}.`,
      `Output: ${details.outputs}.`,
    ],
    details,
    faqs: getFaqs(slug, source.faqs),
    relatedToolIds: (source.related || []).map(({ href }) => routeToId(href)),
    relatedTools: source.related || [],
    applicationCategory: 'UtilityApplication',
    howToIntro: source.howTo.intro,
    quickAnswer: source.quickAnswer || `FileVexa's ${name} is a free browser-based tool. It handles supported inputs on your device; file tools process files locally without uploading them for conversion. No account or payment is required. Processing time and limits depend on your input, browser, and device. Check format requirements and review results before downloading or sharing.`,
    icon: source.icon,
    category: source.category,
    layoutRendered: slug === 'compress-image-to-kb',
  }
}

const toolEntries = Object.entries(TOOL_SEO_DATA).map(([slug, source]) => [
  slug,
  normalizeTool(slug, source),
])

function normalizeProgrammaticTool(slug, source) {
  const isGuide = source.kind === 'guide'
  const seo = PROGRAMMATIC_SEO_OVERRIDES[slug]
  const name = isGuide
    ? 'PDF Size Guide'
    : `PNG to ${source.outputLabel} Converter`
  const dataType = source.kind === 'image' ? 'PNG image files' : 'PDF size information'
  const action = slug.replace(/-/g, ' ')
  const details = TOOL_DETAILS[slug]
  const steps = source.kind === 'image'
    ? [
        `Choose a PNG image from your device. Files are processed locally in your browser.`,
        `Convert the image to ${source.outputLabel} using the browser's image encoder.`,
        `Preview and download the converted ${source.outputLabel} file.`,
      ]
    : [
        'Review the factors that determine a PDF document’s file size.',
        'Browse available PDF tools for local page conversion or text extraction.',
        'Use a dedicated compression utility if you need to reduce the PDF size.',
      ]
  const howToAction = isGuide
    ? 'use this PDF size guide'
    : `convert PNG to ${source.outputLabel}`

  return {
    id: slug,
    slug,
    url: `${SITE_URL}/${slug}`,
    name,
    title: seo?.title || `Free Online ${name} (100% Private, No Upload) - FileVexa`,
    h1: `Free Online ${name}`,
    description: seo?.description || source.description || makeMetaDescription(source.intro, name),
    targetKeywords: seo?.targetKeywords || {
      primary: `${action} online`,
      longTail: [`free ${action}`, `${action} no upload`, `private ${action} online`],
    },
    shortDescription: source.intro,
    dataType,
    entitySummary: source.intro,
    processingLocation: isGuide
      ? 'Informational page; no file processing'
      : 'Client-Side (Browser JavaScript)',
    howToAction,
    howToSteps: steps,
    howToTips: null,
    features: [
      source.intro,
      `Input: ${details.inputs}.`,
      `Output: ${details.outputs}.`,
    ],
    details,
    faqs: getFaqs(slug, source.faqs),
    relatedToolIds: (source.related || []).map(({ href }) => routeToId(href)),
    relatedTools: source.related || [],
    applicationCategory: 'UtilityApplication',
    howToIntro: source.intro,
    quickAnswer: seo?.quickAnswer || source.quickAnswer || `FileVexa's ${name} is a free browser-based tool. It handles supported inputs on your device; file tools process files locally without uploading them for conversion. No account or payment is required. Processing time and limits depend on your input, browser, and device. Check format requirements and review results before downloading or sharing.`,
    format: source.format,
    outputLabel: source.outputLabel,
    icon: source.kind === 'image' ? '🖼️' : '📄',
    category: { name: source.kind === 'image' ? 'Image Tools' : 'PDF Tools' },
    layoutRendered: true,
  }
}

const programmaticEntries = Object.entries(PROGRAMMATIC_TOOLS).map(([slug, source]) => [
  slug,
  normalizeProgrammaticTool(slug, source),
])

export const TOOLS_SEO_DATA = Object.fromEntries([
  ...toolEntries,
  ...programmaticEntries,
])

const baseCompressor = TOOLS_SEO_DATA['compress-image-to-kb']
for (const [slug, page] of Object.entries(TARGET_SIZE_PAGES)) {
  TOOLS_SEO_DATA[slug] = {
    ...baseCompressor,
    ...page,
    id: slug,
    slug,
    url: `${SITE_URL}/${slug}`,
    quickAnswer: `FileVexa's ${page.name} is a free browser-based tool. It handles supported inputs on your device; file tools process files locally without uploading them for conversion. No account or payment is required. Processing time and limits depend on your input, browser, and device. Check format requirements and review results before downloading or sharing.`,
    shortDescription: page.entitySummary,
    processingLocation: baseCompressor.processingLocation,
    howToIntro: page.intro,
    howToSteps: [
      `Select a JPEG, PNG, WebP, HEIC, or HEIF image up to 50 MB.`,
      `Use the ${page.presetKB} KB preset; FileVexa adjusts JPEG quality and resizes only if needed.`,
      'Review the output size and image quality, then download the JPEG.',
    ],
    howToTips: 'Follow the destination form’s exact size, dimensions, and format requirements. Keep your original image and review the compressed result before submitting.',
    features: [
      page.entitySummary,
      `Input: ${page.details.inputs}.`,
      `Output: ${page.details.outputs}.`,
    ],
    layoutRendered: true,
  }
}

for (const [slug, tool] of Object.entries(TOOLS_SEO_DATA)) {
  const targetSizeSlugs = Object.keys(TARGET_SIZE_PAGES)
  const relatedSlugs = slug === 'compress-image-to-kb'
    ? [...targetSizeSlugs, ...(tool.relatedToolIds || [])]
    : targetSizeSlugs.includes(slug)
      ? [...(tool.relatedToolIds || []), 'compress-image-to-kb', ...targetSizeSlugs]
      : [
          ...(tool.relatedToolIds || []),
          ...(RELATED_BY_CATEGORY[tool.category?.name] || []),
        ]
  const uniqueRelatedSlugs = [...new Set(relatedSlugs)]
    .filter((relatedSlug) => relatedSlug !== slug && TOOLS_SEO_DATA[relatedSlug])
    .slice(0, 5)

  tool.relatedToolIds = uniqueRelatedSlugs
  tool.relatedTools = uniqueRelatedSlugs.map((relatedSlug) => {
    const relatedTool = TOOLS_SEO_DATA[relatedSlug]
    return {
      label: relatedTool.name,
      href: `/${relatedSlug}`,
      emoji: relatedTool.icon,
    }
  })
}

export const TOOL_SITE_URL = SITE_URL

export function getToolCards(category) {
  return Object.values(TOOLS_SEO_DATA)
    .filter((tool) => tool.category?.name === category)
    .map((tool) => ({
      title: tool.name,
      cardDescription: TOOL_CARD_DESCRIPTIONS[tool.slug],
      href: `/${tool.slug}`,
      icon: tool.icon,
      type: category === 'Image Tools'
        ? 'image'
        : category === 'PDF Tools'
          ? 'pdf'
          : category === 'Text Tools'
            ? 'text'
            : category === 'Calculators'
              ? 'calc'
              : 'utility',
    }))
}

export function getToolFaqItems(toolId) {
  return (TOOLS_SEO_DATA[toolId]?.faqs || []).map(({ q, a }) => ({
    question: q,
    answer: a,
  }))
}
