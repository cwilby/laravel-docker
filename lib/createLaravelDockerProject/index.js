var Git = require("nodegit");

const composerInstall = require("./composerInstall");
const addDockerToLaravelProject = require("../addDockerToLaravelProject");

module.exports = async function createLaravelDockerProject(destination) {
  console.log("-- Create Laravel Docker Project");

  console.log(`---- Cloning Laravel to ${destination}`);
  await Git.Clone("https://github.com/laravel/laravel", destination);

  await composerInstall(destination);

  return addDockerToLaravelProject(destination);
};
