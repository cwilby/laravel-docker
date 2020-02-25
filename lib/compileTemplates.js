const glob = require("glob-promise");
const fsSync = require("fs");
const path = require("path");
const compileTemplate = require("./compileTemplate");

const templatePath = path.resolve(__dirname, "..", "templates");

module.exports = async function compileTemplates({ destination, context }) {
  console.log("---- Compile templates");

  const templates = await glob(`${templatePath}/**/*`, { dots: true });

  for (const template of templates) {
    if (!fsSync.lstatSync(template).isDirectory()) {
      await compileTemplate(destination, context, template);
    }
  }
};
