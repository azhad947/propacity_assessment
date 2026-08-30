import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// The /api/cdn path is proxied here for local dev, and by a matching
// serverless/edge function (api/cdn/[...path].js on Vercel, or
// netlify/edge-functions/cdn.js on Netlify) in production — see the comment
// at the top of api/cdn/[...path].js for why this exists at all.
export default defineConfig({
  plugins: [react(), tailwindcss()],
  server: {
    proxy: {
      '/api/cdn': {
        target: 'https://www.murec.com',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api\/cdn/, '/images'),
        headers: {
          Referer: 'https://www.murec.com/',
          Origin: 'https://www.murec.com',
        },
      },
    },
  },
})
