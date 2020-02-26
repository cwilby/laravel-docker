const inquirer = require("inquirer");

module.exports = () =>
  process.env.ASK_QUESTIONS === "true"
    ? inquirer.prompt(require("./questions"))
    : Promise.resolve(process.env);
