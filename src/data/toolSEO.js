/**
 * src/data/toolSEO.js
 * Comprehensive SEO guides, step-by-step instructions, and FAQs for all FileVexa tools.
 * Provides route-specific usage guides, practical details, and FAQs for each tool.
 */

export const TOOL_SEO_DATA = {
  'compress-image-to-kb': {
    title: 'Compress Image to KB',
    metaTitle: 'Compress Image to Specific Size (20KB, 50KB, 100KB) Free - FileVexa',
    metaDescription: 'Reduce a JPEG, PNG, WebP, or HEIC image toward a chosen KB target. Output is a local JPEG; exact size depends on the image.',
    keywords: 'compress image to 20kb, compress image to 50kb, compress image to 100kb, image KB reducer, resize image size in kb online, free photo compressor',
    href: '/compress-image-to-kb',
    icon: '📉',
    category: { name: 'Image Tools', href: '/image-tools' },
    howTo: {
      heading: 'How to Compress an Image to a Specific Size in KB',
      intro: 'FileVexa helps reduce JPEG, PNG, WebP, and HEIC photos toward a target size such as 20 KB, 50 KB, or 100 KB. Choose a preset or enter a custom size, then the browser adjusts JPEG quality and, if needed, image dimensions. Some images cannot reach a very small target without substantial quality loss. Processing happens on your device; the selected photo is not uploaded to a FileVexa processing service.',
      steps: [
        {
          title: 'Choose an image',
          description: 'Select or drag in a JPEG, PNG, WebP, or HEIC photo. The image is decoded locally in your browser.',
        },
        {
          title: 'Set the target size',
          description: 'Choose a 20 KB, 50 KB, 100 KB, 200 KB, or 500 KB preset, or enter any custom target size in kilobytes.',
        },
        {
          title: 'Compress and download',
          description: 'The tool adjusts image quality and, if needed, dimensions toward your target, then downloads a JPEG. Review the file size and image quality; a very small target may not be achievable.',
        },
      ],
      tips: 'For job applications and online forms, follow the exact maximum file size listed by the destination. If quality alone cannot meet a small target, this tool reduces image dimensions while preserving as much quality as possible.',
    },
    faqs: [
      {
        question: 'How to compress image to 20KB for online job applications?',
        answer: 'Choose the image from your device, select the 20 KB preset, and press Compress. FileVexa adjusts JPEG quality first and reduces image dimensions only if needed. Download the result and check that it meets the job application’s listed format and size requirements.',
      },
      {
        question: 'Are my photos uploaded to any server?',
        answer: 'No. Your photo is decoded, compressed, previewed, and downloaded entirely in your browser. FileVexa does not upload the image to a server.',
      },
      {
        question: 'Can I compress an image to a custom KB size?',
        answer: 'Yes. Enter any positive target size in the custom KB field, or choose one of the 20 KB, 50 KB, 100 KB, 200 KB, and 500 KB presets.',
      },
      {
        question: 'Which image formats can I compress?',
        answer: 'You can select JPEG, PNG, WebP, or HEIC images. The compressed download is a JPEG file, which is widely accepted by online forms. Transparent areas in PNG and WebP images are filled with white because JPEG does not support transparency.',
      },
    ],
    related: [
      { label: 'HEIC to JPG', href: '/heic-to-jpg', emoji: '🖼️' },
      { label: 'WebP to JPG', href: '/webp-to-jpg', emoji: '🔄' },
      { label: 'PNG to JPG', href: '/convert-png-to-jpg', emoji: '📷' },
    ],
  },
  'heic-to-jpg': {
    title: 'HEIC to JPG Converter',
    href: '/heic-to-jpg',
    icon: '🖼️',
    category: { name: 'Image Tools', href: '/image-tools' },
    howTo: {
      heading: 'How to Convert HEIC Images to JPG Online for Free',
      intro:
        'iPhones commonly save photos as HEIC/HEIF, a compact format that some Windows apps, Android devices, email services, and older editors may not open without extra support. Converting a copy to JPG can make a photo easier to share or use in those apps. FileVexa accepts HEIC and HEIF images up to 50 MB and converts them in your browser, so the selected photo is not uploaded to a FileVexa processing service. Conversion time and output size depend on the image and your device.',
      steps: [
        {
          title: 'Select Your HEIC Photos',
          description:
            'Click the file selection area or drag and drop your .heic or .heif images directly into the upload container. Files up to 50MB are supported.',
        },
        {
          title: 'Fine-Tune JPG Quality',
          description:
            'Adjust the quality slider to balance compression ratio and visual fidelity. We recommend 90% for web uploads or 95–100% for photo prints.',
        },
        {
          title: 'Execute Browser Conversion',
          description:
            'Click Convert to process the selected image in your browser. The image is not sent to a FileVexa image-processing service.',
        },
        {
          title: 'Download Converted JPG',
          description:
            'Preview the converted picture and click the download button to instantly save your universal JPG file to your local drive.',
        },
      ],
      tips:
        'Pro Tip: If your photos contain transparent backgrounds or if you plan to edit them in Photoshop, consider using our HEIC to PNG tool instead. For maximum compression without visual loss, a JPEG quality setting between 85% and 92% is ideal for web publishing and email attachments.',
    },
    faqs: [
      {
        question: 'Are my private photos uploaded to a third-party server?',
        answer:
          'The converter reads and converts the selected image in your browser; it does not send the image to a FileVexa file-processing server. This describes the file conversion flow, not general website requests or analytics described in the Privacy Policy.',
      },
      {
        question: 'Why does the converted JPG file sometimes have a larger size than the original HEIC?',
        answer:
          'HEIC utilizes high-efficiency video coding (HEVC) compression algorithms that are significantly more aggressive than 1990s JPEG standards. Converting to JPG expands the raw pixel data to ensure compatibility with devices that lack HEIC decoders. You can lower the quality slider to 80% if you wish to reduce the output file size.',
      },
      {
        question: 'Can I convert HEIF files as well as HEIC?',
        answer:
          'Yes. HEIF (High Efficiency Image Format) is the overarching standard on which Apple HEIC is built. Both .heic and .heif single-frame files are fully supported.',
      },
    ],
    related: [
      { label: 'HEIC to PNG', href: '/heic-to-png', emoji: '📸' },
      { label: 'WebP to JPG', href: '/webp-to-jpg', emoji: '🔄' },
      { label: 'WebP to PNG', href: '/webp-to-png', emoji: '🏞️' },
      { label: 'AVIF to JPG', href: '/avif-to-jpg', emoji: '🎨' },
    ],
  },

  'webp-to-jpg': {
    title: 'WebP to JPG Converter',
    href: '/webp-to-jpg',
    icon: '🔄',
    category: { name: 'Image Tools', href: '/image-tools' },
    howTo: {
      heading: 'How to Convert WebP Graphics to JPG in Your Browser',
      intro:
        'WebP is a common web image format, but some editing, office, or publishing applications may not accept it. Converting a selected WebP image to JPG can help with compatibility; transparent areas are rendered against a background because JPG does not support transparency. Processing happens in your browser, without sending the selected image to a FileVexa image-processing service. Conversion time and appearance depend on the image and browser.',
      steps: [
        {
          title: 'Import WebP File',
          description:
            'Drag your WebP file into the drop zone or browse files from your computer or smartphone. Files up to 50MB are accepted.',
        },
        {
          title: 'Set Compression Quality',
          description:
            'Use the interactive slider to select your desired output quality. The default 90% provides virtually indistinguishable visual fidelity.',
        },
        {
          title: 'Process Locally',
          description:
            'Our browser engine paints the image data to an offscreen canvas and applies standard JPEG compression algorithms in real time.',
        },
        {
          title: 'Save Universal JPG',
          description:
            'Click the download button to save the resulting .jpg image file to your device with original dimensions preserved.',
        },
      ],
      tips:
        'Pro Tip: If your original WebP file contains an alpha transparency channel that you need to preserve, choose the WebP to PNG converter instead, as standard JPG does not support transparent layers and will automatically fill transparent areas with white.',
    },
    faqs: [
      {
        question: 'What happens to transparent pixels when converting WebP to JPG?',
        answer:
          'Because the JPG standard does not support alpha transparency, our converter automatically renders transparent pixels onto a pure white canvas background, ensuring a clean and professional appearance.',
      },
      {
        question: 'Is there a limit on how many WebP files I can convert?',
        answer:
          'There are no arbitrary daily quotas or limits. Because your computer handles the processing power locally in the browser, you can convert as many files as you need free of charge.',
      },
      {
        question: 'Does converting WebP to JPG reduce visual image quality?',
        answer:
          'JPG uses lossy compression, but with our quality slider set to 90% or above, visual difference is imperceptible to the human eye while preserving exact pixel dimensions.',
      },
    ],
    related: [
      { label: 'WebP to PNG', href: '/webp-to-png', emoji: '🏞️' },
      { label: 'HEIC to JPG', href: '/heic-to-jpg', emoji: '🖼️' },
      { label: 'AVIF to JPG', href: '/avif-to-jpg', emoji: '🎨' },
    ],
  },

  'webp-to-png': {
    title: 'WebP to PNG Converter',
    href: '/webp-to-png',
    icon: '🏞️',
    category: { name: 'Image Tools', href: '/image-tools' },
    howTo: {
      heading: 'How to Convert WebP to Transparent PNG Losslessly',
      intro:
        'WebP is used for web graphics and photography, while PNG is supported by many editors and presentation tools. Converting a WebP to PNG can help when an application does not accept WebP. The browser decodes and re-encodes the image locally; PNG encoding is lossless for the rendered pixels and can retain transparency, though color handling or metadata may differ from the original. The selected file is not sent to a FileVexa processing service.',
      steps: [
        {
          title: 'Upload WebP Image',
          description:
            'Drop your .webp file into the upload zone or choose a file from your file manager. Transparency channels are automatically detected.',
        },
        {
          title: 'Automatic Lossless Encoding',
          description:
            'The browser decodes the WebP image and encodes the rendered result as PNG. PNG encoding is lossless for the rendered pixels, but color handling or metadata may differ from the source.',
        },
        {
          title: 'Inspect & Verify',
          description:
            'Examine the preview thumbnail to verify that edges, color gradients, and transparent backgrounds have rendered properly.',
        },
        {
          title: 'Download Transparent PNG',
          description:
            'Click the Download PNG button to instantly save your converted image ready for any creative editing application.',
        },
      ],
      tips:
        'Pro Tip: PNG files are lossless and can be larger in byte size than compressed WebP images. If file size is your primary concern and you do not require transparency, WebP to JPG may produce a smaller file footprint.',
    },
    faqs: [
      {
        question: 'Will alpha transparency be retained in the converted PNG?',
        answer:
          'PNG supports transparency, and transparent areas can be retained when they are present in the decoded WebP. Review the output if transparency is important to your workflow.',
      },
      {
        question: 'Can I use this tool on mobile browsers like Safari or Chrome on iOS/Android?',
        answer:
          'Yes, our converter is fully responsive and functions seamlessly on mobile and desktop browsers alike with no software installation required.',
      },
      {
        question: 'Do you keep a copy of converted PNG files on your servers?',
        answer:
          'No. All image operations occur strictly in your browser’s temporary runtime memory. We do not operate storage servers for your uploads.',
      },
    ],
    related: [
      { label: 'WebP to JPG', href: '/webp-to-jpg', emoji: '🔄' },
      { label: 'HEIC to PNG', href: '/heic-to-png', emoji: '📸' },
      { label: 'AVIF to JPG', href: '/avif-to-jpg', emoji: '🎨' },
    ],
  },

  'heic-to-png': {
    title: 'HEIC to PNG Converter',
    href: '/heic-to-png',
    icon: '📸',
    category: { name: 'Image Tools', href: '/image-tools' },
    howTo: {
      heading: 'How to Convert Apple HEIC Photos to Lossless PNG Format',
      intro:
        'iPhones commonly save photos as HEIC/HEIF, which may not be accepted by some image editors or publishing workflows. Converting a selected photo to PNG can make it easier to import into software that supports PNG but not HEIC. FileVexa decodes and converts the image in your browser, without uploading it to a FileVexa processing service. PNG encoding does not add lossy compression to the decoded pixels, but cannot restore information already lost in the source and may not preserve every color characteristic or metadata field.',
      steps: [
        {
          title: 'Select HEIC File',
          description:
            'Browse your library or drag in .heic photos directly from your Apple or desktop device. Files up to 50MB are supported.',
        },
        {
          title: 'Local Client Decoding',
          description:
            'The browser decodes the selected HEIC/HEIF file locally. Supported files and available memory depend on your device and browser.',
        },
        {
          title: 'Lossless PNG Compilation',
          description:
            'The decoded image is encoded as PNG. Review the output if exact color appearance or metadata is important.',
        },
        {
          title: 'Export Converted File',
          description:
            'Download your pristine PNG file, ready for high-resolution printing, digital publishing, or professional raster editing.',
        },
      ],
      tips:
        'PNG uses lossless compression for the decoded pixels and is often larger than HEIC. If the goal is a broadly compatible photo, HEIC to JPG may be a more compact option, though JPG is lossy.',
    },
    faqs: [
      {
        question: 'Does this converter support high-resolution iPhone ProRAW or 48MP HEIC photos?',
        answer:
          'The converter accepts HEIC/HEIF files up to 50 MB. Whether a high-resolution image can be processed depends on browser support and available device memory; check the output dimensions and appearance.',
      },
      {
        question: 'Why choose PNG instead of JPG for converting HEIC?',
        answer:
          'PNG is useful when an application requires PNG or when transparency is needed. It avoids additional lossy encoding after decoding, but can create larger files and cannot reverse compression already present in the HEIC source.',
      },
      {
        question: 'Is my photo library protected from data scraping?',
        answer:
          'The tool only reads the HEIC/HEIF image you select and converts it locally in your browser. It does not access your photo library or upload that selected file to a FileVexa processing service.',
      },
    ],
    related: [
      { label: 'HEIC to JPG', href: '/heic-to-jpg', emoji: '🖼️' },
      { label: 'WebP to PNG', href: '/webp-to-png', emoji: '🏞️' },
      { label: 'AVIF to JPG', href: '/avif-to-jpg', emoji: '🎨' },
    ],
  },

  'avif-to-jpg': {
    title: 'AVIF to JPG Converter',
    href: '/avif-to-jpg',
    icon: '🎨',
    category: { name: 'Image Tools', href: '/image-tools' },
    howTo: {
      heading: 'How to Convert Next-Gen AVIF Images to Standard JPG',
      intro:
        'AVIF can produce compact images, but some older apps or workflows may not accept the format. Converting an AVIF copy to JPG can improve compatibility where JPG is supported. The browser must be able to decode AVIF, and JPG does not preserve transparency; inspect the result for color or detail changes. The selected image is processed in your browser rather than uploaded to a FileVexa image-processing service.',
      steps: [
        {
          title: 'Import AVIF Image',
          description:
            'Choose an .avif image from your device. Decoding depends on AVIF support in your browser.',
        },
        {
          title: 'Adjust Output Quality',
          description:
            'Choose your preferred JPG compression quality via the interactive slider, tailoring output to your specific needs.',
        },
        {
          title: 'Instant Canvas Transformation',
          description:
            'The browser decodes and renders the image, then encodes a JPEG copy. Processing time and output appearance depend on the browser and source image.',
        },
        {
          title: 'Save Your JPG',
          description:
            'Download the JPG copy and check that it opens correctly in the app or service where you plan to use it.',
        },
      ],
      tips:
        'Pro Tip: AVIF decoding relies on your browser’s hardware/software codec pipeline. Make sure you are using an up-to-date version of Chrome, Edge, Firefox, or Safari for peak decoding performance.',
    },
    faqs: [
      {
        question: 'Why does AVIF sometimes fail to open on Windows or Mac desktop viewers?',
        answer:
          'Many default operating system photo viewers do not yet ship with native AV1 codec plugins. Converting your AVIF files to JPG makes them accessible on any computer or operating system out of the box.',
      },
      {
        question: 'Are color profiles and HDR information preserved?',
        answer:
          'The converter exports a browser-encoded JPEG. Color profiles and HDR characteristics may not be retained exactly, so compare the result with the original if color accuracy matters.',
      },
      {
        question: 'How fast is the conversion process?',
        answer:
          'Conversion speed varies with image dimensions, browser support, and device performance. Larger images can take longer and use more memory because processing happens on your device.',
      },
    ],
    related: [
      { label: 'WebP to JPG', href: '/webp-to-jpg', emoji: '🔄' },
      { label: 'HEIC to JPG', href: '/heic-to-jpg', emoji: '🖼️' },
      { label: 'WebP to PNG', href: '/webp-to-png', emoji: '🏞️' },
    ],
  },

  'pdf-to-png': {
    title: 'PDF to PNG Converter',
    href: '/pdf-to-png',
    icon: '📄',
    category: { name: 'PDF Tools', href: '/pdf-tools' },
    howTo: {
      heading: 'How to Convert PDF Pages into High-Resolution PNG Images',
      intro:
        'PDF is the standard format for documents, contracts, and presentations, but sharing or embedding specific pages into websites, slide decks, or social media posts is often cumbersome. FileVexa’s PDF to PNG converter renders each page of your PDF document into an independent, crystal-clear PNG image file. Whether your PDF contains vector graphics, typography, or scanned forms, our client-side PDF rendering engine rasterizes every element with exceptional sharpness. You can choose to download individual pages or batch download the entire document packaged into a single ZIP archive.',
      steps: [
        {
          title: 'Upload PDF Document',
          description:
            'Drag your PDF document into the file uploader or choose it from your system storage. Files up to 100MB are supported.',
        },
        {
          title: 'Automatic Page Parsing',
          description:
            'Our embedded PDF.js engine reads the document hierarchy, identifies page count, and renders high-density preview thumbnails.',
        },
        {
          title: 'Inspect Rendered Pages',
          description:
            'Scroll through the generated list to view each page rendered at full resolution with clean anti-aliasing.',
        },
        {
          title: 'Download Single or All Pages',
          description:
            'Download specific page images individually or click Download All as ZIP to obtain the entire document packaged together.',
        },
      ],
      tips:
        'Pro Tip: When converting documents with fine typography or intricate charts, PNG rasterization ensures sharp text rendering without the muddy compression artifacts associated with standard JPEG conversions.',
    },
    faqs: [
      {
        question: 'Can I convert multi-page PDF documents?',
        answer:
          'Yes! Our tool supports multi-page PDFs. Each page is processed sequentially into its own high-resolution PNG image, and you can download them individually or as a single ZIP file.',
      },
      {
        question: 'Are my confidential PDF documents safe from exposure?',
        answer:
          'Absolutely. All PDF decoding and rasterization happens locally inside your browser session using WebAssembly and Canvas. No document pages or data are ever transmitted to external servers.',
      },
      {
        question: 'What resolution are the extracted PNG images?',
        answer:
          'Pages are rendered at high density (typically 1.5x to 2x viewport scale) to ensure typography and line art remain crisp even when viewed on high-DPI Retina screens.',
      },
    ],
    related: [
      { label: 'Extract PDF Pages', href: '/extract-pdf-pages', emoji: '✂️' },
      { label: 'Remove PDF Pages', href: '/remove-pdf-pages', emoji: '🗑️' },
      { label: 'PDF to Text', href: '/pdf-to-text', emoji: '📝' },
    ],
  },
  'png-to-pdf': {
    title: 'PNG to PDF Converter',
    metaTitle: 'PNG to PDF Converter - Free Online & Private | FileVexa',
    metaDescription: 'Convert one or multiple PNG images into a single PDF online for free. Choose page size and order; your files stay private in your browser.',
    keywords: 'PNG to PDF, convert PNG to PDF, PNG images to PDF, combine PNG into PDF, online PNG PDF converter, private PNG to PDF',
    href: '/png-to-pdf',
    icon: '📑',
    category: { name: 'PDF Tools', href: '/pdf-tools' },
    howTo: {
      heading: 'How to Convert PNG to PDF Online',
      intro:
        'Combine one PNG image or a collection of PNG files into a single PDF document with this free browser-based converter. Add images by selecting multiple files or dragging them onto the page, then arrange the page order, choose Fit to Image, A4, or Letter, and set the orientation. Fit to Image preserves each PNG’s original dimensions, while A4 and Letter place the image proportionally on a standard page. FileVexa uses pdf-lib to create the PDF entirely in your browser, so your images are not uploaded to a conversion server.',
      steps: [
        {
          title: 'Select or drop PNG images',
          description: 'Choose one or more .png files from your device, or drag and drop them into the upload area. The previews appear in the order they will become PDF pages.',
        },
        {
          title: 'Arrange pages and choose layout',
          description: 'Use the up and down controls to reorder images, remove any image you do not need, and select Fit to Image, A4, or Letter with Auto, Portrait, or Landscape orientation.',
        },
        {
          title: 'Create and download your PDF',
          description: 'Select Convert to PDF. The pages are assembled locally in your browser and the finished .pdf file downloads directly to your device.',
        },
      ],
      tips: 'Use Auto orientation to match each standard-size PDF page to its image. Fit to Image keeps the image proportions and creates a page sized to the PNG, while A4 and Letter scale images to fit without cropping.',
    },
    faqs: [
      {
        question: 'Are my PNG images uploaded when I convert them to PDF?',
        answer: 'No. Your PNG images are read and combined locally in your browser with pdf-lib. They are not uploaded to FileVexa or a conversion server.',
      },
      {
        question: 'Can I combine multiple PNG images into one PDF?',
        answer: 'Yes. Select multiple PNG files or add them in batches. Each image becomes one PDF page, in the order shown in the preview list.',
      },
      {
        question: 'Can I change the order of PNG pages before converting?',
        answer: 'Yes. Use the Move up and Move down controls on each image to arrange the PDF page order. You can also remove individual images before creating the PDF.',
      },
      {
        question: 'What do Fit to Image, A4, and Letter page sizes do?',
        answer: 'Fit to Image creates each PDF page at the image dimensions. A4 and Letter use standard paper dimensions and scale the image proportionally to fit inside the page without cropping it.',
      },
      {
        question: 'Does the converter support portrait and landscape PNG images?',
        answer: 'Yes. Choose Auto to match page orientation to each image, or select Portrait or Landscape for standard A4 or Letter pages. Fit to Image always preserves the image shape.',
      },
    ],
    related: [
      { label: 'PDF to PNG', href: '/pdf-to-png', emoji: '📄' },
      { label: 'Extract PDF Pages', href: '/extract-pdf-pages', emoji: '✂️' },
      { label: 'Remove PDF Pages', href: '/remove-pdf-pages', emoji: '🗑️' },
      { label: 'Merge PDF', href: '/merge-pdf', emoji: '📚' },
      { label: 'JPG to PDF', href: '/jpg-to-pdf', emoji: '🖼️' },
    ],
  },

  'merge-pdf': {
    title: 'Merge PDF Files',
    metaTitle: 'Merge PDF Files Online Free | FileVexa',
    metaDescription: 'Combine and reorder PDF files in your browser. Preview page counts and download one merged PDF without uploading documents.',
    keywords: 'merge PDF, combine PDF files, join PDF documents, merge PDF online free, reorder PDF files',
    href: '/merge-pdf',
    icon: '📚',
    category: { name: 'PDF Tools', href: '/pdf-tools' },
    quickAnswer: 'FileVexa merges multiple PDF documents into one file in your browser. Add PDFs up to 50 MB each and 100 MB total, review each file’s page count, reorder or remove documents, and download the result. Files are not uploaded for processing. Password-protected PDFs cannot be merged; very large documents may exceed available device memory.',
    howTo: {
      heading: 'How to Merge PDF Files Online',
      intro: 'Combine multiple PDF documents into one file with FileVexa’s browser-based merger. Add PDF files up to 50 MB each, with a combined input limit of 100 MB and a maximum of 20 files or 500 pages. Review page counts, arrange the documents, set an output filename, and merge locally. Password-protected PDFs are not supported.',
      steps: [
        { title: 'Add PDF files', description: 'Select or drag in multiple PDFs. The tool checks each document and shows its file size and page count.' },
        { title: 'Arrange the documents', description: 'Move files up or down to set the order, or remove any PDF you do not want included. Set an optional output filename.' },
        { title: 'Merge and download', description: 'Choose Merge PDF. FileVexa copies pages in the selected order in your browser and downloads one PDF.' },
      ],
      tips: 'Encrypted/password-protected files must be unlocked before merging. Keep the combined files and page count within the stated limits; large PDFs can use substantial browser memory.',
    },
    faqs: [
      { question: 'Are my PDF documents uploaded when I merge them?', answer: 'No. FileVexa reads and merges the selected PDFs locally in your browser using pdf-lib. The documents are not uploaded to a FileVexa processing server.' },
      { question: 'Can I change the order of PDFs before merging?', answer: 'Yes. Use Move up and Move down beside each PDF to arrange document order. Pages from each file are appended together in that order. You can also remove individual files.' },
      { question: 'Can I merge password-protected PDFs?', answer: 'No. Password-protected or encrypted PDFs cannot be opened by this merger. Unlock or export an unprotected copy using a trusted PDF application, then select that copy.' },
      { question: 'What are the PDF size and page limits?', answer: 'Each PDF can be up to 50 MB, with a combined input limit of 100 MB, 20 files, and 500 pages. Practical limits also depend on device memory and browser capacity.' },
      { question: 'Will merging PDFs change the original files?', answer: 'No. The merger creates a separate PDF download. Your source documents remain unchanged on your device.' },
    ],
    related: [
      { label: 'JPG to PDF', href: '/jpg-to-pdf', emoji: '🖼️' },
      { label: 'PNG to PDF', href: '/png-to-pdf', emoji: '📑' },
      { label: 'Remove PDF Pages', href: '/remove-pdf-pages', emoji: '🗑️' },
      { label: 'Extract PDF Pages', href: '/extract-pdf-pages', emoji: '✂️' },
      { label: 'PDF to PNG', href: '/pdf-to-png', emoji: '📄' },
    ],
  },

  'jpg-to-pdf': {
    title: 'JPG to PDF Converter',
    metaTitle: 'JPG to PDF Converter Online Free | FileVexa',
    metaDescription: 'Convert JPG, JPEG, and PNG images into a PDF in your browser. Reorder pages, choose paper size and margins, then download locally.',
    keywords: 'JPG to PDF, JPEG to PDF, convert image to PDF, JPG to PDF online, combine JPG images into PDF',
    href: '/jpg-to-pdf',
    icon: '🖼️',
    category: { name: 'PDF Tools', href: '/pdf-tools' },
    quickAnswer: 'FileVexa converts JPG, JPEG, and PNG images into a PDF directly in your browser. Add up to 50 images, arrange their page order, and choose Fit to Image, A4, or US Letter with orientation and margins. Each image becomes one page. Your files stay on your device, and the PDF downloads locally.',
    howTo: {
      heading: 'How to Convert JPG Images to PDF',
      intro: 'Create a PDF from one or more JPG, JPEG, or PNG images entirely in your browser. Add up to 50 images, arrange or remove pages, choose Fit to Image, A4, or US Letter paper, set orientation and margins, then create and download your PDF.',
      steps: [
        { title: 'Select or drop images', description: 'Choose .jpg, .jpeg, or .png files from your device. Each accepted image becomes one PDF page.' },
        { title: 'Arrange pages and set layout', description: 'Reorder or remove images, choose Fit to Image, A4, or US Letter, select Auto, Portrait, or Landscape orientation, and set page margins.' },
        { title: 'Create and download your PDF', description: 'Select Create PDF. FileVexa embeds the images and assembles the pages in your browser, then downloads the PDF.' },
      ],
      tips: 'Larger source images and many pages use more browser memory. Keep input files under the per-image and combined size limits, and check the PDF before sharing.',
    },
    faqs: [
      { question: 'Are my JPG or PNG images uploaded to create the PDF?', answer: 'No. FileVexa reads the selected images and assembles the PDF locally in your browser with pdf-lib. The images are not uploaded to a conversion server.' },
      { question: 'Can I combine multiple JPG images into one PDF?', answer: 'Yes. Select multiple JPG, JPEG, or PNG images, then create one PDF. Each image becomes a separate page in the order shown in the page list.' },
      { question: 'What do Fit to Image, A4, and US Letter mean?', answer: 'Fit to Image sizes each page to its image plus the selected margins. A4 and US Letter use standard paper dimensions and scale the image proportionally to fit within the chosen margins.' },
      { question: 'Can I change image order and page orientation?', answer: 'Yes. Move images up or down to change page order. Choose Auto to match each page to its image, or select Portrait or Landscape.' },
      { question: 'How do margins work in the PDF?', answer: 'Set a uniform margin from 0 to 30 mm. Standard paper pages place the image inside that margin; Fit to Image adds the margin around the image.' },
    ],
    related: [
      { label: 'Merge PDF', href: '/merge-pdf', emoji: '📚' },
      { label: 'PNG to PDF', href: '/png-to-pdf', emoji: '📑' },
      { label: 'PDF to PNG', href: '/pdf-to-png', emoji: '📄' },
      { label: 'Remove PDF Pages', href: '/remove-pdf-pages', emoji: '🗑️' },
      { label: 'Extract PDF Pages', href: '/extract-pdf-pages', emoji: '✂️' },
    ],
  },

  'remove-pdf-pages': {
    title: 'Remove PDF Pages',
    href: '/remove-pdf-pages',
    icon: '🗑️',
    category: { name: 'PDF Tools', href: '/pdf-tools' },
    howTo: {
      heading: 'How to Delete Unwanted Pages from PDF Files Securely',
      intro:
        'Many PDF documents contain blank sheets, redundant cover pages, or outdated appendixes that you may want to remove before sharing. FileVexa Remove PDF Pages lets you select pages and build a new PDF in your browser. The document is not uploaded to a FileVexa PDF-processing service. This does not replace careful review of the document or the site’s Privacy Policy.',
      steps: [
        {
          title: 'Load PDF File',
          description:
            'Drop your PDF into the upload area. The tool will parse the document structure and generate interactive visual thumbnails of each page.',
        },
        {
          title: 'Select Pages to Remove',
          description:
            'Click on the thumbnails of any pages you want to delete. Selected pages are clearly highlighted with a red removal indicator.',
        },
        {
          title: 'Rebuild Clean PDF',
          description:
            'Click the Remove Selected Pages button. The client engine strips out the targeted pages and reconstitutes the remaining document hierarchy.',
        },
        {
          title: 'Download Modified Document',
          description:
            'Click Download Clean PDF to save a new document containing the pages you kept. Review the output if it contains forms, links, or bookmarks you need.',
        },
      ],
      tips:
        'Pro Tip: Your original PDF file is never altered or overwritten on your disk. The tool outputs a brand-new, clean copy with only the pages you choose to keep.',
    },
    faqs: [
      {
        question: 'Does deleting pages harm the text formatting or quality of remaining pages?',
        answer:
          'The selected pages are copied into a new PDF rather than converted to images. Review the downloaded file if it contains forms, links, bookmarks, or other document features that matter to you.',
      },
      {
        question: 'Can I remove multiple non-consecutive pages at once?',
        answer:
          'Yes! You can click any combination of pages throughout the document (e.g., pages 1, 4, 7, and 12), and all selected pages will be removed simultaneously in one operation.',
      },
      {
        question: 'Are there file size or page count limitations?',
        answer:
          'The tool accepts PDF files up to 100 MB. Practical page capacity depends on the document and available browser memory; very large documents may be slow or fail.',
      },
    ],
    related: [
      { label: 'Extract PDF Pages', href: '/extract-pdf-pages', emoji: '✂️' },
      { label: 'PDF to PNG', href: '/pdf-to-png', emoji: '📄' },
      { label: 'PDF to Markdown', href: '/pdf-to-markdown', emoji: '⬇️' },
      { label: 'Merge PDF', href: '/merge-pdf', emoji: '📚' },
      { label: 'JPG to PDF', href: '/jpg-to-pdf', emoji: '🖼️' },
    ],
  },

  'extract-pdf-pages': {
    title: 'Extract PDF Pages',
    href: '/extract-pdf-pages',
    icon: '✂️',
    category: { name: 'PDF Tools', href: '/pdf-tools' },
    howTo: {
      heading: 'How to Extract Specific Pages from a PDF into a New File',
      intro:
        'Often you receive a voluminous 50-page PDF report or textbook, but you only need to forward 2 specific pages to a client, colleague, or tax advisor. FileVexa Extract PDF Pages enables you to isolate and pull out precisely the pages you need and save them as an independent, lightweight PDF file. All page selection, parsing, and reassembly happens entirely on your client machine using modern browser capabilities, preventing sensitive documents from touching any external network infrastructure.',
      steps: [
        {
          title: 'Select Source PDF',
          description:
            'Upload or drag your source PDF document into the browser viewport. Thumbnails for all pages will render automatically.',
        },
        {
          title: 'Pick Target Pages',
          description:
            'Click the visual thumbnails of the specific pages you wish to keep in your new document. Selected pages will be marked with a green checkmark.',
        },
        {
          title: 'Compile Extracted PDF',
          description:
            'Click the Extract Pages button. Our browser library compiles only the selected pages into a fresh, standalone PDF structure.',
        },
        {
          title: 'Download New PDF',
          description:
            'Save your extracted document instantly with a clean filename, ready for distribution or archiving.',
        },
      ],
      tips:
        'Pro Tip: Extracting only the essential pages is a fantastic way to dramatically shrink PDF file sizes before emailing attachments to clients with strict inbox size limits.',
    },
    faqs: [
      {
        question: 'What is the difference between Extract PDF Pages and Remove PDF Pages?',
        answer:
          'Extract PDF Pages lets you select the specific pages you want to keep and saves them as a new file. Remove PDF Pages lets you select unwanted pages to delete from the original document.',
      },
      {
        question: 'Are links, forms, and bookmarks preserved in extracted pages?',
        answer:
          'The tool extracts selected pages into a new PDF. Preservation of interactive elements such as form fields, links, or bookmarks is not guaranteed; inspect the result before relying on them.',
      },
      {
        question: 'Can I extract pages on a mobile smartphone?',
        answer:
          'Yes! The responsive layout allows you to easily tap pages on a mobile or tablet touch screen and download the extracted PDF directly to your device storage.',
      },
    ],
    related: [
      { label: 'Remove PDF Pages', href: '/remove-pdf-pages', emoji: '🗑️' },
      { label: 'PDF to Text', href: '/pdf-to-text', emoji: '📝' },
      { label: 'PDF to PNG', href: '/pdf-to-png', emoji: '📄' },
      { label: 'Merge PDF', href: '/merge-pdf', emoji: '📚' },
      { label: 'JPG to PDF', href: '/jpg-to-pdf', emoji: '🖼️' },
    ],
  },

  'pdf-to-text': {
    title: 'PDF to Text Converter',
    metaTitle: 'PDF to Text Converter Online Free (No Email) | FileVexa',
    metaDescription: 'Convert PDF to text free online without email. Extract selectable text instantly in your browser—no sign-up or server upload. Copy or download as .txt.',
    href: '/pdf-to-text',
    icon: '📝',
    category: { name: 'PDF Tools', href: '/pdf-tools' },
    keywords: 'convert PDF to text free online without email, PDF text extraction in browser, extract formatted text from PDF, local PDF text converter',
    targetKeywords: {
      primary: 'convert PDF to text free online without email',
      longTail: [
        'extract PDF text in browser',
        'formatted text extraction from PDF online',
        'PDF to text converter no upload',
      ],
    },
    quickAnswer:
      'Convert PDF to text free online without email using FileVexa. Select a PDF with selectable text to extract it instantly in your browser, then copy or download the plain-text result. No sign-up or server upload is needed; scanned PDFs require OCR.',
    howTo: {
      heading: 'How to Extract Plain Text from PDF Files Online',
      intro:
        'Copying text manually from PDF files frequently introduces broken line breaks, irregular spacing, and frustrating formatting glitches. FileVexa PDF to Text converter extracts the underlying text streams from your document and normalizes them into clean, editable plain text. Ideal for researchers, students, developers, and writers, our tool strips away complex visual layouts and provides clean, copyable text you can paste into Word, code editors, or AI prompts. Best of all, text extraction happens locally in your browser session for maximum speed and data confidentiality.',
      steps: [
        {
          title: 'Select PDF File',
          description:
            'Drop your PDF into the tool. The document text layer is read directly into memory via PDF.js.',
        },
        {
          title: 'Automatic Text Extraction',
          description:
            'The tool loops through every page, aggregating paragraphs, headers, and text blocks in sequential reading order.',
        },
        {
          title: 'Review Extracted Content',
          description:
            'Inspect the extracted text in the real-time preview editor with live character and word count statistics.',
        },
        {
          title: 'Copy or Download',
          description:
            'Click Copy to Clipboard to paste directly into your notes, or click Download .txt to save the text file to your computer.',
        },
      ],
      tips:
        'Pro Tip: This tool extracts embedded digital text. If your PDF is an image scan created by a physical scanner without an OCR text layer, the text stream may be blank. For scanned documents, an OCR tool is required.',
    },
    faqs: [
      {
        question: 'Why does my extracted text file appear empty?',
        answer:
          'This occurs when a PDF contains purely scanned raster images rather than selectable text. Our tool extracts digital font streams embedded in the document. Scanned paper documents require Optical Character Recognition (OCR).',
      },
      {
        question: 'Is there a limit on how long the document can be?',
        answer:
          'The tool can extract text from documents with dozens or hundreds of pages. Large documents may take a few seconds to extract, depending on your device’s processing speed.',
      },
      {
        question: 'Can I extract formatted PDF text in my browser?',
        answer:
          'Yes. Selectable text is extracted locally in your browser, but the .txt output does not preserve styling such as bold or italics. For structured headings and lists, use our PDF to Markdown tool.',
      },
    ],
    related: [
      { label: 'PDF to Markdown', href: '/pdf-to-markdown', emoji: '⬇️' },
      { label: 'Word Counter', href: '/word-counter', emoji: '🔤' },
      { label: 'PDF to PNG', href: '/pdf-to-png', emoji: '📄' },
    ],
  },

  'pdf-to-markdown': {
    title: 'PDF to Markdown Converter',
    href: '/pdf-to-markdown',
    icon: '⬇️',
    category: { name: 'PDF Tools', href: '/pdf-tools' },
    howTo: {
      heading: 'How to Convert PDF Documents to Clean Markdown (.md)',
      intro:
        'Markdown has become the preferred documentation format for developers, technical writers, knowledge bases like Notion and Obsidian, and modern Large Language Model (LLM) prompts. Converting complex PDF reports into Markdown manually is an arduous process. FileVexa PDF to Markdown converter analyzes font weights, sizes, and vertical layout geometry to intelligently predict headings (#, ##, ###), bullet lists, and paragraph breaks. The result is structured Markdown text ready for Git repositories, static site generators, or documentation portals, generated 100% locally on your machine.',
      steps: [
        {
          title: 'Upload PDF Document',
          description:
            'Drag your text-based PDF file into the drop area. Processing initiates immediately in your local browser.',
        },
        {
          title: 'Structural Analysis',
          description:
            'Our algorithm classifies text items by relative font scale and line spacing, mapping them into standard Markdown syntax.',
        },
        {
          title: 'Preview Markdown',
          description:
            'Review the formatted Markdown in the interactive editor window, checking heading hierarchy and paragraph separation.',
        },
        {
          title: 'Export Markdown File',
          description:
            'Copy the raw Markdown directly to your clipboard or download the output as a formatted .md text file.',
        },
      ],
      tips:
        'Pro Tip: Markdown generated from PDFs is ideal for feeding documentation into ChatGPT, Claude, or other LLMs, as Markdown syntax provides clear semantic context without the bloat of raw PDF binaries.',
    },
    faqs: [
      {
        question: 'How does the converter identify headers versus regular text?',
        answer:
          'The parser inspects the font size and weight of each text fragment relative to the document’s base body font size. Larger and bolder text fragments are automatically formatted with Markdown heading hashes (#, ##, ###).',
      },
      {
        question: 'Are images and tables converted to Markdown?',
        answer:
          'Text and basic tables are extracted into readable plain text structure. Raster images embedded within the PDF are skipped, keeping your Markdown file lightweight and focused on textual content.',
      },
      {
        question: 'Can I import the generated .md file directly into Obsidian or Notion?',
        answer:
          'The output uses common Markdown conventions and can be copied into Markdown editors such as Obsidian or GitHub. Formatting may need review, especially for tables, columns, and complex layouts.',
      },
    ],
    related: [
      { label: 'PDF to Text', href: '/pdf-to-text', emoji: '📝' },
      { label: 'Text Case Converter', href: '/text-case-converter', emoji: '🔠' },
      { label: 'Word Counter', href: '/word-counter', emoji: '🔤' },
    ],
  },

  'qr-code-generator': {
    title: 'QR Code Generator',
    href: '/qr-code-generator',
    icon: '📱',
    category: { name: 'Daily Utilities', href: '/daily-utilities' },
    howTo: {
      heading: 'How to Generate a QR Code from Text or a URL',
      intro:
        'A QR code can put a URL or short piece of text within easy reach on a flyer, menu, label, or screen. FileVexa encodes the text you enter directly into a downloadable PNG; it does not create a redirect link or track scans through the code. A code has no built-in expiry, but a URL can stop working if its destination changes or goes offline. Preview the code and scan it with a phone before printing.',
      steps: [
        {
          title: 'Input Your Content',
          description:
            'Type or paste your destination URL, plain text message, phone number, contact details, or Wi-Fi information into the input field.',
        },
        {
          title: 'Instant Real-Time Rendering',
          description:
            'As you type each character, the vector SVG QR code updates synchronously with optimal Reed-Solomon error correction.',
        },
        {
          title: 'Test with Mobile Scanner',
          description:
            'Point your smartphone camera at the on-screen preview to verify that the scanner resolves your target URL accurately.',
        },
        {
          title: 'Download High-Res PNG',
          description:
            'Click the Download PNG button to save a high-resolution raster image suitable for both digital screens and physical print materials.',
        },
      ],
      tips:
        'Pro Tip: Keep URLs relatively concise (or use short links) to ensure the QR code matrix remains clean and spacious. Less dense QR codes scan faster and more reliably in dim lighting or from greater distances.',
    },
    faqs: [
      {
        question: 'Do these QR codes expire or have a scan limit?',
        answer:
          'The generated code embeds your text or URL directly and does not add a FileVexa redirect or scan counter. The code itself has no expiry, but a website or other destination encoded in it can change or become unavailable.',
      },
      {
        question: 'How can I check that a printed QR code will scan?',
        answer:
          'Download the PNG and scan it with a phone camera at the size and distance you expect people to use. Keep the code clear against its background and test the final printed copy before distributing it.',
      },
      {
        question: 'Is my data or destination link logged on your servers?',
        answer:
          'The text you enter is used by the browser to render the code; it is not sent to a FileVexa QR-processing server. Website analytics requests are separate from the QR contents and are described in the Privacy Policy.',
      },
    ],
    related: [
      { label: 'Password Generator', href: '/password-generator', emoji: '🔐' },
      { label: 'Word Counter', href: '/word-counter', emoji: '🔤' },
      { label: 'Text Case Converter', href: '/text-case-converter', emoji: '🔠' },
    ],
  },

  'word-counter': {
    title: 'Word & Character Counter',
    href: '/word-counter',
    icon: '🔤',
    category: { name: 'Daily Utilities', href: '/daily-utilities' },
    howTo: {
      heading: 'How to Count Words, Characters, and Paragraphs in Real Time',
      intro:
        'Word, character, and paragraph limits matter in forms, captions, essays, and drafts. Paste or type text into the editor to see live totals for whitespace-separated words, all characters, non-whitespace characters, and paragraphs separated by line breaks. The text is counted in the page and is not sent to a FileVexa text-processing server. The word count is a simple whitespace-based measure, not a language-specific grammar analysis.',
      steps: [
        {
          title: 'Enter or Paste Text',
          description:
            'Paste your article, essay, or tweet draft into the central text area, or start typing directly in the editor.',
        },
        {
          title: 'Read Live Metrics',
          description:
            'Watch the live counter cards update instantaneously for word count, character totals, space-excluded counts, and paragraph counts.',
        },
        {
          title: 'Review the live counts',
          description:
            'Use the word, character, and paragraph totals to compare your draft with the requirements of the form or platform where you plan to use it.',
        },
        {
          title: 'Edit to meet a limit',
          description:
            'Revise the text in the editor and watch the counts update. Check the destination’s current length rules before publishing.',
        },
      ],
      tips:
        'Pro Tip: Google meta descriptions should ideally stay between 140–160 characters, while titles should target under 60 characters. Use the characters (no spaces) counter to verify strict publisher guidelines.',
    },
    faqs: [
      {
        question: 'Is my text private and secure while using this counter?',
        answer:
          'The counter processes the text in the page and does not send it to a FileVexa text-processing server. For website analytics and other site requests, see the Privacy Policy.',
      },
      {
        question: 'How are hyphenated words and special characters counted?',
        answer:
          'Standard words are delimited by whitespace characters. Punctuation attached to words is counted toward total character length, while whitespace-separated tokens increment the word count.',
      },
      {
        question: 'Is there a word or character limit in the text box?',
        answer:
          'The page does not specify a fixed character limit. Very large text can affect responsiveness depending on your device and browser.',
      },
    ],
    related: [
      { label: 'Text Case Converter', href: '/text-case-converter', emoji: '🔠' },
      { label: 'Lorem Ipsum Generator', href: '/lorem-ipsum-generator', emoji: '📜' },
      { label: 'QR Code Generator', href: '/qr-code-generator', emoji: '📱' },
    ],
  },

  'password-generator': {
    title: 'Secure Password Generator',
    href: '/password-generator',
    icon: '🔐',
    category: { name: 'Daily Utilities', href: '/daily-utilities' },
    howTo: {
      heading: 'How to Generate Cryptographically Secure Passwords Locally',
      intro:
        'Weak or reused passwords represent the single greatest vulnerability in personal and corporate cybersecurity. To protect your email, banking, social media, and developer accounts against brute-force attacks and credential stuffing, you must use unique, high-entropy passwords. FileVexa Secure Password Generator utilizes the browser’s native Web Crypto API (crypto.getRandomValues) to produce cryptographically strong pseudo-random strings. Unlike cloud-based password generators that might log generated keys, FileVexa runs entirely in client-side memory, ensuring your passwords are never seen by anyone else.',
      steps: [
        {
          title: 'Choose Desired Length',
          description:
            'Select your password length using the slider. Cybersecurity authorities recommend a minimum of 16 characters for robust protection.',
        },
        {
          title: 'Configure Character Sets',
          description:
            'Toggle uppercase letters, lowercase letters, numbers, and special symbols based on your target service’s password requirements.',
        },
        {
          title: 'Generate with Web Crypto',
          description:
            'Click Generate Password to immediately produce a high-entropy string using hardware-grade randomness.',
        },
        {
          title: 'One-Click Copy',
          description:
            'Click Copy to Clipboard to securely transfer the password to your password manager or account setup form.',
        },
      ],
      tips:
        'Pro Tip: Always store newly generated passwords directly into a trusted, encrypted password manager (like Bitwarden, 1Password, or Apple Keychain) and enable multi-factor authentication (2FA) wherever possible.',
    },
    faqs: [
      {
        question: 'How do I know this password generator is truly secure?',
        answer:
          'We use the browser’s built-in window.crypto.getRandomValues() method, which draws entropy directly from the underlying operating system’s cryptographic random pool. It is not predictable by mathematical PRNG algorithms.',
      },
      {
        question: 'Are generated passwords ever transmitted over the internet?',
        answer:
          'The password is generated in your browser and is not sent to a FileVexa password-processing service. Do not copy or share passwords on a device you do not trust; website requests and analytics are described in the Privacy Policy.',
      },
      {
        question: 'What password length is considered safe against modern GPU cracking?',
        answer:
          'A randomly generated 16-character password using all selected character groups can have substantial entropy. Actual strength depends on the selected groups and how the password is stored; use a unique password and keep it in a trusted password manager.',
      },
    ],
    related: [
      { label: 'QR Code Generator', href: '/qr-code-generator', emoji: '📱' },
      { label: 'Word Counter', href: '/word-counter', emoji: '🔤' },
      { label: 'Text Case Converter', href: '/text-case-converter', emoji: '🔠' },
    ],
  },

  'text-case-converter': {
    title: 'Text Case Converter',
    href: '/text-case-converter',
    icon: '🔠',
    category: { name: 'Text Tools', href: '/text-tools' },
    howTo: {
      heading: 'How to Convert Text Case Styles Instantly Online',
      intro:
        'Accidentally leaving Caps Lock on, formatting article headlines, preparing database variables, or standardizing code identifiers often requires converting text case styles. FileVexa Text Case Converter provides instantaneous conversions between UPPERCASE, lowercase, Title Case, Sentence case, camelCase, and slug format. Simply paste your text into the editor and click your desired formatting button. Changes are applied instantly in your browser without page reloads or data transmissions.',
      steps: [
        {
          title: 'Paste Your Text',
          description:
            'Paste your text into the input box or write your draft directly in the browser editor.',
        },
        {
          title: 'Select Case Transformation',
          description:
            'Choose between UPPERCASE, lowercase, Title Case, or Sentence case with a single click.',
        },
        {
          title: 'Inspect Formatted Result',
          description:
            'Review the transformed output to ensure capitalizing rules and special characters conform to your style guide.',
        },
        {
          title: 'Copy Transformed Text',
          description:
            'Click Copy to Clipboard to quickly copy the formatted text for immediate use in your documents or IDE.',
        },
      ],
      tips:
        'Pro Tip: Title Case capitalizes the principal words in titles while keeping standard conjunctions and articles clean. Use Sentence case to quickly repair paragraphs accidentally typed with Caps Lock enabled.',
    },
    faqs: [
      {
        question: 'What is the difference between Title Case and Sentence case?',
        answer:
          'Title Case capitalizes the first character after each space, while Sentence case capitalizes the first character at the start of the text and after sentence punctuation. These simple transformations do not identify proper nouns or title-style minor words, so review the result.',
      },
      {
        question: 'Does this tool work with non-English alphabets and accents?',
        answer:
          'The tool uses the browser’s built-in JavaScript case conversion. Results depend on the language and characters; review accents, names, and scripts that have language-specific casing rules.',
      },
      {
        question: 'Is my text transmitted or saved anywhere?',
        answer:
          'The converter changes the text in your browser and does not send it to a FileVexa text-processing service. Website requests and analytics are described in the Privacy Policy.',
      },
    ],
    related: [
      { label: 'Word Counter', href: '/word-counter', emoji: '🔤' },
      { label: 'Lorem Ipsum Generator', href: '/lorem-ipsum-generator', emoji: '📜' },
      { label: 'PDF to Markdown', href: '/pdf-to-markdown', emoji: '⬇️' },
    ],
  },

  'lorem-ipsum-generator': {
    title: 'Lorem Ipsum Generator',
    href: '/lorem-ipsum-generator',
    icon: '📜',
    category: { name: 'Text Tools', href: '/text-tools' },
    howTo: {
      heading: 'How to Generate Custom Dummy Placeholder Text for Designs',
      intro:
        'When designing web layouts, landing pages, mobile apps, or typographic mockups, real copy is often unavailable. Using placeholder dummy text allows designers and clients to evaluate visual hierarchy, typography, font pairing, and spatial balance without being distracted by readable content. FileVexa Lorem Ipsum Generator produces classic Latin dummy text derived from Cicero’s philosophical treatise "De Finibus Bonorum et Malorum". Customize your paragraph count and words per block to instantly generate realistic placeholder text.',
      steps: [
        {
          title: 'Select Paragraph Count',
          description:
            'Choose how many paragraphs of dummy text your design layout requires using the number selector.',
        },
        {
          title: 'Adjust Words per Paragraph',
          description:
            'Tune paragraph density by adjusting words per paragraph to match short blurbs or dense editorial blocks.',
        },
        {
          title: 'Generate Custom Blocks',
          description:
            'Click Generate to assemble placeholder paragraphs from a fixed list of Latin words. The output is dummy text, not natural-language copy.',
        },
        {
          title: 'Copy to Clipboard',
          description:
            'Click Copy to Clipboard and paste the dummy text directly into Figma, Sketch, Adobe XD, or HTML templates.',
        },
      ],
      tips:
        'Pro Tip: Start with the classic "Lorem ipsum dolor sit amet" for traditional editorial mockups, or vary word lengths to simulate modern user interface cards and testimonial widgets.',
    },
    faqs: [
      {
        question: 'What is the origin of Lorem Ipsum text?',
        answer:
          'Lorem Ipsum has been the printing and typesetting industry’s standard dummy text since the 1500s. It originated from sections 1.10.32 and 1.10.33 of Cicero’s 45 BC philosophical work on ethics.',
      },
      {
        question: 'Why not just repeat English words for mockups?',
        answer:
          'Readable English text distracts reviewers by prompting them to read the copy rather than evaluate visual layout, typography, and UX structure. Dummy text maintains focus on design aesthetics.',
      },
      {
        question: 'Is the generated text royalty-free?',
        answer:
          'Lorem Ipsum is placeholder text commonly used in design mockups. Check the rights and terms for any particular text or asset you use in a commercial project.',
      },
    ],
    related: [
      { label: 'Word Counter', href: '/word-counter', emoji: '🔤' },
      { label: 'Text Case Converter', href: '/text-case-converter', emoji: '🔠' },
      { label: 'QR Code Generator', href: '/qr-code-generator', emoji: '📱' },
    ],
  },

  'age-calculator': {
    title: 'Age Calculator',
    href: '/age-calculator',
    icon: '🎂',
    category: { name: 'Calculators', href: '/calculators' },
    howTo: {
      heading: 'How to Calculate Your Exact Chronological Age in Years, Months & Days',
      intro:
        'Calculating exact chronological age is necessary for official job applications, insurance policies, school admissions, sports leagues, and retirement planning. Because calendar months vary in length between 28 and 31 days and leap years introduce extra calendar days, mental calculations frequently miscalculate by several days. FileVexa Age Calculator accurately reconciles calendar month day counts and leap year intervals to give you an exact breakdown of your age in years, months, and days, along with a countdown to your next birthday.',
      steps: [
        {
          title: 'Select Date of Birth',
          description:
            'Choose your birth year, month, and day using the date picker.',
        },
        {
          title: 'Select Target Date',
          description:
            'Leave target date as today for your current age, or select a future/past date to determine age at a specific milestone.',
        },
        {
          title: 'Calculate Exact Breakdown',
          description:
            'Our calculation engine accounts for variable month durations and leap years to compute the exact span.',
        },
        {
          title: 'View Detailed Summary',
          description:
            'Review your age expressed in complete years, months, days, and total days lived.',
        },
      ],
      tips:
        'Pro Tip: You can set the target date to any date in the future to find out exactly how old you will be on a retirement date, college graduation, or anniversary.',
    },
    faqs: [
      {
        question: 'How does the calculator handle leap years?',
        answer:
          'The algorithm uses native JavaScript Date objects to calculate leap years (such as February 29th) accurately across any historical or future calendar year.',
      },
      {
        question: 'Can I find out what day of the week I was born on?',
        answer:
          'Yes, by selecting your date of birth, the tool verifies the day of the week and computes the precise number of elapsed days since your birth.',
      },
      {
        question: 'Is my birthdate recorded or stored anywhere?',
        answer:
          'Never. All calculations occur strictly on your device using client-side JavaScript. We do not store or track any personal dates.',
      },
    ],
    related: [
      { label: 'Percentage Calculator', href: '/percentage-calculator', emoji: '➗' },
      { label: 'Word Counter', href: '/word-counter', emoji: '🔤' },
      { label: 'Password Generator', href: '/password-generator', emoji: '🔐' },
    ],
  },

  'percentage-calculator': {
    title: 'Percentage & Discount Calculator',
    href: '/percentage-calculator',
    icon: '➗',
    category: { name: 'Calculators', href: '/calculators' },
    howTo: {
      heading: 'How to Calculate Percentages, Discounts, and Growth Rates',
      intro:
        'Percentage calculations are part of everyday financial decisions, from shopping sale discounts and tipping restaurant bills to analyzing business revenue growth and investment yields. Mental math errors can lead to costly budget oversights. FileVexa Percentage & Discount Calculator provides dedicated calculation modes for finding percentage values (What is X% of Y?), determining proportions (X is what % of Y?), and computing percentage increase or decrease between two values. Results update automatically with clean numeric precision.',
      steps: [
        {
          title: 'Choose Calculation Mode',
          description:
            'Select whether you want to calculate a direct percentage, find relative percentage proportion, or measure percentage increase/decrease.',
        },
        {
          title: 'Enter Known Numbers',
          description:
            'Input your base values into the respective input fields (e.g. original price, discount percentage, or before/after values).',
        },
        {
          title: 'View Instant Result',
          description:
            'The calculated answer displays immediately below the input fields without requiring page submissions or recalculation buttons.',
        },
        {
          title: 'Apply to Finances or Homework',
          description:
            'Use the verified numbers for shopping savings, markups, tax additions, or scientific data comparisons.',
        },
      ],
      tips:
        'Pro Tip: To quickly calculate a sales discount, enter the original price as Y and the discount percent as X. Subtract the result from Y to know the exact final checkout price before sales tax.',
    },
    faqs: [
      {
        question: 'How do I calculate percentage increase or decrease?',
        answer:
          'Subtract the old value from the new value, divide the difference by the absolute value of the old value, and multiply by 100: ((New - Old) / |Old|) * 100.',
      },
      {
        question: 'Can I use this calculator for sales tax and restaurant tipping?',
        answer:
          'Yes! Use Mode 1: enter your tax/tip rate (e.g. 15% or 20%) as X and your total bill amount as Y to calculate the exact tip or tax amount.',
      },
      {
        question: 'Does the calculator round decimals automatically?',
        answer:
          'The calculator outputs precise numbers formatted to two decimal places for currency applications, while retaining full numeric precision.',
      },
    ],
    related: [
      { label: 'Age Calculator', href: '/age-calculator', emoji: '🎂' },
      { label: 'Word Counter', href: '/word-counter', emoji: '🔤' },
      { label: 'QR Code Generator', href: '/qr-code-generator', emoji: '📱' },
    ],
  },
};
