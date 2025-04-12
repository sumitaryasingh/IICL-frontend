import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  build: {
    outDir: 'dist',      // default output folder
    sourcemap: true,     // optional: helpful for debugging
  },
  server: {
    port: 3000,
    proxy: {
      '/api': {
        target: process.env.NODE_ENV === 'production' 
          ? 'https://iicleducation.in' 
          : 'http://localhost:4000',  // Backend API target
        changeOrigin: true,
        secure: false,
        configure: (proxy) => {
          proxy.on('proxyReq', (proxyReq) => {
            console.log('Proxying request to:', proxyReq.path);  // Useful for debugging
          });
        },
      },
    },
  },
});
