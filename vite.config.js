import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
// `base` is only applied for production builds so the app works when served
// from https://<user>.github.io/ABRWebsite/. Local `npm run dev` stays at "/".
export default defineConfig(({ command }) => ({
  base: command === 'build' ? '/ABRWebsite/' : '/',
  plugins: [react()],
}))
