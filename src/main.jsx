import { createRoot, hydrateRoot } from 'react-dom/client'
import { StrictMode } from 'react'
import './index.css'
import App from './App.jsx'

// SSG entry: export a factory so the prerender script can call it
export function createApp() {
  return <App />
}

// Client-side: hydrate if SSG pre-rendered, otherwise mount fresh
if (typeof window !== 'undefined') {
  const rootEl = document.getElementById('root')
  if (rootEl.hasChildNodes()) {
    hydrateRoot(
      rootEl,
      <StrictMode>
        <App />
      </StrictMode>
    )
  } else {
    createRoot(rootEl).render(
      <StrictMode>
        <App />
      </StrictMode>
    )
  }
}
