import { TOOL_SEO_DATA } from '../data/toolSEO.js'
import { PROGRAMMATIC_TOOLS } from '../data/programmaticTools.js'

const SITE_URL = 'https://filevexa.pages.dev'

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

function getDescription(action, dataType) {
  return `${action} online for free. Process ${dataType} in your browser with zero server uploads and no account required.`
}

function normalizeTool(slug, source) {
  const name = source.title
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
    description: source.metaDescription || getDescription(action, dataType),
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
    entitySummary: `FileVexa ${name} is a 100% client-side web utility that processes ${dataType} directly inside your browser.`,
    processingLocation: source.category?.name === 'Image Tools'
      ? 'Client-Side (Browser JavaScript/Wasm)'
      : 'Client-Side (Browser JavaScript)',
    howToAction,
    howToSteps: steps,
    howToTips: source.howTo.tips,
    features: [
      'Fast processing in your browser without a server upload.',
      'Zero server uploads or server-side file logging; your data stays on your device.',
      'Free to use with no account or signup required.',
    ],
    faqs: source.faqs.map(({ question, answer }) => ({ q: question, a: answer })),
    relatedToolIds: (source.related || []).map(({ href }) => routeToId(href)),
    relatedTools: source.related || [],
    applicationCategory: 'UtilityApplication',
    howToIntro: source.howTo.intro,
    icon: source.icon,
    category: source.category,
    layoutRendered: false,
  }
}

const toolEntries = Object.entries(TOOL_SEO_DATA).map(([slug, source]) => [
  slug,
  normalizeTool(slug, source),
])

function normalizeProgrammaticTool(slug, source) {
  const isGuide = source.kind === 'guide'
  const name = isGuide
    ? 'PDF Size Guide'
    : `PNG to ${source.outputLabel} Converter`
  const dataType = source.kind === 'image' ? 'PNG image files' : 'PDF size information'
  const metaSummary = isGuide
    ? 'PDF size guide for 200KB targets. Learn what affects file size and browse local PDF tools. Free, no uploads, no account.'
    : `${slug.replace(/-/g, ' ')} online for free. Convert images in your browser with zero server uploads and no account required.`
  const action = slug.replace(/-/g, ' ')
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
    title: `Free Online ${name} (100% Private, No Upload) - FileVexa`,
    h1: `Free Online ${name}`,
    description: metaSummary.length <= 160
      ? metaSummary
      : `${metaSummary.slice(0, 157).trimEnd()}...`,
    targetKeywords: {
      primary: `${action} online`,
      longTail: [`free ${action}`, `${action} no upload`, `private ${action} online`],
    },
    shortDescription: source.intro,
    dataType,
    entitySummary: isGuide
      ? `FileVexa's ${name.toLowerCase()} is an informational guide. It does not upload files or compress PDFs.`
      : `FileVexa ${name} is a 100% client-side web utility that processes ${dataType} directly inside your browser.`,
    processingLocation: isGuide
      ? 'Informational page; no file processing'
      : 'Client-Side (Browser JavaScript)',
    howToAction,
    howToSteps: steps,
    howToTips: null,
    features: isGuide
      ? [
          'Clearly explains that FileVexa does not currently compress PDFs.',
          'Links to PDF tools that are available for local browser processing.',
          'No files are uploaded or logged; free to read with no account required.',
        ]
      : [
          'Converts images directly in your browser.',
          'Zero server uploads or server-side file logging; your image stays on your device.',
          'Free to use with no account or signup required.',
        ],
    faqs: source.faqs.map(({ question, answer }) => ({ q: question, a: answer })),
    relatedToolIds: (source.related || []).map(({ href }) => routeToId(href)),
    relatedTools: source.related || [],
    applicationCategory: 'UtilityApplication',
    howToIntro: source.intro,
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

export const TOOL_SITE_URL = SITE_URL

export function getToolFaqItems(toolId) {
  return (TOOLS_SEO_DATA[toolId]?.faqs || []).map(({ q, a }) => ({
    question: q,
    answer: a,
  }))
}
