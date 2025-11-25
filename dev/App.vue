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
        <!-- @vue-generic {Combobox, "value" } -->
        <ValueChangeHost v-model="scheme" value-name="value" event-name="change" style="display: inherit;">
          <fluent-combobox :current-value="scheme" placeholder="inherit" autocomplete="both" style="min-width: 0;">
            <fluent-option>normal</fluent-option>
            <fluent-option>light</fluent-option>
            <fluent-option>dark</fluent-option>
            <fluent-option>light dark</fluent-option>
            <fluent-option>inherit</fluent-option>
            <fluent-option>initial</fluent-option>
            <fluent-option>revert</fluent-option>
            <fluent-option>revert-layer</fluent-option>
            <fluent-option>unset</fluent-option>
          </fluent-combobox>
        </ValueChangeHost>
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
import { computed, onMounted, shallowRef, watch } from "vue";
import { isDarkTheme } from "../src/theme";
import { registerColorSchemeListener } from "../src/monitor";
import { name, description, version } from "../package.json";
import type { Combobox } from "@fluentui/web-components";
import ValueChangeHost from "./components/ValueChangeHost.vue";
import SettingsCard from "./components/SettingsCard.vue";
import SettingsExpander from "./components/SettingsExpander.vue";
import SettingsGroup from "./components/SettingsGroup.vue";
import Markdown from "./components/Markdown.vue";
import ReadMe from "../README.md";
import Color20Regular from "@fluentui/svg-icons/icons/color_20_regular.svg?component";
import Info20Regular from "@fluentui/svg-icons/icons/info_20_regular.svg?component";

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
@use "github:microsoft/fluentui-blazor?branch=dev&path=/src/Core/wwwroot/css/reboot.css";
@use "highlight.js/scss/vs.scss";

@media (prefers-color-scheme: dark) {
  @include meta.load-css("highlight.js/scss/vs2015.scss");
}

:root {
  --font-monospace: "Cascadia Code NF", "Cascadia Code PL", "Cascadia Code", "Cascadia Next SC", "Cascadia Next TC", "Cascadia Next JP", Consolas, "Courier New", "Liberation Mono", SFMono-Regular, Menlo, Monaco, monospace;
}

* {
  transition: background-color 0.083s ease-in-out;
}

body {
  background: var(--neutral-fill-stealth-rest);
  padding: 0 16px 16px;
  transition: padding 0.083s ease-in-out, background-color 0.083s ease-in-out;

  @media (min-width: 640px) {
    padding: 0 32px 24px;
  }

  @media (min-width: 1007px) {
    padding: 0 64px 24px;
  }

  @media (min-width: 1372px) {
    padding: 0 128px 24px;
  }
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
:deep(fluent-select) .listbox,
:deep(fluent-combobox)::part(listbox),
:deep(fluent-combobox) .listbox {
  max-height: calc(var(--base-height-multiplier) * 30px);
}
</style>