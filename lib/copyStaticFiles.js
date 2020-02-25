const path = require("path");
const glob = require("glob-promise");
const copyStaticFile = require("./copyStaticFile");

const staticPath = path.resolve(__dirname, "..", "static");

module.exports = async function copyStaticFiles({ destination }) {
  console.log("---- Copy static files");

  const files = await glob(`${staticPath}/**/*`, { dots: true });

  for (const file of files) {
    await copyStaticFile(destination, file);
  }
};
