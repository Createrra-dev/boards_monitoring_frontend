import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '');
  return {
    base: '/',
    define: {
      'process.env.API_URL': JSON.stringify(env.API_URL),
      'process.env.LIMIT': JSON.stringify(env.LIMIT),
    },
    plugins: [react()],
  }
})
