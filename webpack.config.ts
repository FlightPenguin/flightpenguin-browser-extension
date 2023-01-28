import * as path from "path";
import * as TerserPlugin from "terser-webpack-plugin";
import { Configuration, DefinePlugin, ProgressPlugin } from "webpack";
const CopyPlugin = require("copy-webpack-plugin");
const WebpackExtensionManifestPlugin = require("webpack-extension-manifest-plugin");

const TARGET_VENDOR = process.env.TARGET_VENDOR as "firefox" | "chrome";
// @ts-ignore
const VERSION = require("./package.json").version;
const baseManifestV2 = require("./src/baseManifest.v2.ts");

const defaultEntry = {
  background: "./background.js",
  "content_scripts/cheapoair": "./content_scripts/collectors/cheapoair/contentScript.ts",
  index: "./index.js",
  "content_scripts/momondo": "./content_scripts/collectors/momondo/contentScript.ts",
  "content_scripts/kiwi": "./content_scripts/collectors/kiwi/contentScript.ts",
  "content_scripts/trip": "./content_scripts/collectors/trip/contentScript.ts",
  "content_scripts/generic": "./content_scripts/generic/contentScript.ts",
  "content_scripts/flightpenguin": "./content_scripts/flightpenguin/contentScript.ts",
};

const getModuleRules = () => [
  {
    test: /\.(js|jsx|ts|tsx)$/,
    loader: "babel-loader",
  },
  {
    test: /\.css$/,
    use: ["style-loader", "css-loader"],
  },
];

const baseResolve = {
  extensions: ["*", ".js", ".jsx", ".tsx", ".ts"],
  alias: {
    components: path.resolve(__dirname, "src/components"),
    shared: path.resolve(__dirname, "src/shared"),
    sharedTypes: path.resolve(__dirname, "src/shared/types"),
  },
};

const getBrowserSpecificManifestData = () => {
  const manifestData: { [keyof: string]: any } = {
    version: VERSION,
  };
  switch (TARGET_VENDOR) {
    case "chrome":
      break;
    case "firefox":
      break;
    default:
      throw new Error(`Unknown browser ${TARGET_VENDOR}`);
  }
  return manifestData;
};

const basePlugins = [
  new ProgressPlugin({}),
  new DefinePlugin({
    "process.env.BUMBAG_ENV": JSON.stringify("not test"),
    "process.env.VERSION": JSON.stringify(VERSION),
  }),
  new CopyPlugin({
    patterns: [
      { from: "assets/icons", to: path.resolve(__dirname, "./build", TARGET_VENDOR, "icons") },
      { from: "assets/images", to: path.resolve(__dirname, "./build", TARGET_VENDOR, "images") },
      { from: "background.html", to: path.resolve(__dirname, "./build", TARGET_VENDOR) },
      { from: "index.html", to: path.resolve(__dirname, "./build", TARGET_VENDOR) },
      { from: "css", to: path.resolve(__dirname, "./build", TARGET_VENDOR, "css") },
    ],
  }),
  new WebpackExtensionManifestPlugin({
    config: { base: baseManifestV2, extend: getBrowserSpecificManifestData() },
  }),
];

const baseOutput = {
  filename: "[name].js",
  path: path.resolve(__dirname, "./build", TARGET_VENDOR),
  publicPath: "/",
  sourceMapFilename: "[file].map",
};

const baseOptimization = {};

export const development: Configuration = {
  mode: "development",
  entry: defaultEntry,
  output: baseOutput,
  plugins: [...basePlugins, new DefinePlugin({ "process.env.EXTENSION_ENV": JSON.stringify("development") })],
  resolve: baseResolve,
  resolveLoader: {
    modules: ["node_modules", path.resolve(__dirname, "loaders")],
  },
  devtool: "inline-source-map",
  module: {
    rules: getModuleRules(),
  },
  optimization: baseOptimization,
  target: "web",
  context: path.resolve(__dirname, "./src"),
};

export const production: Configuration = {
  mode: "production",
  entry: defaultEntry,
  output: baseOutput,
  plugins: [...basePlugins, new DefinePlugin({ "process.env.EXTENSION_ENV": JSON.stringify("production") })],
  resolve: baseResolve,
  resolveLoader: {
    modules: ["node_modules", path.resolve(__dirname, "loaders")],
  },
  devtool: "source-map",
  module: {
    rules: getModuleRules(),
  },
  target: "web",
  context: path.resolve(__dirname, "./src"),
  optimization: {
    minimize: true,
    minimizer: [
      // @ts-ignore
      new TerserPlugin({
        terserOptions: {
          compress: {
            drop_console: true,
          },
          format: {
            comments: false,
          },
          sourceMap: true,
        },
      }),
    ],
  },
};
