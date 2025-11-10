import {
  provideFluentDesignSystem,
  fluentCombobox,
  fluentOption,
  baseLayerLuminance,
  StandardLuminance
} from "@fluentui/web-components";

provideFluentDesignSystem()
  .register(
    fluentCombobox(),
    fluentOption()
  );

import { isDarkTheme, registerColorSchemeListener } from "../src/index";

function applyTheme(isDark: boolean) {
  baseLayerLuminance.withDefault(isDark ? StandardLuminance.DarkMode : StandardLuminance.LightMode);
}
applyTheme(isDarkTheme());
registerColorSchemeListener(applyTheme);

import { createApp } from "vue"
import App from "./App.vue"

createApp(App).mount("#vue-app")
