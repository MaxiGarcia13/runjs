import { fileURLToPath, URL } from 'node:url';
import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';
import { defineConfig } from 'vite';
import { previewScriptsPlugin } from './vite/plugins';

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss(), previewScriptsPlugin()],
  assetsInclude: ['src/**/*.html'],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
    },
  },
  build: {
    sourcemap: true,
    rollupOptions: {
      input: {
        main: fileURLToPath(new URL('./index.html', import.meta.url)),
        snapshot: fileURLToPath(new URL('./snapshot/index.html', import.meta.url)),
      },
    },
  },
});
