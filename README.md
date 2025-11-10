| Issues | License |  NPM  |
|--------|---------|-------|
[![Github Issues](https://img.shields.io/github/issues/wherewhere/color-scheme-checker)](https://github.com/wherewhere/color-scheme-checker/issues)|[![License](https://img.shields.io/github/license/wherewhere/color-scheme-checker)](https://github.com/wherewhere/color-scheme-checker/blob/main/LICENSE)|[![NPM Status](https://img.shields.io/npm/dt/color-scheme-checker.svg?style=flat)](https://www.npmjs.com/package/color-scheme-checker)

# color-scheme-checker

Check or monitor the color-scheme of html element

[![NPM](https://nodei.co/npm/color-scheme-checker.png)](https://www.npmjs.com/package/color-scheme-checker)

## Install

```sh
npm i color-scheme-checker
```

## Usage

### Check Theme
```ts
import { isPrefersDark, isDarkScheme, isDarkTheme } from "color-scheme-checker";
// Check if the user prefers dark mode
const prefersDark = isPrefersDark();
// Check if the current color scheme of the element is dark
const element = document.getElementById("my-element");
const darkScheme = isDarkScheme(element);
// Check if the current theme of the element is dark
const darkTheme = isDarkTheme(element);
```

### Monitor Theme Changes
```ts
import { registerColorSchemeListener, unregisterColorSchemeListener } from "color-scheme-checker";
// Define a callback function to handle color scheme changes
function colorSchemeChangeHandler(isDark: boolean) {
  console.log(`The color scheme is now ${isDark ? "dark" : "light"}.`);
}
// Register the listener for a specific element
const element = document.getElementById("my-element");
registerColorSchemeListener(colorSchemeChangeHandler, element);
// To unregister the listener when it's no longer needed
unregisterColorSchemeListener(colorSchemeChangeHandler, element);
```

## References
- [style-observer](https://github.com/LeaVerou/style-observer "style-observer")

## Contributors
[![Contributors](https://contrib.rocks/image?repo=wherewhere/color-scheme-checker)](https://github.com/wherewhere/color-scheme-checker/graphs/contributors)
