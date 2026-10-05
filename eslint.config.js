//  @ts-check

import { tanstackConfig } from '@tanstack/eslint-config'
import eslintPluginAstro from 'eslint-plugin-astro'
import tseslint from 'typescript-eslint'

export default [
  ...tanstackConfig,
  ...eslintPluginAstro.configs['flat/recommended'],
  // .astro files (and their extracted <script> blocks) have no type info.
  {
    files: ['**/*.astro', '**/*.astro/*.ts'],
    ...tseslint.configs.disableTypeChecked,
  },
  {
    rules: {
      'import/no-cycle': 'off',
      'import/order': 'off',
      'sort-imports': 'off',
      '@typescript-eslint/array-type': 'off',
      '@typescript-eslint/require-await': 'off',
      'pnpm/json-enforce-catalog': 'off',
    },
  },
  {
    ignores: [
      'eslint.config.js',
      'prettier.config.js',
      'astro.config.mjs',
      'dist',
      '.astro',
    ],
  },
]
