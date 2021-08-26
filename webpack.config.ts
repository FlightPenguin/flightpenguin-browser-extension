import * as path from "path";
import * as TerserPlugin from "terser-webpack-plugin";
import { Configuration, DefinePlugin, ProgressPlugin } from "webpack";

const defaultEntry = {
  background: "./src/background.js",
  index: "./src/index.js",
  searchForm: "./src/searchForm.js",
  skyscanner: "./src/skyscanner/contentScript.js",
  southwest: "./src/southwest/contentScript.js",
  expedia: "./src/expedia/contentScript.js",
  skiplagged: "./src/skiplagged/contentScript.ts",
};

const getModuleRules = ({ mode }: { mode: "production" | "development" }) => [
  {
    test: /\.(js|jsx|ts|tsx)$/,
    loader: "babel-loader",
    exclude: /node_modules/,
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
  },
};

const basePlugins = [
  new ProgressPlugin({}),
  new DefinePlugin({
    "process.env.BUMBAG_ENV": JSON.stringify("not test"),
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
  plugins: basePlugins,
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
  plugins: [...basePlugins],
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
