// rollup.config.mjs
import resolve from "@rollup/plugin-node-resolve";
import babel from "@rollup/plugin-babel";
import dts from "rollup-plugin-dts";

const resolveConfig = resolve({
  extensions: [".js", ".ts"]
});

const babelESConfig = babel({
    extensions: [".ts"],
    targets: "defaults",
    babelHelpers: "bundled"
});

const babelESFallbackConfig = babel({
  extensions: [".js", ".ts"],
  targets: "supports es6-module",
  babelHelpers: "bundled"
});

const babelUMDFallbackConfig = babel({
  extensions: [".js", ".ts"],
  targets: "supports matchmedia",
  babelHelpers: "bundled"
});

const dtsConfig = dts();

const esPlugin = [resolveConfig, babelESConfig];
const esFallbackPlugin = [resolveConfig, babelESFallbackConfig];
const umdFallbackPlugin = [resolveConfig, babelUMDFallbackConfig];
const dtsPlugin = [dtsConfig];

/**
 * @param {string} fileName
 * @returns {import("rollup").RollupOptions}
 */
function getESConfig(fileName) {
  return {
    external: ["style-observer"],
    input: `${fileName}.ts`,
    output: {
      file: `dist/${fileName}.esm.js`,
      format: "es",
      sourcemap: true
    },
    plugins: esPlugin
  };
}

/**
 * @param {string} fileName
 * @returns {import("rollup").RollupOptions}
 */
function getESBrowserConfig(fileName) {
  return {
    input: `${fileName}.ts`,
    output: {
      file: `dist/${fileName}.esm.browser.js`,
      format: "es",
      sourcemap: true
    },
    plugins: esFallbackPlugin
  };
}

/**
 * @param {string} fileName
 * @param {string} name
 * @returns {import("rollup").RollupOptions}
 */
function getUMDConfig(fileName, name) {
  return {
    input: `${fileName}.ts`,
    output: {
      file: `dist/${fileName}.global.js`,
      format: "umd",
      name,
      sourcemap: true
    },
    plugins: umdFallbackPlugin
  };
}

/**
 * @param {string} fileName
 * @returns {import("rollup").RollupOptions}
 */
function getDTSConfig(fileName) {
  return {
    input: `${fileName}.ts`,
    output: {
      file: `dist/${fileName}.esm.d.ts`,
      format: "es"
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
        yield getESBrowserConfig(fileName);
        break;
      case "umd":
        yield getUMDConfig(fileName, name);
        break;
      case "dts":
        yield getDTSConfig(fileName);
        break;
    }
  }
}

export default [
  ...getJSConfigs("index", "colorSchemeChecker", ["es", "umd", "dts"])
];