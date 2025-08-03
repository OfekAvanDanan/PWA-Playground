import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { VitePWA } from 'vite-plugin-pwa';

export default defineConfig({
  plugins: [
    react(),
    VitePWA({
      registerType: 'autoUpdate',
      includeAssets: ['favicon.ico', 'apple-touch-icon.png', 'masked-icon.svg'],
      manifest: false,
      workbox: {
        globPatterns: ['**/*.{js,css,html,ico,png,svg}']
      }
    }),
  ],
  optimizeDeps: {
    force: true,
  },
  server: {
    host: true,

  allowedHosts: true, 
    hmr: {
      overlay: false,
    },
  },
});
