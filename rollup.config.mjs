// rollup.config.mjs
import resolve from "@rollup/plugin-node-resolve";
import babel from "@rollup/plugin-babel";
import dts from "rollup-plugin-dts";

const resolveConfig = resolve({
    extensions: [".ts"]
});

const babelESFallbackConfig = babel({
    extensions: [".ts"],
    targets: "supports es6-module",
    babelHelpers: "bundled"
});

const babelIIFEFallbackConfig = babel({
    extensions: [".ts"],
    targets: "supports matchMedia",
    babelHelpers: "bundled"
});

const dtsConfig = dts();

const esFallbackPlugin = [resolveConfig, babelESFallbackConfig];
const iifeFallbackPlugin = [resolveConfig, babelIIFEFallbackConfig];
const dtsPlugin = [dtsConfig];

/**
 * @param {string} fileName
 * @returns {import("rollup").RollupOptions}
 */
function getESConfig(fileName) {
    return {
        input: `src/${fileName}.ts`,
        output: {
            sourcemap: true,
            format: "es",
            file: `dist/${fileName}.esm.js`
        },
        plugins: esFallbackPlugin
    };
}

/**
 * @param {string} fileName
 * @param {string} name
 * @returns {import("rollup").RollupOptions}
 */
function getIIFEConfig(fileName, name) {
    return {
        input: `src/${fileName}.ts`,
        output: {
            sourcemap: true,
            format: "iife",
            file: `dist/${fileName}.js`,
            name
        },
        plugins: iifeFallbackPlugin
    };
}

/**
 * @param {string} fileName
 * @returns {import("rollup").RollupOptions}
 */
function getDTSConfig(fileName) {
    return {
        input: `src/${fileName}.ts`,
        output: {
            format: "es",
            file: `dist/${fileName}.d.ts`,
        },
        plugins: dtsPlugin
    };
}

/**
 * @param {string} fileName
 * @param {string} name
 * @param {import("rollup").ModuleFormat[]} types
 */
function* getJSConfigs(fileName, name, types) {
    for (const type of types) {
        switch (type) {
            case "es":
                yield getESConfig(fileName);
                break;
            case "iife":
                yield getIIFEConfig(fileName, name);
                break;
            case "dts":
                yield getDTSConfig(fileName);
                break;
        }
    }
}

export default [
    ...getJSConfigs("index", "colorSchemeChecker", ["es", "iife", "dts"])
];