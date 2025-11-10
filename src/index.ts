import {
  isPrefersDark,
  isDarkScheme,
  isDarkTheme
} from "./theme";
import {
  registerColorSchemeListener,
  unregisterColorSchemeListener,
  ColorSchemeObserver,
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
export type { ColorSchemeCallback };