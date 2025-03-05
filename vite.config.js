import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { copyFileSync } from 'fs'
import path from 'path'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
  ],
  build: {
    // Esto asegura que el archivo _redirects se copie después de la construcción
    outDir: 'dist',
    rollupOptions: {
      output: {
        // Aquí puedes incluir opciones si lo necesitas
      }
    }
  },
  // Hook para copiar el archivo _redirects después de la compilación
  buildEnd() {
    const sourcePath = path.resolve(__dirname, 'public/_redirects')
    const destPath = path.resolve(__dirname, 'dist/_redirects')
    copyFileSync(sourcePath, destPath)
  }
})
