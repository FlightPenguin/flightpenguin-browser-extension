module.exports = {
  sourceDir: "./build/chrome",
  artifactsDir: "./dist/chrome",
  verbose: true,
  run: {
    target: ["chromium"],
    startUrl: ["chrome://extensions/", "chrome://inspect/#extensions"],
  },
  build: {
    overwriteDest: true,
  },
};
