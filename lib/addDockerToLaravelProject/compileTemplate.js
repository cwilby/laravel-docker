const fs = require("fs").promises;
const fsSync = require("fs");
const path = require("path");
const mkdirp = require("mkdirp");
const nunjucks = require("nunjucks");
const config = require("../../config");

module.exports = async function compileTemplate(
  destination,
  context,
  templateFilePath
) {
  const template = templateFilePath.replace(`${config.paths.templates}/`, "");

  console.log(`------ ${template}`);

  const destinationPath = path.resolve(destination, template);

  const destinationFolder = destinationPath
    .split("/")
    .slice(0, -1)
    .join("/");

  if (!fsSync.existsSync(destinationFolder)) {
    await mkdirp(destinationFolder);
  }

  const input = await fs.readFile(templateFilePath, "utf-8");

  const output = nunjucks.renderString(input, context);

  return fs.writeFile(destinationPath, output);
};
