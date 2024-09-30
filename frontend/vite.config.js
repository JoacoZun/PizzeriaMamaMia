import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  build: {
    outDir: 'dist',  // La carpeta donde se generará el build
    rollupOptions: {
      input: './index.html',  // Asegúrate de que apunte a tu archivo `index.html`
    },
  },
  base: '/PizzeriaMamaMia/'  // Asegúrate de que la base apunte al subdirectorio de GitHub Pages
});
