import { isMatchMediaSupported, isLightDarkSupported } from "./supports.js";
import { isDarkScheme } from "./theme";

/**
 * Registers a listener for changes in the color scheme of the specified element.
 * @param callback The callback to invoke when the color scheme changes.
 * @param element The element to check. Defaults to {@link document.documentElement}.
 */
export function registerColorSchemeListener(callback: (/** `true` if the element is in dark mode; otherwise, `false`. */ isDark: boolean) => void, element: HTMLElement = document.documentElement) {
    if (isLightDarkSupported) {
        const observer = new MutationObserver(mutations => {
            for (let i = 0; i < mutations.length; i++) {
                const mutation = mutations[i];
                if (mutation.type === "attributes" && mutation.attributeName === "style" && mutation.target instanceof HTMLElement) {
                    callback(isDarkScheme(mutation.target));
                }
            }
        });
        observer.observe(element, {
            attributes: true,
            attributeFilter: ["style"]
        });
    }
    else if (isMatchMediaSupported) {
        const scheme = matchMedia("(prefers-color-scheme: dark)");
        if (scheme && scheme.media !== "not all") {
            scheme.addListener(e => callback(e.matches));
        }
    }
}