const config = require("../../config");
const { promises: fs } = require("fs");

module.exports = async function loadModels() {
  try {
    const models = await fs.readFile(config.paths.build.models, "utf-8");

    return JSON.parse(models);
  } catch {
    return [];
  }
};
