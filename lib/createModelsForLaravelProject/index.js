const getModels = require("./getModels");
const createModelsInDestination = require("./createModelsInDestination");

module.exports = async function createModelsForLaravelProject(destination) {
  try {
    console.log("-- Create models for Laravel project");

    const models = await getModels();

    await createModelsInDestination(models, destination);
  } catch (error) {
    console.log("❗️Error creating models for Laravel project");
    console.error(error);
  }
};
