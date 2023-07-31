import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import path from 'path'
const port = 3001;

// https://vitejs.dev/config/
export default defineConfig({
  server: { port },
  plugins: [vue()],
  resolve: {
    alias: { '@': path.resolve(__dirname, 'src') },
  },
})
