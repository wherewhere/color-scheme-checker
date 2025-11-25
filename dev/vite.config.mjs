import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import svgLoader from "vite-svg-loader";
import markdown from "unplugin-vue-markdown/vite";
import hljs from "markdown-it-highlightjs";
import simpleHtmlPlugin from "vite-plugin-simple-html";
import githubImporter from "./helpers/github-importer.mjs";

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
        linkify: true
      },
      markdownItUses: [hljs]
    }),
    simpleHtmlPlugin({
      minify: {
        minifyJs: true,
        sortSpaceSeparatedAttributeValues: true,
        sortAttributes: true,
        tagOmission: false
      }
    })
  ],
  css: {
    preprocessorOptions: {
      scss: {
        importers: [githubImporter]
      }
    },
    devSourcemap: true
  },
  build: {
    outDir: "dist",
    sourcemap: true,
    minify: "terser"
  }
});