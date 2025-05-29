import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  base: '/noise-pollution-slides-main/',
  build: {
    outDir: 'dist',
    assetsDir: 'assets'
  }
})