import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { resolve } from "path";

export default defineConfig({
  plugins: [react()],
  server: { port: 5173, strictPort: true },
  build: {
    rollupOptions: {
      // Main one-pager, /free (Instagram DM landing page), /studio (portfolio + services) and /thanks.
      input: {
        main: resolve(__dirname, "index.html"),
        free: resolve(__dirname, "free/index.html"),
        studio: resolve(__dirname, "studio/index.html"),
        // Google Ads / GA4 / tracking / consent / Search Console services.
        marketing: resolve(__dirname, "marketing/index.html"),
        // Payhip redirects buyers here after checkout; the Google Ads purchase conversion fires on this page.
        thanks: resolve(__dirname, "thanks/index.html"),
      },
    },
  },
});
