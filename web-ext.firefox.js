module.exports = {
  sourceDir: "./build/firefox",
  artifactsDir: "./dist/firefox",
  verbose: true,
  run: {
    target: ["firefox-desktop"],
    firefox: "firefox-developer-edition",
    firefoxProfile: "development",
    keepProfileChanges: true,
    startUrl: ["about:debugging#/runtime/this-firefox", "about:addons"],
  },
  build: {
    overwriteDest: true,
  },
};
