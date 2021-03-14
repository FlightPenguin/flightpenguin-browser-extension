const path = require('path');
// const HtmlWebpackPlugin = require("html-webpack-plugin");
// const CopyPlugin = require("copy-webpack-plugin");
// const baseManifest = require("./chrome/manifest.json");
// const WebpackExtensionManifestPlugin = require("webpack-extension-manifest-plugin");

module.exports = {
    entry: {
        background: './src/background.js',
        index: './src/index.js',
        searchForm: './src/searchForm.js',
        skyscanner: './src/skyscanner/contentScript.js',
        southwest: './src/southwest/contentScript.js',
        expedia: './src/expedia/contentScript.js',
    },
    output: {
      filename: '[name].bundle.js',
      path: path.resolve(__dirname, 'dist'),
    },
    resolve: {
        extensions: ["*", ".js"]
      },
    //   plugins: [
    //     new HtmlWebpackPlugin({
    //       title: "FlightPenguin",
    //       meta: {
    //         charset: "utf-8",
    //         viewport: "width=device-width, initial-scale=1, shrink-to-fit=no",
    //         "theme-color": "#000000"
    //       },
    //       manifest: "manifest.json",
    //       filename: "index.html",
    //       template: "./src/index.html",
    //       hash: true
    //     }),
    //     new CopyPlugin([
    //       {
    //         from: "src/icons",
    //         to: "icons"
    //       }
    //     ]),
    //     new WebpackExtensionManifestPlugin({
    //       config: {
    //         base: baseManifest
    //       }
    //     })
    //   ],
      module: {
        rules: [
          {
            test: /\.js$/,
            exclude: /node_modules/,
            use: ["babel-loader"]
          },
          {
            test: /\.css$/,
            use: ["style-loader", "css-loader"]
          },
          {
            test: /\.(png|svg|jpg|gif)$/,
            use: ["file-loader"]
          }
        ]
      }
  };