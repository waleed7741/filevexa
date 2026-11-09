# React + Vite

Run `npm run build` to create the production frontend. Use `npm run build:ssg`
to also generate static HTML for the tool routes.

## Adding a tool page

Add the route to both `src/App.jsx` and `src/App.server.jsx`, then add its SEO
copy and FAQ data to `src/data/toolSEO.js` (or its landing-page content to
`src/data/programmaticTools.js`). `src/config/toolsSEOData.js` normalizes those
records into the metadata, canonical URL, application/FAQ schemas, keywords,
related links, and structured content used by `ToolPageLayout`.

Use `ToolPageLayout` below the tool interface to render the summary,
specifications, three-step guide, features, FAQs, and related links. Its
metadata and JSON-LD are included automatically. Configured tool routes are
also included automatically in `npm run build:ssg` prerendering and the
generated `dist/sitemap.xml`.

This template provides a minimal setup to get React working in Vite with HMR
and some Oxlint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react)
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc)

## React Compiler

The React Compiler is not enabled on this template because of its impact on
build performance. See the React documentation for setup instructions.

## Expanding the Oxlint configuration

For production applications, consider TypeScript with type-aware lint rules.
