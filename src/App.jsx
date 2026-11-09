import { lazy, Suspense } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { HelmetProvider } from 'react-helmet-async'
import Header from './components/Header'
import Footer from './components/Footer'
import Home from './pages/Home'
import ScrollToTop from './components/ScrollToTop'
import ToolRouteFaq from './components/ToolRouteFaq'

// Lazy-load tool pages for code splitting
const HeicToJpg = lazy(() => import('./pages/HeicToJpg'))
const WebpToJpg = lazy(() => import('./pages/WebpToJpg'))
const WebpToPng = lazy(() => import('./pages/WebpToPng'))
const HeicToPng = lazy(() => import('./pages/HeicToPng'))
const AvifToJpg = lazy(() => import('./pages/AvifToJpg'))
const PdfToPng = lazy(() => import('./pages/PdfToPng'))
const RemovePdfPages = lazy(() => import('./pages/RemovePdfPages'))
const ExtractPdfPages = lazy(() => import('./pages/ExtractPdfPages'))
const PdfToText = lazy(() => import('./pages/PdfToText'))
const PdfToMarkdown = lazy(() => import('./pages/PdfToMarkdown'))
const Privacy = lazy(() => import('./pages/Privacy'))
const Terms = lazy(() => import('./pages/Terms'))
const Contact = lazy(() => import('./pages/Contact'))
const QrCodeGenerator = lazy(() => import('./pages/QrCodeGenerator'))
const WordCounter = lazy(() => import('./pages/WordCounter'))
const PasswordGenerator = lazy(() => import('./pages/PasswordGenerator'))
const TextCaseConverter = lazy(() => import('./pages/TextCaseConverter'))
const LoremIpsumGenerator = lazy(() => import('./pages/LoremIpsumGenerator'))
const AgeCalculator = lazy(() => import('./pages/AgeCalculator'))
const PercentageCalculator = lazy(() => import('./pages/PercentageCalculator'))
const ImageToolsCategory = lazy(() => import('./pages/ImageToolsCategory'))
const PdfToolsCategory = lazy(() => import('./pages/PdfToolsCategory'))
const DailyUtilitiesCategory = lazy(() => import('./pages/DailyUtilitiesCategory'))
const TextToolsCategory = lazy(() => import('./pages/TextToolsCategory'))
const CalculatorsCategory = lazy(() => import('./pages/CalculatorsCategory'))
const ProgrammaticToolPage = lazy(() => import('./components/ProgrammaticToolPage'))

function PageLoader() {
  return (
    <main className="main-content" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', minHeight: '100dvh' }}>
      <div className="spinner" role="status" aria-label="Loading page"></div>
    </main>
  )
}

export default function App() {
  return (
    <HelmetProvider>
      <BrowserRouter>
        <ScrollToTop />
        <Header />
        <Suspense fallback={<PageLoader />}>
          <main className="main-content">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/heic-to-jpg" element={<HeicToJpg />} />
              <Route path="/webp-to-jpg" element={<WebpToJpg />} />
              <Route path="/webp-to-png" element={<WebpToPng />} />
              <Route path="/heic-to-png" element={<HeicToPng />} />
              <Route path="/avif-to-jpg" element={<AvifToJpg />} />
              <Route path="/convert-png-to-jpg" element={<ProgrammaticToolPage />} />
              <Route path="/convert-png-to-webp" element={<ProgrammaticToolPage />} />
              <Route path="/compress-pdf-to-200kb" element={<ProgrammaticToolPage />} />
              <Route path="/pdf-to-png" element={<PdfToPng />} />
              <Route path="/remove-pdf-pages" element={<RemovePdfPages />} />
              <Route path="/extract-pdf-pages" element={<ExtractPdfPages />} />
              <Route path="/pdf-to-text" element={<PdfToText />} />
              <Route path="/pdf-to-markdown" element={<PdfToMarkdown />} />
              <Route path="/privacy" element={<Privacy />} />
              <Route path="/terms" element={<Terms />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="/qr-code-generator" element={<QrCodeGenerator />} />
              <Route path="/word-counter" element={<WordCounter />} />
              <Route path="/password-generator" element={<PasswordGenerator />} />
              <Route path="/text-case-converter" element={<TextCaseConverter />} />
              <Route path="/lorem-ipsum-generator" element={<LoremIpsumGenerator />} />
              <Route path="/age-calculator" element={<AgeCalculator />} />
              <Route path="/percentage-calculator" element={<PercentageCalculator />} />
              <Route path="/image-tools" element={<ImageToolsCategory />} />
              <Route path="/pdf-tools" element={<PdfToolsCategory />} />
              <Route path="/daily-utilities" element={<DailyUtilitiesCategory />} />
              <Route path="/text-tools" element={<TextToolsCategory />} />
              <Route path="/calculators" element={<CalculatorsCategory />} />
            </Routes>
            <ToolRouteFaq />
          </main>
          <Footer />
        </Suspense>
      </BrowserRouter>
    </HelmetProvider>
  )
}
