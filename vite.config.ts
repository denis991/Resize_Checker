import { defineConfig } from 'vite';
import { resolve } from 'path';

export default defineConfig({
  root: 'src',
  build: {
    target: 'es2015',
    outDir: '../dist',
    assetsInlineLimit: Infinity, // Встраиваем все ассеты
    rollupOptions: {
      input: {
        main: resolve('src/index.html'),
      },
      output: {
        inlineDynamicImports: true,
        manualChunks: undefined,
        entryFileNames: 'index.js',
        chunkFileNames: 'index.js',
        assetFileNames: 'index.css'
      }
    }
  },
  server: {
    port: 3000,
    open: true
  }
});