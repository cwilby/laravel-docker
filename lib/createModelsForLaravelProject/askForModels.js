const { promises: fs } = require("fs");
const config = require("../../config");
const inquirer = require("inquirer");

module.exports = async function askForModels(models) {
  let modelName;
  do {
    ({ modelName } = await inquirer.prompt([
      {
        name: "modelName",
        message: "What is the name of your model? (Type nothing to stop)",
        type: "input"
      }
    ]));
    if (modelName) models.push(modelName);
  } while (modelName);

  await fs.mkdir(config.paths.build.path, { recursive: true });
  await fs.writeFile(config.paths.build.models, JSON.stringify(models));

  return models;
};
