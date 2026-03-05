import { defineConfig, type Plugin } from 'vite'
import react from '@vitejs/plugin-react'

// Repository name on GitHub – used as the sub-path when deployed to GitHub Pages
const REPO_NAME = 'Orquidea-AplicativoWeb'

// Fonts actually used by the app (Main, Math, Size1-4)
const KEEP_FONTS = [
  'KaTeX_Main-Regular', 'KaTeX_Main-Bold', 'KaTeX_Main-Italic', 'KaTeX_Main-BoldItalic',
  'KaTeX_Math-Italic', 'KaTeX_Math-BoldItalic',
  'KaTeX_Size1-Regular', 'KaTeX_Size2-Regular', 'KaTeX_Size3-Regular', 'KaTeX_Size4-Regular'
]

// Strip legacy font formats AND unused KaTeX font families
function stripUnusedAssets(): Plugin {
  return {
    name: 'strip-unused-assets',
    generateBundle(_options, bundle) {
      for (const key of Object.keys(bundle)) {
        // Remove all .ttf and .woff (keep only .woff2)
        if (/\.(ttf|woff)$/i.test(key) && !/\.woff2$/i.test(key)) {
          delete bundle[key]; continue
        }
        // Remove unused KaTeX woff2 fonts
        if (/KaTeX_.*\.woff2$/i.test(key)) {
          const needed = KEEP_FONTS.some(f => key.includes(f))
          if (!needed) delete bundle[key]
        }
      }
    }
  }
}

// https://vitejs.dev/config/
export default defineConfig(({ command }) => ({
  plugins: [react(), stripUnusedAssets()],
  // En desarrollo usa '/' para que localhost:5173 funcione sin sub-path.
  // En producción usa el nombre del repositorio para que GitHub Pages resuelva
  // los assets correctamente en https://<user>.github.io/<REPO_NAME>/
  base: command === 'build' ? `/${REPO_NAME}/` : '/',
  build: {
    outDir: 'dist',
    assetsDir: 'assets',
    sourcemap: false,
    minify: 'terser',
    terserOptions: {
      compress: {
        drop_console: true,
        drop_debugger: true
      }
    },
    rollupOptions: {
      output: {
        manualChunks: undefined
      }
    },
    assetsInlineLimit: 0,
    chunkSizeWarningLimit: 1000
  },
  server: {
    port: 5173,
    open: false
  },
  optimizeDeps: {
    include: ['react', 'react-dom', 'framer-motion', 'recharts']
  },
}))
