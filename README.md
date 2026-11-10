# FileVexa - Browser-Based Utility & Web Tools Suite

🚀 **Live Platform:** [https://filevexa.pages.dev](https://filevexa.pages.dev)

FileVexa is a privacy-focused collection of free image, PDF, text, and everyday utility tools built with React and Vite. Supported file processing happens locally in your browser; files are not uploaded to a processing server. The site uses static site generation (SSG) to publish crawlable pages with page metadata and structured data.

## Complete Tools Directory

### 📷 Image & Graphics Tools

| Tool | Live URL | Key intent keywords |
|---|---|---|
| **Compress Image to KB** — JPEG, PNG, WebP, or HEIC to a 20 KB, 50 KB, 100 KB, 200 KB, 500 KB, or custom target; exports JPEG. | [compress-image-to-kb](https://filevexa.pages.dev/compress-image-to-kb) | compress image to 20KB, compress image to 50KB, image KB reducer, custom image size |
| **HEIC to JPG Converter** | [heic-to-jpg](https://filevexa.pages.dev/heic-to-jpg) | convert HEIC to JPG, HEIF image converter |
| **HEIC to PNG Converter** | [heic-to-png](https://filevexa.pages.dev/heic-to-png) | convert HEIC to PNG, HEIF to PNG |
| **WebP to JPG Converter** | [webp-to-jpg](https://filevexa.pages.dev/webp-to-jpg) | convert WebP to JPG, WebP image converter |
| **WebP to PNG Converter** | [webp-to-png](https://filevexa.pages.dev/webp-to-png) | convert WebP to PNG, preserve WebP transparency |
| **AVIF to JPG Converter** | [avif-to-jpg](https://filevexa.pages.dev/avif-to-jpg) | convert AVIF to JPG, AVIF image converter |
| **PNG to JPG Converter** | [convert-png-to-jpg](https://filevexa.pages.dev/convert-png-to-jpg) | convert PNG to JPG, PNG image converter |
| **PNG to WebP Converter** | [convert-png-to-webp](https://filevexa.pages.dev/convert-png-to-webp) | convert PNG to WebP, optimize PNG for web |

### 📄 PDF Tools

| Tool | Live URL | Key intent keywords |
|---|---|---|
| **PDF to PNG Converter** | [pdf-to-png](https://filevexa.pages.dev/pdf-to-png) | convert PDF pages to PNG, PDF page images |
| **Remove PDF Pages** | [remove-pdf-pages](https://filevexa.pages.dev/remove-pdf-pages) | delete pages from PDF, remove PDF pages online |
| **Extract PDF Pages** | [extract-pdf-pages](https://filevexa.pages.dev/extract-pdf-pages) | extract PDF pages, split selected pages from PDF |
| **PDF to Text Extractor** | [pdf-to-text](https://filevexa.pages.dev/pdf-to-text) | extract text from PDF, PDF text extractor |
| **PDF to Markdown Converter** | [pdf-to-markdown](https://filevexa.pages.dev/pdf-to-markdown) | convert PDF to Markdown, PDF text to MD |
| **PDF Size Guide (200 KB)** — informational guide; FileVexa does not currently provide a PDF compression tool. | [compress-pdf-to-200kb](https://filevexa.pages.dev/compress-pdf-to-200kb) | reduce PDF size, PDF 200KB guide |

### 🧮 Calculators & Daily Utilities

| Tool | Live URL | Key intent keywords |
|---|---|---|
| **Percentage Calculator** | [percentage-calculator](https://filevexa.pages.dev/percentage-calculator) | percentage calculator, discount and percentage change |
| **Age Calculator** | [age-calculator](https://filevexa.pages.dev/age-calculator) | calculate age, age in years months and days |
| **QR Code Generator** | [qr-code-generator](https://filevexa.pages.dev/qr-code-generator) | free QR code generator, create QR code online |
| **Password Generator** | [password-generator](https://filevexa.pages.dev/password-generator) | secure password generator, random password generator |
| **Word Counter** | [word-counter](https://filevexa.pages.dev/word-counter) | word and character counter, count words online |

### 📝 Text & Developer Tools

| Tool | Live URL | Key intent keywords |
|---|---|---|
| **Text Case Converter** | [text-case-converter](https://filevexa.pages.dev/text-case-converter) | uppercase converter, lowercase and title case |
| **Lorem Ipsum Generator** | [lorem-ipsum-generator](https://filevexa.pages.dev/lorem-ipsum-generator) | Lorem Ipsum generator, placeholder text generator |

### 📚 Directories & Indexes

- [Image Tools Directory](https://filevexa.pages.dev/image-tools)
- [PDF Tools Directory](https://filevexa.pages.dev/pdf-tools)
- [Daily Utilities Directory](https://filevexa.pages.dev/daily-utilities)
- [Text Tools Directory](https://filevexa.pages.dev/text-tools)
- [Calculators Directory](https://filevexa.pages.dev/calculators)
- [AI-readable site index (`llms.txt`)](https://filevexa.pages.dev/llms.txt)
- [XML sitemap](https://filevexa.pages.dev/sitemap.xml)

## Technical Highlights & Architecture

- **Local file processing:** Image and PDF files are handled in the user's browser instead of being sent to a conversion server. Privacy depends on the user's browser and device.
- **Image processing:** HTML Canvas is used for browser-native image conversion and JPEG quality-based size reduction. HEIC decoding uses the `heic2any` package.
- **PDF processing:** PDF.js and `pdf-lib` support browser-side PDF rendering and document operations.
- **Browser utilities:** The password generator uses the Web Crypto API; text tools and calculators run locally in the page.
- **Static generation:** Vite builds the client and server-rendered bundles; `npm run build:ssg` prerenders configured routes into static HTML.
- **Search metadata:** Tool pages receive canonical URLs, page-specific titles and descriptions, and Schema.org WebApplication and FAQPage JSON-LD where FAQs are configured.
- **Discovery:** The prerender pipeline generates `sitemap.xml` and updates the site's `llms.txt` index.

## Development

```sh
npm install
npm run dev
```

Build the client bundle:

```sh
npm run build
```

Build and prerender the static site:

```sh
npm run build:ssg
```

Run the linter:

```sh
npm run lint
```
