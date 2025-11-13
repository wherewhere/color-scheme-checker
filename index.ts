import {
  isPrefersDark,
  isDarkScheme,
  isDarkTheme
} from "./src/theme";
import {
  registerColorSchemeListener,
  unregisterColorSchemeListener,
  ColorSchemeObserver,
  ColorSchemeOptions,
  ColorSchemeCallback
} from "./src/monitor";

export {
  isPrefersDark,
  isDarkScheme,
  isDarkTheme,
  registerColorSchemeListener,
  unregisterColorSchemeListener,
  ColorSchemeObserver
};
export type {
  ColorSchemeOptions,
  ColorSchemeCallback
};