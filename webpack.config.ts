import * as path from "path";
import * as TerserPlugin from "terser-webpack-plugin";
import { Configuration, DefinePlugin, ProgressPlugin } from "webpack";
const EnvkeyWebpackPlugin = require("envkey-webpack-plugin");
const CopyPlugin = require("copy-webpack-plugin");

const TARGET_VENDOR = process.env.TARGET_VENDOR as "firefox" | "chrome";
const VERSION = require("./package.json").version;

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

const getModuleRules = ({ mode }: { mode: "production" | "development" }) => [
  // {
  //   type: "asset/resource",
  //   test: /manifest\.json$/,
  //   generator: {
  //     filename: "[name][ext]",
  //   },
  //   use: [
  //     "extract-loader",
  //     {
  //       loader: "webextension-manifest-loader",
  //       options: {
  //         targetVendor: TARGET_VENDOR,
  //         merge: {
  //           version,
  //           ...(TARGET_VENDOR === "chrome" ? { version_name: version } : {}),
  //         },
  //       },
  //     },
  //   ],
  // },
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
      { from: "manifest.json", to: path.resolve(__dirname, "./build", TARGET_VENDOR) },
    ],
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
    rules: getModuleRules({ mode: "development" }),
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
    rules: getModuleRules({ mode: "production" }),
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
