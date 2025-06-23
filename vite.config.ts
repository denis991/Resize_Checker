import { defineConfig } from 'vite';

export default defineConfig({
  build: {
    target: 'es2015',
    outDir: 'dist',
    assetsInlineLimit: Infinity, // Встраиваем все ассеты
    rollupOptions: {
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