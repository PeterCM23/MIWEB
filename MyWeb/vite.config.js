import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  build: {
    rollupOptions: {
      input: {
        main: "src/main.jsx", // Punto de entrada principal de tu aplicación React
        animation: "public/animation/index.html", // Ruta de entrada de tu archivo HTML de animación
      },
    },
  },
  publicDir: "public", // Directorio público que contiene tus archivos HTML, CSS y JavaScript de animación
});