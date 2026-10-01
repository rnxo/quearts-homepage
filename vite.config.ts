import { defineConfig } from 'vite'
import { devtools } from '@tanstack/devtools-vite'

import { tanstackStart } from '@tanstack/react-start/plugin/vite'

import viteReact from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import { cloudflare } from '@cloudflare/vite-plugin'
import mdx from '@mdx-js/rollup'
import remarkGfm from 'remark-gfm'

const config = defineConfig({
  resolve: { tsconfigPaths: true },
  plugins: [
    devtools(),
    cloudflare({ viteEnvironment: { name: 'ssr' } }),
    tailwindcss(),
    tanstackStart(),
    // .mdx をビルド時に React コンポーネントへ変換する。React プラグインより前に実行する
    { enforce: 'pre', ...mdx({ remarkPlugins: [remarkGfm] }) },
    // .mdx も Fast Refresh の対象にする
    viteReact({ include: /\.(mdx|js|jsx|ts|tsx)$/ }),
  ],
})

export default config
