import path from 'path'
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import pages from 'vite-plugin-pages'
import layouts from 'vite-plugin-vue-layouts'
import components from 'unplugin-vue-components/vite'
import viteESLint from '@ehutch79/vite-eslint'
import windiCSS from 'vite-plugin-windicss'

import './stub/ssg'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    windiCSS(),
    vue(),
    pages(),
    layouts(),
    components({
      directoryAsNamespace: true,
      dts: true
    }),
    // Turn on Dev ESLint for development mode only
    ...(process.env.NODE_ENV === 'development'
      ? [viteESLint({ include: ['src/**/*.vue', 'src/**/*.ts'] })]
      : []
    )
  ],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src')
    }
  },
  build: {
    chunkSizeWarningLimit: 1024
  }
})
