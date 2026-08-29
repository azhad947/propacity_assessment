import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  plugins: [react(), tailwindcss()],
  server: {
    proxy: {
      '/cdn': {
        target: 'https://www.murec.com',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/cdn/, '/images'),
        headers: {
          Referer: 'https://www.murec.com/',
          Origin: 'https://www.murec.com',
        },
      },
    },
  },
})
