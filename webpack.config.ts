import * as path from "path";
import * as TerserPlugin from "terser-webpack-plugin";
import { Configuration, DefinePlugin, ProgressPlugin } from "webpack";
const EnvkeyWebpackPlugin = require("envkey-webpack-plugin");

const defaultEntry = {
  background: "./src/background.js",
  cheapoair: "./src/cheapoair/contentScript.ts",
  index: "./src/index.js",
  southwest: "./src/southwest/contentScript.ts",
  southwestEmpty: "./src/southwest/emptyResultsContentScript.ts",
  expedia: "./src/expedia/contentScript.js",
  kiwi: "./src/kiwi/contentScript.ts",
  trip: "./src/trip/contentScript.ts",
  generic: "./src/generic/contentScript.ts",
  flightpenguin: "./src/flightpenguin/contentScript.ts",
};

const getModuleRules = ({ mode }: { mode: "production" | "development" }) => [
  {
    test: /\.(js|jsx|ts|tsx)$/,
    loader: "babel-loader",
    exclude: /node_modules\/(?!bumbag)/,
  },
  {
    test: /\.css$/,
    use: ["style-loader", "css-loader"],
  },
  {
    test: /\.(png|svg|jpg|gif)$/,
    use: ["file-loader"],
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
    "process.env.VERSION": JSON.stringify("1.15.7"),
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
];

const baseOutput = {
  filename: "[name].bundle.js",
  path: path.resolve(__dirname, "dist"),
  sourceMapFilename: "[file].map",
};

const baseOptimization = {};

export const development: Configuration = {
  mode: "development",
  entry: {
    ...defaultEntry,
  },
  output: baseOutput,
  plugins: [...basePlugins, new DefinePlugin({ "process.env.EXTENSION_ENV": JSON.stringify("development") })],
  resolve: baseResolve,
  devtool: "inline-source-map",
  module: {
    rules: getModuleRules({ mode: "development" }),
  },
  optimization: baseOptimization,
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
