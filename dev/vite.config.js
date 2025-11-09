import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import svgLoader from "vite-svg-loader";

export default defineConfig({
  root: "dev",
  base: "./",
  plugins: [
    vue({
      template: {
        compilerOptions: {
          isCustomElement: tag => tag.includes('-')
        }
      }
    }),
    svgLoader()
  ],
  server: {
    port: 5173
  },
  build: {
    outDir: "dist",
    sourcemap: true
  }
});