const createModelInDestination = require("./createModelInDestination");

module.exports = async function createModelsInDestination(models, destination) {
  for (const model of models) {
    await createModelInDestination(model, destination);
  }
};
