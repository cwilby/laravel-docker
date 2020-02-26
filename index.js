require("dotenv").config();

const { Command } = require("commander");
const {
  createLaravelDockerProject,
  addDockerToLaravelProject,
  createModelsForLaravelProject
} = require("./lib");

const program = new Command();

program.version(require("./package.json"));

program
  .command("create <destination>")
  .description("Create a new Laravel project with Docker")
  .action(createLaravelDockerProject);

program
  .command("add <destination>")
  .description("Add Docker to a Laravel project")
  .action(addDockerToLaravelProject);

program
  .command("model <destination>")
  .description("Create models interactively for a Laravel Project")
  .action(createModelsForLaravelProject);

program.parse(process.argv);
