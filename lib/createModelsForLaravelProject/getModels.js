const loadModels = require("./loadModels");
const askForModels = require("./askForModels");

module.exports = async function getModels() {
  const models = await loadModels();
  return models.length ? models : askForModels(models);
};
