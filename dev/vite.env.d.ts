/// <reference types="vite/client" />
/// <reference types="vite-svg-loader" />

declare module "*.md" {
  import type { ComponentOptions } from "vue";

  const Component: ComponentOptions;
  export default Component;
}