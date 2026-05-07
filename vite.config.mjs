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
});
