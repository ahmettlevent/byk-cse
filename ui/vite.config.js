import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  base: "/",
  plugins: [
    react({
      include: [/\.jsx?$/, /\.tsx?$/],
    }),
  ],
  preview: {
    port: 8080,
    strictPort: true,
  },
  server: {
    watch: {
      usePolling: true,
    },
    port: 8080,
    strictPort: true,
    host: true,
    origin: "http://0.0.0.0:8080",
  },
});
