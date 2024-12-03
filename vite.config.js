import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  base: '/', // Set the base URL here (update as needed for subdirectory deployments)
  plugins: [react()],
})
