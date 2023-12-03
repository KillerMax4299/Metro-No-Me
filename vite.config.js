import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'
import { VitePWA } from "vite-plugin-pwa";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    VitePWA({
      manifest: {
        name: "Metronome",
        short_name: "Metronome",
        start_url: "/",
        display: "standalone",
        background_color: "#333",
        lang: "en",
        scope: "/",
        icons: [
          {
            src: "/vite.svg",
            sizes: "144x144",
            type: "svg",
            purpose: "any maskable",
          },
          {
            src: "/maskable_icon_x512.png",
            sizes: "512x512 ",
            type: "image/png",
            purpose: "any maskable",
          },
        ],
        theme_color: "#000",
      },

      registerType: "autoUpdate",
      injectRegister: "auto",
    }),
  ],
});
