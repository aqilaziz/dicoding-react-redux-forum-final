import js from '@eslint/js'
import globals from 'globals'
import reactHooks from 'eslint-plugin-react-hooks'
import reactRefresh from 'eslint-plugin-react-refresh'
import react from 'eslint-plugin-react'
import { FlatCompat } from '@eslint/eslintrc'

const compat = new FlatCompat({
  recommendedConfig: js.configs.recommended,
  allConfig: js.configs.all
})

export default [
  {
    ignores: ['dist', 'node_modules', 'playwright-report', 'test-results']
  },
  ...compat.extends('standard'),
  {
    files: ['**/*.{js,jsx}'],
    plugins: {
      react,
      'react-hooks': reactHooks,
      'react-refresh': reactRefresh
    },
    languageOptions: {
      ecmaVersion: 'latest',
      sourceType: 'module',
      globals: globals.browser,
      parserOptions: {
        ecmaFeatures: {
          jsx: true
        }
      }
    },
    rules: {
      ...reactHooks.configs.recommended.rules,
      'react/jsx-uses-vars': 'error',
      'react-refresh/only-export-components': ['warn', { allowConstantExport: true }]
    }
  },
  {
    files: ['**/*.test.{js,jsx}', 'src/test/**/*.js'],
    languageOptions: {
      globals: {
        ...globals.browser,
        ...globals.vitest
      }
    }
  },
  {
    files: ['playwright.config.js', 'tests/**/*.js'],
    languageOptions: {
      globals: globals.node
    }
  }
]
