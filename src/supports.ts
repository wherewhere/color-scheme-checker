/** Gets is {@link window.matchMedia} supported. */
export const isMatchMediaSupported: boolean = !!window.matchMedia;
/** Gets is {@link window.CSS.supports} supported. */
export const isCSSSupportSupported: boolean = !!window.CSS?.supports;
/** Gets is `light-dark` supported. */
export const isLightDarkSupported = isCSSSupportSupported && window.CSS.supports("color", "light-dark(tan, red)");