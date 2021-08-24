const fs = require("fs");
const ts = require("typescript");

const getTsWebpackConfig = (filename = "webpack.config.ts") => {
  const config = new module.constructor();
  config.paths = module.paths;
  config._compile(
    ts.transpileModule(fs.readFileSync(filename, { encoding: "utf-8" }), {
      compilerOptions: {
        module: ts.ModuleKind.CommonJS,
      },
    }).outputText,
    filename,
  );
  return config.exports;
};

const { development } = getTsWebpackConfig();
module.exports = development;
