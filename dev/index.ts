import {
  provideFluentDesignSystem,
  fluentAccordion,
  fluentAccordionItem,
  fluentCombobox,
  fluentOption,
  baseLayerLuminance,
  StandardLuminance
} from "@fluentui/web-components";

provideFluentDesignSystem()
  .register(
    fluentAccordion(),
    fluentAccordionItem(),
    fluentCombobox(),
    fluentOption()
  );

import { isDarkTheme } from "../src/theme";
import { registerColorSchemeListener } from "../src/monitor";

function applyTheme(isDark: boolean) {
  baseLayerLuminance.withDefault(isDark ? StandardLuminance.DarkMode : StandardLuminance.LightMode);
}
applyTheme(isDarkTheme());
registerColorSchemeListener(applyTheme);

import { createApp } from "vue"
import App from "./App.vue"

createApp(App).mount("#vue-app")
