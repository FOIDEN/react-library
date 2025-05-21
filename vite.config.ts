import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  base: '/book-store-main/',
  build: {
    outDir: '.', // build to project root for gh-pages
    assetsDir: 'assets',
    emptyOutDir: false,
    sourcemap: true,
    rollupOptions: {
      input: {
        main: './index.html'
      },
      output: {
        assetFileNames: 'assets/[name]-[hash][extname]',
        chunkFileNames: 'assets/[name]-[hash].js',
        entryFileNames: 'assets/[name]-[hash].js'
      }
    }
  }
}) 