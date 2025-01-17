import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vite.dev/config/
export default defineConfig({
  base: '/Costs-Management-System/', // Exact repository name
  build: {
    outDir: 'dist',
    assetsDir: ''  // This will put assets in root
  },
  plugins: [react()]
})
