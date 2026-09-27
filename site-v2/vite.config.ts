import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { resolve } from "path";

export default defineConfig({
  plugins: [react()],
  server: { port: 5173, strictPort: true },
  build: {
    rollupOptions: {
      // Main one-pager, /free (Instagram DM landing page) and /studio (portfolio + services).
      input: {
        main: resolve(__dirname, "index.html"),
        free: resolve(__dirname, "free/index.html"),
        studio: resolve(__dirname, "studio/index.html"),
      },
    },
  },
});
