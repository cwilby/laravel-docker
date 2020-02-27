const glob = require("glob-promise");
const copyStaticFile = require("./copyStaticFile");
const config = require("../../config");

module.exports = async function copyStaticFiles({ destination }) {
  console.log("---- Copy static files");

  const files = await glob(`${config.paths.static}/**/*`, { dot: true });

  for (const file of files) {
    await copyStaticFile(destination, file);
  }
};
