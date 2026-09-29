import { StrictMode } from 'react'
import { renderToString } from 'react-dom/server'
import { StaticRouter } from 'react-router'
import { HelmetProvider } from 'react-helmet-async'
import App from './App.server.jsx'

// Export a render function for the SSG script
export async function render(url) {
  const helmetContext = {}

  const html = renderToString(
    <StrictMode>
      <HelmetProvider context={helmetContext}>
        <StaticRouter location={url}>
          <App />
        </StaticRouter>
      </HelmetProvider>
    </StrictMode>
  )

  const { helmet } = helmetContext

  return {
    html,
    head: helmet
      ? [
          helmet.title.toString(),
          helmet.meta.toString(),
          helmet.link.toString(),
          helmet.script.toString(),
        ].join('\n    ')
      : '',
  }
}
