const glob = require("glob-promise");
const fsSync = require("fs");
const compileTemplate = require("./compileTemplate");
const config = require("../../config");

module.exports = async function compileTemplates({ destination, context }) {
  console.log("---- Compile templates");

  const templates = await glob(`${config.paths.templates}/**/*`, {
    dot: true
  });

  for (const template of templates) {
    if (!fsSync.lstatSync(template).isDirectory()) {
      await compileTemplate(destination, context, template);
    }
  }
};
