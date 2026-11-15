import { defineConfig, type PluginOption } from "vite";
// import federation from "@originjs/vite-plugin-federation";
import react from "@vitejs/plugin-react";
// import { visualizer } from 'rollup-plugin-visualizer';

const plugins: PluginOption[] = [
  react({
    // babel: {
    //   plugins: ["babel-plugin-react-compiler"],
    // },
  }) as PluginOption,
  // visualizer({ open: true }),
  // federation({
  //   name: "react-mfe-host",
  //   remotes: {
  //     remoteApp: "http://localhost:5001/assets/remoteEntry.js",
  //   },
  //   shared: ["react", "react-dom"],
  // })
];

// https://vite.dev/config/
export default defineConfig({
  plugins,
  resolve: {
    alias: {
      "@": import.meta.dirname + "/src",
    },
  },
  build: {
    target: "esnext",
  },
  css: {
    postcss: './postcss.config.js',
  },
  optimizeDeps: {
    include: [
      'redux-persist',
      'redux-persist/es/storage/createWebStorage',
    ],
  },
});
