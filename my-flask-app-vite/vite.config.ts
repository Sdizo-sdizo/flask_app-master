import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

<<<<<<< HEAD
// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    port: 5173,
    host: true,
    proxy: {
      '/api': {
        target: 'http://localhost:5001',
        changeOrigin: true,
        secure: false,
        rewrite: (path) => path,
        configure: (proxy, _options) => {
          proxy.on('error', (err, _req, _res) => {
            console.error('Proxy error:', err);
          });
          proxy.on('proxyReq', (proxyReq, req, _res) => {
            console.log('Proxying request:', {
              method: req.method,
              url: req.url,
              target: 'http://localhost:5001' + req.url
            });
          });
          proxy.on('proxyRes', (proxyRes, req, _res) => {
            console.log('Proxy response:', {
              method: req.method,
              url: req.url,
              status: proxyRes.statusCode,
              headers: proxyRes.headers
            });
          });
        },
      }
    }
  }
=======
// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
>>>>>>> 2ea9360 (Complete rewrite with new UI and social login components)
})
