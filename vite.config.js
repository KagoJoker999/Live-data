import { defineConfig } from 'vite';

export default defineConfig({
  base: '/Live-data/',
  build: {
    outDir: 'dist',
    assetsDir: 'assets',
    publicDir: 'public',
    emptyOutDir: true,
  },
  server: {
    port: 3000,
    open: true,
  },
}); 