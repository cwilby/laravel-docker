const inquirer = require("inquirer");
const questions = require("./questions");

module.exports = () => inquirer.prompt(questions);
