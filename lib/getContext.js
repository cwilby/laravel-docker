const getUserInput = require("./getUserInput");

module.exports = () =>
  process.env.ASK_QUESTIONS === "true"
    ? getUserInput()
    : Promise.resolve(process.env);
