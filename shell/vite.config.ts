import { defineConfig } from "vite";
import federation from "@originjs/vite-plugin-federation";
import react from "@vitejs/plugin-react";
import path from "path"

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    federation({
      name: "react-mfe-host",
      remotes: {
        remoteApp: "http://localhost:5001/assets/remoteEntry.js",
      },
      shared: ["react", "react-dom"],
    }),
  ],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  build: {
    target: "esnext",
  },
  css: {
    postcss: './postcss.config.js',
  },
});
