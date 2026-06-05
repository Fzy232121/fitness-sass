import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
  css: {
    preprocessorOptions: {
      less: {
        modifyVars: { '@primary-color': '#1890ff' },
        javascriptEnabled: true,
      },
    },
  },
  server: {
    port: 3000,
    open: false,
  },
})
