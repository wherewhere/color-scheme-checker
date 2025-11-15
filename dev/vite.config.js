import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import legacy from "@vitejs/plugin-legacy";
import svgLoader from "vite-svg-loader";
import markdown from "unplugin-vue-markdown/vite";
import hljs from "markdown-it-highlightjs";
import postcssPresetEnv from "postcss-preset-env";

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
    legacy({
      targets: ["supports custom-elementsv1"],
      polyfills: false,
      renderLegacyChunks: false
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
  css: {
    devSourcemap: true,
    postcss: {
      plugins: [postcssPresetEnv({
        stage: 0,
        browsers: ["supports custom-elementsv1"]
      })]
    },
    preprocessorOptions: {
      scss: {
        importers: [{
          canonicalize(url) {
            return url.startsWith("github:") ? new URL(url) : null;
          },
          async load(canonicalUrl) {
            const { pathname, searchParams } = canonicalUrl;
            const branch = searchParams.get("branch") || "main";
            const path = searchParams.get("path") || '/index.css';
            try {
              return {
                contents: await fetch(`https://github.com/${pathname}/raw/refs/heads/${branch}${path}`).then(res => res.text()),
                syntax: (() => {
                  switch (path.split('.').pop()) {
                    case "scss":
                      return "scss";
                    case "sass":
                      return "indented";
                    case "css":
                    default:
                      return "css";
                  }
                })()
              }
            }
            catch (e) {
              console.warn(`Failed to fetch '${canonicalUrl.href}': ${e}`);
              return {
                contents: `@import "https://cdn.jsdelivr.net/gh/${pathname}@${branch}${path}";`,
                syntax: "css"
              }
            }
          }
        }]
      }
    }
  },
  server: {
    port: 5173
  },
  build: {
    outDir: "dist",
    sourcemap: true
  }
});