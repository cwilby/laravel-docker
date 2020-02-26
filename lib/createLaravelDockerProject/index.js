var Git = require("nodegit");

const addDockerToLaravelProject = require("../addDockerToLaravelProject");

module.exports = async function createLaravelDockerProject(destination) {
  console.log("-- Create Laravel Docker Project");

  console.log(`---- Cloning Laravel to ${destination}`);
  await Git.Clone("https://github.com/laravel/laravel", destination);

  return addDockerToLaravelProject(destination);
};
