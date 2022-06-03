module.exports = {
  sourceDir: "./build/chrome",
  artifactsDir: "./dist/chrome",
  verbose: true,
  run: {
    target: ["chrome"],
    startUrl: ["chrome-extension://nofndgfpjopdpbcejgdpikmpdehlekac/index.html"],
  },
  build: {
    overwriteDest: true,
  },
};
