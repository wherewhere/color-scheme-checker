<template>
  <SettingsGroup>
    <template #header>
      <h2 class="unset">Global</h2>
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
      <fluent-text-field title="color-scheme" type="text" v-model="scheme" />
    </SettingsCard>
  </SettingsGroup>
</template>

<script lang="ts">
import { isDarkTheme, registerColorSchemeListener } from "../src/index";
import SettingsCard from "./components/SettingsCard.vue";
import SettingsGroup from "./components/SettingsGroup.vue";
import Color20Regular from "@fluentui/svg-icons/icons/color_20_regular.svg?component";
export default {
  name: "App",
  components: {
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
    this.isDark = isDarkTheme();
    registerColorSchemeListener(isDark => this.isDark = isDark);
    document.documentElement.style.colorScheme = this.scheme;
  }
};
</script>

<style>
body,
.body {
  background: var(--neutral-fill-stealth-rest);
  padding: 0 16px 16px;
}
</style>

<style scoped>
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
</style>