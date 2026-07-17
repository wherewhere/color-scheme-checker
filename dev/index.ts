import { setTheme } from "@fluentui/web-components";
import { webDarkTheme, webLightTheme } from "@fluentui/tokens";

function applyTheme(isDark: boolean) {
  setTheme(isDark ? webDarkTheme : webLightTheme);
}

import { isDarkTheme } from "../src/theme";
import { registerColorSchemeListener } from "../src/monitor";

applyTheme(isDarkTheme());
registerColorSchemeListener(applyTheme);

import { createApp } from "vue";
import { createHead } from "@unhead/vue/client";
import App from "./App.vue";

createApp(App).use(createHead()).mount("#vue-app");