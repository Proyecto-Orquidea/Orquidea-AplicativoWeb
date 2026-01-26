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
        manualChunks: {
          'react-vendor': ['react', 'react-dom', 'react-router-dom', 'scheduler'],
          'framer-motion': ['framer-motion'],
          'recharts': ['recharts'],
          'katex': ['katex', 'react-katex']
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
