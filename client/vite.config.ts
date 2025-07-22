import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import macrosPlugin from 'vite-plugin-babel-macros';
import path from 'path';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), macrosPlugin()],
  resolve: {
    alias: {
      '@types-my': path.resolve(__dirname, './types'), 
      '@slices-my': path.resolve(__dirname, './store'), 
      '@methods': path.resolve(__dirname, './src/methods'), 
      '@components': path.resolve(__dirname, './src/components'), 
      '@pages': path.resolve(__dirname, './src/pages'),
      '@enums': path.resolve(__dirname, './enums'),
      '@styles': path.resolve(__dirname, './src/sass'),
      "@layouts": path.resolve(__dirname, './src/layouts'),
      "@form-parts": path.resolve(__dirname, './src/form_parts'),
    },
  },
  server: {
    port: 3000,
    proxy: {
      '/api': {
        target: 'http://localhost:5000',
        changeOrigin: true,
        secure: true,
        ws: true,
      },
    },
  },
});