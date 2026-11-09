import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'

// https://vite.dev/config/
export default defineConfig(({ isSsrBuild }) => ({
  plugins: [react()],
  build: {
    chunkSizeWarningLimit: 1400,
    rollupOptions: {
      output: {
        // Separate heic2any into its own chunk so the homepage bundle stays small
        // (only applied when NOT building the SSR bundle)
        manualChunks: isSsrBuild
          ? undefined
          : (id) => {
              if (id.includes('heic2any')) return 'heic2any'
            },
      },
    },
  },
}))
