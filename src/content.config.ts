import { defineCollection } from 'astro:content'
import { glob } from 'astro/loaders'

/**
 * 依頼の流れの各工程の説明文（Contact ページのダイアログの中身）。
 * ID はファイル名から拡張子を除いたもの（例: '01_hearing'）。
 */
const flowItem = defineCollection({
  loader: glob({
    pattern: '*.mdx',
    base: './src/content/flow-item-md',
    // 既定の ID 生成はファイル名を slug 化するので、ファイル名のままにしておく
    generateId: ({ entry }) => entry.replace(/\.mdx$/, ''),
  }),
})

export const collections = { flowItem }
