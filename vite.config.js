import { defineConfig } from 'vite'

// https://vitejs.dev/config/
export default defineConfig({
  base: '/Live-data/',
  build: {
    outDir: 'dist'
  },
  publicDir: 'public'
})
