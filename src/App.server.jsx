/**
 * App.server.jsx
 * A stripped-down version of App.jsx used only during the SSG prerender step.
 * BrowserRouter is replaced by StaticRouter (provided by entry-server.jsx).
 * Lazy() is replaced with direct imports so renderToString is synchronous.
 * DO NOT use this file on the client.
 */
import { Suspense } from 'react'
import { Routes, Route } from 'react-router-dom'
import { HelmetProvider } from 'react-helmet-async'
import Header from './components/Header'
import Footer from './components/Footer'
import ScrollToTop from './components/ScrollToTop'

// Direct (non-lazy) imports for SSR compatibility
import Home from './pages/Home'
import HeicToJpg from './pages/HeicToJpg'
import WebpToJpg from './pages/WebpToJpg'
import WebpToPng from './pages/WebpToPng'
import HeicToPng from './pages/HeicToPng'
import AvifToJpg from './pages/AvifToJpg'
import PdfToPng from './pages/PdfToPng'
import RemovePdfPages from './pages/RemovePdfPages'
import ExtractPdfPages from './pages/ExtractPdfPages'
import PdfToText from './pages/PdfToText'
import PdfToMarkdown from './pages/PdfToMarkdown'
import Privacy from './pages/Privacy'
import Terms from './pages/Terms'
import Contact from './pages/Contact'
import QrCodeGenerator from './pages/QrCodeGenerator'
import WordCounter from './pages/WordCounter'
import PasswordGenerator from './pages/PasswordGenerator'
import TextCaseConverter from './pages/TextCaseConverter'
import LoremIpsumGenerator from './pages/LoremIpsumGenerator'
import AgeCalculator from './pages/AgeCalculator'
import PercentageCalculator from './pages/PercentageCalculator'
import ImageToolsCategory from './pages/ImageToolsCategory'
import PdfToolsCategory from './pages/PdfToolsCategory'
import DailyUtilitiesCategory from './pages/DailyUtilitiesCategory'
import TextToolsCategory from './pages/TextToolsCategory'
import CalculatorsCategory from './pages/CalculatorsCategory'

export default function AppServer() {
  return (
    <>
      <Header />
      <main className="main-content">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/heic-to-jpg" element={<HeicToJpg />} />
          <Route path="/webp-to-jpg" element={<WebpToJpg />} />
          <Route path="/webp-to-png" element={<WebpToPng />} />
          <Route path="/heic-to-png" element={<HeicToPng />} />
          <Route path="/avif-to-jpg" element={<AvifToJpg />} />
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
      </main>
      <Footer />
    </>
  )
}
