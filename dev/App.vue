<template>
  <div class="stack-vertical" ref="root">
    <h1 id="title">Color Scheme Checker</h1>
    <SettingsGroup>
      <template #header>
        <h2 class="unset">Tests</h2>
      </template>
      <SettingsCard>
        <template #icon>
          <Color20Regular />
        </template>
        <template #header>
          <h3 class="unset">Set Theme</h3>
        </template>
        <template #description>
          {{ message }}
        </template>
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
  </div>
</template>

<script lang="ts">
import type _ from "vite-svg-loader";
import { isDarkTheme, registerColorSchemeListener } from "../src/index";
import ValueChangeHost from "./components/ValueChangeHost.vue";
import SettingsCard from "./components/SettingsCard.vue";
import SettingsGroup from "./components/SettingsGroup.vue";
import Color20Regular from "@fluentui/svg-icons/icons/color_20_regular.svg?component";

export default {
  name: "App",
  components: {
    ValueChangeHost,
    SettingsCard,
    SettingsGroup,
    Color20Regular
  },
  data() {
    return {
      isDark: false,
      scheme: "light dark"
    }
  },
  computed: {
    message() {
      return `Is dark theme: ${this.isDark}`;
    }
  },
  watch: {
    scheme(newValue: string) {
      document.documentElement.style.colorScheme = newValue;
    }
  },
  mounted() {
    const root = this.$refs.root as HTMLElement;
    this.isDark = isDarkTheme(root);
    registerColorSchemeListener(isDark => this.isDark = isDark, root);
    document.documentElement.style.colorScheme = this.scheme;
  }
};
</script>

<style>
@import 'https://cdn.jsdelivr.net/gh/microsoft/fluentui-blazor@dev/src/Core/wwwroot/css/reboot.css';

* {
  transition: background-color 0.083s ease-in-out;
}

body {
  background: var(--neutral-fill-stealth-rest);
  padding: 0 16px 16px;
  transition: padding 0.083s ease-in-out, background-color 0.083s ease-in-out;
}

@media (min-width: 640px) {
  body {
    padding: 0 32px 24px;
  }
}

@media (min-width: 1007px) {
  body {
    padding: 0 64px 24px;
  }
}

@media (min-width: 1372px) {
  body {
    padding: 0 128px 24px;
  }
}
</style>

<style scoped>
:deep(#title) {
  margin: 24px 0;
  font-size: 28px;
  font-weight: 600;
  line-height: 1.34;
}

:deep(.stack-vertical) {
  display: flex;
  flex-direction: column;
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

:deep(fluent-select::part(listbox)),
:deep(fluent-select .listbox),
:deep(fluent-combobox::part(listbox)),
:deep(fluent-combobox .listbox) {
  max-height: calc(var(--base-height-multiplier) * 30px);
}
</style>