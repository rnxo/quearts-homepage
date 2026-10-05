// @ts-check
import { defineConfig } from 'astro/config'
import react from '@astrojs/react'
import mdx from '@astrojs/mdx'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  output: 'static',
  // /news → dist/news.html so URLs stay identical to the TanStack Start era.
  build: { format: 'file' },
  trailingSlash: 'never',
  integrations: [react(), mdx()],
  vite: { plugins: [tailwindcss()] },
  prefetch: { prefetchAll: true, defaultStrategy: 'hover' },
  // README の編集手順が 3000 番ポートを前提にしている
  server: { port: 3000 },
})
