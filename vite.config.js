import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { fileURLToPath, URL } from 'node:url'
import postcssPxToViewport from 'postcss-px-to-viewport'

// https://vitejs.dev/config/
export default defineConfig({
  base: '/Live-data/',
  plugins: [vue()],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  },
  build: {
    outDir: 'dist',
    assetsDir: '',
    rollupOptions: {
      input: {
        main: fileURLToPath(new URL('./index.html', import.meta.url))
      },
      output: {
        chunkFileNames: 'js/[name]-[hash].js',
        entryFileNames: 'js/[name]-[hash].js',
        assetFileNames: '[ext]/[name]-[hash].[ext]'
      }
    }
  },
  css: {
    postcss: {
      plugins: [
        postcssPxToViewport({
          viewportWidth: 375,
          viewportHeight: 667,
          unitPrecision: 5,
          viewportUnit: 'vw',
          selectorBlackList: [],
          minPixelValue: 1,
          mediaQuery: false
        })
      ]
    }
  }
})
