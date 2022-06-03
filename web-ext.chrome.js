module.exports = {
  sourceDir: "./build/chrome",
  artifactsDir: "./dist/chrome",
  verbose: true,
  run: {
    target: ["chromium"],
    startUrl: ["chrome://extensions/"],
  },
  build: {
    overwriteDest: true,
  },
};
