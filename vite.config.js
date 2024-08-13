import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  server:{
    proxy: {
      '/API': 'https://health.code-faster.giize.com'
    }
  },
  plugins: [react()],
  base: "/test2/", // YOUR REPO NAME HERE

})
