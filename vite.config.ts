import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  build: {
    // Keeps the same output location the GitHub Pages workflow and the
    // copy:404 script expect.
    outDir: 'dist/developer-toolbox-ui',
    emptyOutDir: true,
  },
});
