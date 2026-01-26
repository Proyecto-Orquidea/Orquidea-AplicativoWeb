import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  base: '/Orquidea-AplicativoWeb/',
  build: {
    outDir: 'dist',
    assetsDir: 'assets',
    sourcemap: false,
    minify: 'esbuild',
    rollupOptions: {
      output: {
        manualChunks: (id) => {
          if (id.includes('node_modules')) {
            // Bundle react, react-dom, and scheduler together
            if (id.includes('react') || id.includes('scheduler')) {
              return 'react-vendor'
            }
            if (id.includes('framer-motion')) {
              return 'framer-motion'
            }
            if (id.includes('recharts') || id.includes('d3-')) {
              return 'recharts'
            }
            if (id.includes('katex')) {
              return 'katex'
            }
            return 'vendor'
          }
        }
      }
    }
  },
  server: {
    port: 3000,
    open: true
  },
  optimizeDeps: {
    include: ['react', 'react-dom', 'framer-motion', 'recharts']
  }
})
