<template>
  <div class="stack-vertical" ref="root">
    <h1 id="title">Color Scheme Checker</h1>
    <SettingsGroup>
      <template #header>
        <h2 id="tests" class="unset">Tests</h2>
      </template>
      <SettingsCard>
        <template #icon>
          <Color20Regular />
        </template>
        <template #header>
          <h3 id="tests-theme" class="unset">Set Theme</h3>
        </template>
        <template #description>
          {{ message }}
        </template>
        <ComboBox placeholder="inherit" style="min-width: 0;" v-model="scheme">
          <fluent-option value="normal">normal</fluent-option>
          <fluent-option value="light">light</fluent-option>
          <fluent-option value="dark">dark</fluent-option>
          <fluent-option value="light dark">light dark</fluent-option>
          <fluent-option value="inherit">inherit</fluent-option>
          <fluent-option value="initial">initial</fluent-option>
          <fluent-option value="revert">revert</fluent-option>
          <fluent-option value="revert-layer">revert-layer</fluent-option>
          <fluent-option value="unset">unset</fluent-option>
        </ComboBox>
      </SettingsCard>
    </SettingsGroup>
    <SettingsGroup>
      <template #header>
        <h2 id="about" class="unset">About</h2>
      </template>
      <SettingsExpander>
        <template #icon>
          <Info20Regular />
        </template>
        <template #header>
          <h3 id="about-about" class="unset">{{ name }} v{{ version }}</h3>
        </template>
        <template #description>
          {{ description }}
        </template>
        <Markdown class="setting-expander-content-grid" style="overflow-y: auto;">
          <ReadMe />
        </Markdown>
      </SettingsExpander>
    </SettingsGroup>
  </div>
</template>

<script lang="ts" setup>
import "./types";
import "@fluentui/web-components/option/define.js";
import { computed, onMounted, shallowRef, watch } from "vue";
import { useSeoMeta } from "@unhead/vue";
import { useAnalytics } from "./helpers/analytics";
import { isDarkTheme } from "../src/theme";
import { registerColorSchemeListener } from "../src/monitor";
import { name, description, keywords, version } from "../package.json";
import ComboBox from "./components/ComboBox.vue";
import SettingsCard from "./components/SettingsCard.vue";
import SettingsExpander from "./components/SettingsExpander.vue";
import SettingsGroup from "./components/SettingsGroup.vue";
import Markdown from "./components/Markdown.vue";
import ReadMe from "../README.md";
import Color20Regular from "@fluentui/svg-icons/icons/color_20_regular.svg?component";
import Info20Regular from "@fluentui/svg-icons/icons/info_20_regular.svg?component";

const author = "wherewhere";
useSeoMeta({
  // Basic SEO
  title: name,
  description,
  author: author,

  // Open Graph
  ogTitle: name,
  ogDescription: description,
  ogType: "website",
  ogLocale: "en_US",
  ogSiteName: name,

  // Twitter
  twitterCard: "summary",
  twitterSite: "@wherewhere7",

  // Product specific (structured data will be generated)
  articleAuthor: [author],
  articleTag: keywords
});
useAnalytics();

const isDark = shallowRef(false);
const scheme = shallowRef<string>();
const message = computed(() => `Is dark theme: ${isDark.value}`);

watch(
  scheme,
  () => document.documentElement.style.colorScheme = scheme.value!
);

const root = shallowRef<HTMLElement>();
onMounted(() => {
  isDark.value = isDarkTheme(root.value);
  registerColorSchemeListener(x => isDark.value = x, root.value);
  scheme.value = getComputedStyle(document.documentElement).colorScheme;
});
</script>

<style lang="scss">
@use "sass:meta";
@use "github:microsoft/fluentui-blazor?branch=dev-v5&path=/src/Core/wwwroot/css/reboot.css";
@use "highlight.js/scss/vs.scss";

@media (prefers-color-scheme: dark) {
  @include meta.load-css("highlight.js/scss/vs2015.scss");
}

:root {
  --font-monospace: "Cascadia Code NF", "Cascadia Code PL", "Cascadia Code", "Cascadia Next SC", "Cascadia Next TC", "Cascadia Next JP", Consolas, "Courier New", "Liberation Mono", SFMono-Regular, Menlo, Monaco, monospace;
}

body {
  transition-duration: var(--durationFaster);
  transition-property: background, border, color, padding;
  transition-timing-function: var(--curveEasyEase);
}
</style>

<style scoped>
#title {
  margin: 24px 0;
  font-size: 28px;
  font-weight: 600;
  line-height: 1.34;
}

:deep(.stack-vertical) {
  display: flex;
  flex-direction: column;
}

:deep(.stack-horizontal) {
  display: flex;
  flex-direction: row;
}

:deep(h6.unset),
:deep(h5.unset),
:deep(h4.unset),
:deep(h3.unset),
:deep(h2.unset),
:deep(h1.unset) {
  margin-top: 0;
  margin-bottom: 0;
  font-weight: inherit;
  font-family: inherit;
  font-size: inherit;
  line-height: inherit;
}

:deep(fluent-select)::part(listbox),
:deep(fluent-combobox)::part(listbox) {
  max-height: calc(var(--base-height-multiplier) * 30px);
}
</style>