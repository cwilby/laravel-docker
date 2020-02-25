const fs = require("fs");
const path = require("path");
const mkdirp = require("mkdirp");
const copyFile = require("./copyFile");

const staticPath = path.resolve(__dirname, "..", "static");

module.exports = async function copyStaticFile(destination, staticFilePath) {
  const file = staticFilePath.replace(`${staticPath}/`, "");

  console.log(`------ ${file}`);

  const destinationPath = path.resolve(destination, file);

  const destinationFolder = destinationPath
    .split("/")
    .slice(0, -1)
    .join("/");

  if (!fs.existsSync(destinationFolder)) {
    await mkdirp(destinationFolder);
  }

  return copyFile(`${staticPath}/${file}`, path.resolve(destination, file));
};
