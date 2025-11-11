import {
  isPrefersDark,
  isDarkScheme,
  isDarkTheme
} from "./theme";
import {
  registerColorSchemeListener,
  unregisterColorSchemeListener,
  ColorSchemeObserver,
  ColorSchemeOptions,
  ColorSchemeCallback
} from "./monitor";

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