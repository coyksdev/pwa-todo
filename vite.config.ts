import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { VitePWA } from 'vite-plugin-pwa';

let faviconURL = '/favicon.svg';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    VitePWA({
      devOptions: {
        enabled: true,
      },
      includeAssets: [faviconURL],
      manifest: {
        name: 'Offline First Todo PWA',
        theme_color: '#ffffff',
        icons: [
          {
            src: faviconURL,
            sizes: '512x512',
            type: 'image/svg+xml',
            purpose: 'any maskable',
          },
          {
            src: faviconURL,
            sizes: '512x512',
            type: 'image/png',
          },
        ],
      },
      workbox: {
        clientsClaim: true,
        skipWaiting: true,
        importScripts: ['sw-code.js'],
        runtimeCaching: [
          {
            urlPattern: ({ url }) => {
              return url.pathname.startsWith('/rest/v1/todo');
            },
            handler: 'NetworkFirst',
            options: {
              cacheName: 'todo-api-cache',
              cacheableResponse: {
                statuses: [0, 200],
              },
            },
          },
          {
            urlPattern: ({ url }) => {
              return url.pathname.startsWith('/rest/v1/todo');
            },
            method: 'POST',
            handler: 'NetworkOnly',
            options: {
              backgroundSync: {
                name: 'todo-api-background-sync',
                options: {
                  maxRetentionTime: 60 * 60,
                },
              },
            },
          },
        ],
      },
    }),
  ],
});
