import * as path from "path";
import * as TerserPlugin from "terser-webpack-plugin";
import { Configuration, DefinePlugin, ProgressPlugin } from "webpack";
import VERSION = chrome.cast.VERSION;
const EnvkeyWebpackPlugin = require("envkey-webpack-plugin");
const CopyPlugin = require("copy-webpack-plugin");
const WebpackExtensionManifestPlugin = require("webpack-extension-manifest-plugin");

const TARGET_VENDOR = process.env.TARGET_VENDOR as "firefox" | "chrome";
const VERSION = require("./package.json").version;
const baseManifestV2 = require("./src/baseManifest.v2.ts");

const defaultEntry = {
  // manifest: "./manifest.json",
  background: "./background.js",
  "content_scripts/cheapoair": "./cheapoair/contentScript.ts",
  index: "./index.js",
  "content_scripts/momondo": "./momondo/contentScript.ts",
  "content_scripts/kiwi": "./kiwi/contentScript.ts",
  "content_scripts/trip": "./trip/contentScript.ts",
  "content_scripts/generic": "./collectors/generic/contentScript.ts",
  "content_scripts/flightpenguin": "./flightpenguin/contentScript.ts",
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
      manifestData["oauth2"] = {
        client_id: "82466302556-jujsfqptcild0kjidp1tspr9pghdva92.apps.googleusercontent.com",
        scopes: ["https://www.googleapis.com/auth/plus.login", "email"],
      };
      manifestData["key"] =
        "MIIBIjANBgkqhkiG9w0B" +
        "AQEFAAOCAQ8AMIIBCgKC" +
        "AQEArDtt/DK1/yBIYUu7" +
        "ZR99hwrIRFcQ0vNxo4Nj" +
        "68vAgYniaNaKas5nbmcy" +
        "W5gmadkz7fJ5EfiMmDa4" +
        "ZMl4iYsIdeCW32OGczxo" +
        "AIGqK27lI9jRG/sgaFa8" +
        "Mm0p926f/D2TPYmZya2f" +
        "vLn+yvu5sWqWHWhTKbYA" +
        "cFUQk1L179NYeTGhN6T6" +
        "DGIemXrSulpExmvcgMIO" +
        "svazLAzbI4QdSdUWbMQS" +
        "L4DEhfD3rpO3CaTkmH0D" +
        "cwrphI8dGPwsVYK1YZUJ" +
        "sJ2ccSjn3m2H8U55/Iw4" +
        "v+sS4JrxMnxabrY+g9lI" +
        "bXe8iDLMSjrV9HNIamy2" +
        "FMKj9EQBuDOJ9J/qGVt3" +
        "RuRaRwIDAQAB";
      console.log(manifestData);
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
  new EnvkeyWebpackPlugin({
    permitted: [
      "FIREBASE_API_KEY",
      "FIREBASE_MEASUREMENT_ID",
      "FIREBASE_PROJECT_ID",
      "FIREBASE_PROJECT_NUMBER",
      "GOOGLE_ANALYTICS_TRACKING_ID",
      "SENTRY_DSN",
      "SENTRY_PROJECT",
    ],
    dotEnvFile: ".env",
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
  entry: { ...defaultEntry },
  output: baseOutput,
  devtool: "source-map",
  plugins: [...basePlugins, new DefinePlugin({ "process.env.EXTENSION_ENV": JSON.stringify("production") })],
  module: {
    rules: getModuleRules(),
  },
  resolve: baseResolve,
  resolveLoader: {
    modules: ["node_modules", path.resolve(__dirname, "loaders")],
  },
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
