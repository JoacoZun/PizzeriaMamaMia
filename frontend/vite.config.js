import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  base: '/PizzeriaMamaMia/' // Ruta base para GitHub Pages
});
