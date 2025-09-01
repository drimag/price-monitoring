import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      host: true,
      port: 5173,
      "/api": {
        target: "http://localhost:5000", // backend
        changeOrigin: true,
      },
    },
  },
});
