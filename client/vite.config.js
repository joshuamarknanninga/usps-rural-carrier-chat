import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  base: '/', // Use '/' for local development or '/subdirectory/' for deployment
  server: {
    port: 5173, // Default port for Vite
  },
});