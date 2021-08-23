const path = require("path");
const TerserPlugin = require("terser-webpack-plugin");
const webpack = require("webpack");

module.exports = {
  mode: "production",
  entry: {
    background: "./src/background.js",
    index: "./src/index.js",
    searchForm: "./src/searchForm.js",
    skyscanner: "./src/skyscanner/contentScript.js",
    southwest: "./src/southwest/contentScript.js",
    expedia: "./src/expedia/contentScript.js",
    skiplagged: "./src/skiplagged/contentScript.ts",
  },
  output: {
    filename: "[name].bundle.js",
    path: path.resolve(__dirname, "dist"),
  },
  plugins: [
    // fix "process is not defined" error:
    // (do "npm install process" before running the build)
    new webpack.DefinePlugin({
      "process.env.BUMBAG_ENV": JSON.stringify("not test"),
    }),
  ],
  resolve: {
    extensions: ["*", ".js", ".jsx", ".tsx", ".ts"],
  },
  optimization: {
    minimize: true,
    minimizer: [
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
  module: {
    rules: [
      {
        test: /\.(js|jsx|ts|tsx)$/,
        exclude: /node_modules/,
        use: ["babel-loader"],
      },
      {
        test: /\.css$/,
        use: ["style-loader", "css-loader"],
      },
      {
        test: /\.(png|svg|jpg|gif)$/,
        use: ["file-loader"],
      },
    ],
  },
};
