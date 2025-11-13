import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import svgLoader from "vite-svg-loader";
import markdown from "unplugin-vue-markdown/vite";
import hljs from "markdown-it-highlightjs";

export default defineConfig({
  root: "dev",
  base: "./",
  plugins: [
    vue({
      include: [/\.vue$/, /\.md$/],
      template: {
        compilerOptions: {
          isCustomElement: tag => tag.includes('-')
        }
      }
    }),
    svgLoader(),
    markdown({
      markdownItOptions: {
        html: true,
        linkify: true,
      },
      markdownItUses: [hljs],
    })
  ],
  server: {
    port: 5173
  },
  build: {
    outDir: "dist",
    sourcemap: true
  }
});