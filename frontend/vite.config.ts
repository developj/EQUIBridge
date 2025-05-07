import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vite.dev/config/
export default defineConfig({
  server: {
    host: true,
    port: 5173,
    allowedHosts: ['equibridge.onrender.com','equibridgeapi.onrender.com','equibridge-2.onrender.com,creative-cajeta-95b188.netlify.app'],
  },
  plugins: [react()],
});
