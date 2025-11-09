import { isMatchMediaSupported, isLightDarkSupported } from "./supports.js";

/**
 * Gets whether the user has set their system preference to a dark color scheme.
 * @returns `true` if the user prefers a dark color scheme; otherwise, `false`.
 */
export function isPrefersDark() {
  return isMatchMediaSupported && matchMedia("(prefers-color-scheme: dark)").matches;
}

/**
 * Gets whether the specified element is using a dark color scheme.
 * @param element The element to check. Defaults to {@link document.documentElement}.
 * @returns `true` if the element is using a dark color scheme; otherwise, `false`.
 */
export function isDarkScheme(element: HTMLElement = document.documentElement) {
  const colorScheme = getComputedStyle(element).colorScheme;
  switch (colorScheme) {
    case "dark":
    case "dark only":
      return true;
    case "light":
    case "light only":
      return false;
    case "light dark":
      return isPrefersDark();
    default:
      const div = document.createElement("div");
      div.style.color = "light-dark(tan, red)";
      document.body.appendChild(div);
      const isDarkMode = getComputedStyle(div).color !== "rgb(210, 180, 140)"
      document.body.removeChild(div);
      return isDarkMode;
  }
}

/**
 * Gets whether the specified element is in dark mode.
 * @param element The element to check. Defaults to {@link document.documentElement}.
 * @returns `true` if the element is in dark mode; otherwise, `false`.
 */
export function isDarkTheme(element: HTMLElement = document.documentElement) {
  return isLightDarkSupported ? isDarkScheme(element) : isPrefersDark();
}