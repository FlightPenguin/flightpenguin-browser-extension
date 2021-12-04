import * as path from "path";
import * as TerserPlugin from "terser-webpack-plugin";
import { Configuration, DefinePlugin, ProgressPlugin } from "webpack";

const defaultEntry = {
  background: "./src/background.js",
  index: "./src/index.js",
  skyscanner: "./src/skyscanner/contentScript.js",
  southwest: "./src/southwest/contentScript.ts",
  southwestEmpty: "./src/southwest/emptyResultsContentScript.ts",
  expedia: "./src/expedia/contentScript.js",
  kiwi: "./src/kiwi/contentScript.ts",
  generic: "./src/generic/contentScript.ts",
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
    "process.env.VERSION": "1.8.4",
  }),
];

const baseOutput = {
  filename: "[name].bundle.js",
  path: path.resolve(__dirname, "dist"),
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
  devtool: false,
  module: {
    rules: getModuleRules({ mode: "development" }),
  },
  optimization: baseOptimization,
};

export const production: Configuration = {
  mode: "production",
  entry: { ...defaultEntry },
  output: baseOutput,
  devtool: false,
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
        },
      }),
    ],
  },
};
