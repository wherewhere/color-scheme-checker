import { isMatchMediaSupported, isLightDarkSupported } from "./supports.js";
import { isDarkScheme } from "./theme";

import StyleObserver from "style-observer";

/** The options for the style observer. */
export type ColorSchemeOptions = {
  /** Whether to check the color scheme changes. Default is `true` if the browser supports `light-dark` feature; otherwise, `false`. */
  checkColorScheme: boolean;
}

/** The callback for color scheme changes. */
export type ColorSchemeCallback = (/** `true` if the element is in dark mode; otherwise, `false`. */ isDark: boolean) => void;

/** Observes changes in the color scheme of an element. */
export class ColorSchemeObserver {
  /** @type {boolean} */
  private readonly checkColorScheme: boolean;
  /** @type {ColorSchemeCallback[]} */
  private readonly callbacks: ColorSchemeCallback[] = [];
  /** @type {boolean | undefined} */
  private pervious: boolean | undefined;

  /** 
   * The style observer for detecting color scheme changes.
   * @remarks `undefined` if {@link ColorSchemeOptions.checkColorScheme} is `false`.
   */
  public readonly observer: StyleObserver | undefined;

  /** 
   * The media query list for detecting prefers-color-scheme changes.
   * @remarks `undefined` if the browser not supports `matchMedia`.
   */
  public readonly scheme: MediaQueryList | undefined;

  /** The element being observed. */
  public element: HTMLElement;

  /**
   * Initializes a new instance of the {@link ColorSchemeObserver} class.
   * @param element The element to observe. Defaults to {@link document.documentElement}.
   * @param options The options for the style observer.
   */
  public constructor(element: HTMLElement = document.documentElement, options: ColorSchemeOptions = { checkColorScheme: isLightDarkSupported }) {
    this.element = element;
    this.checkColorScheme = options.checkColorScheme;
    if (this.checkColorScheme) {
      this.observer = new StyleObserver(mutations => {
        for (let i = 0; i < mutations.length; i++) {
          const mutation = mutations[i];
          if (mutation.target instanceof HTMLElement) {
            const isDark = isDarkScheme(mutation.target);
            if (this.pervious !== isDark) {
              this.pervious = isDark;
              this.onColorSchemeChange(isDark);
            }
          }
        }
      });
      this.observer.observe(element, "color-scheme");
    }
    if (isMatchMediaSupported) {
      this.scheme = matchMedia("(prefers-color-scheme: dark)");
      if (this.scheme && this.scheme.media !== "not all") {
        this.scheme.addListener(this.onListenner);
      }
    }
  }

  /** Gets whether there are no registered callbacks. */
  public get isEmpty() {
    return !this.callbacks.length;
  }

  /**
   * Registers a callback for color scheme changes.
   * @param callback The callback to register.
   */
  public registerCallback(callback: ColorSchemeCallback) {
    this.callbacks.push(callback);
  }

  /**
   * Unregisters a callback for color scheme changes.
   * @param callback The callback to unregister.
   */
  public unregisterCallback(callback: ColorSchemeCallback) {
    const index = this.callbacks.indexOf(callback);
    if (index !== -1) {
      this.callbacks.splice(index, 1);
    }
  }

  /**
   * Gets whether the specified element is in dark mode.
   * @param {boolean} isPrefersDark `true` if the prefers-color-scheme is dark; otherwise, `false`.
   * @param {HTMLElement} element The element to check. Defaults to {@link document.documentElement}.
   * @returns {boolean} `true` if the element is in dark mode; otherwise, `false`.
   */
  private isDarkTheme(isPrefersDark: boolean, element: HTMLElement = document.documentElement): boolean {
    return this.checkColorScheme ? isDarkScheme(element) : isPrefersDark;
  }

  /**
   * Handles media query list events.
   * @param {MediaQueryListEvent} ev The media query list event.
   */
  private onListenner = (ev: MediaQueryListEvent) => {
    const isDark = this.isDarkTheme(ev.matches, this.element);
    if (this.pervious !== isDark) {
      this.pervious = isDark;
      this.onColorSchemeChange(isDark);
    }
  }

  /**
   * Notifies registered callbacks of color scheme changes.
   * @param {boolean} isDark `true` if the element is in dark mode; otherwise, `false`.
   */
  private onColorSchemeChange(isDark: boolean) {
    for (let i = 0; i < this.callbacks.length; i++) {
      this.callbacks[i](isDark);
    }
  }

  /**
   * Clears all registered callbacks.
   */
  public clear() {
    this.callbacks.length = 0;
  }

  /**
   * Disposes the observer.
   */
  public dispose() {
    if (this.observer) {
      this.observer.unobserve();
    }
    if (this.scheme) {
      this.scheme.removeListener(this.onListenner);
    }
  }
}

/** The map of observed elements to their observers. */
const observers = new WeakMap<HTMLElement, ColorSchemeObserver>();

/**
 * Registers a listener for changes in the color scheme of the specified element.
 * @param callback The callback to invoke when the color scheme changes.
 * @param element The element to check. Defaults to {@link document.documentElement}.
 */
export function registerColorSchemeListener(callback: ColorSchemeCallback, element: HTMLElement = document.documentElement) {
  let observer = observers.get(element);
  if (observer) {
    observer.registerCallback(callback);
  }
  else {
    observer = new ColorSchemeObserver(element);
    observer.registerCallback(callback);
    observers.set(element, observer);
  }
}

/**
 * Unregisters a listener for changes in the color scheme of the specified element.
 * @param callback The callback to remove.
 * @param element The element to check. Defaults to {@link document.documentElement}.
 */
export function unregisterColorSchemeListener(callback: ColorSchemeCallback, element: HTMLElement = document.documentElement) {
  const observer = observers.get(element);
  if (observer) {
    observer.unregisterCallback(callback);
    if (observer.isEmpty) {
      observer.dispose();
      observers.delete(element);
    }
  }
}