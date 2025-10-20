import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  base: '/fdm_hockey_sur_glace/',
  optimizeDeps: {
    include: ['pdfjs-dist']
  },
  worker: {
    format: 'es'
  }
})
