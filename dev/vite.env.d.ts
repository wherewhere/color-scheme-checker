/// <reference types="vite/client" />
/// <reference types="vite-svg-loader" />

declare module "*.md" {
  import type { defineComponent, ComponentObjectPropsOptions, HTMLAttributes } from "vue";
  const frontmatter: { [key: string]: string | typeof frontmatter };
  const component: ReturnType<typeof defineComponent<HTMLAttributes, ComponentObjectPropsOptions, string, {}, {}, string, { frontmatter: typeof frontmatter }>>;
  export default component;
}