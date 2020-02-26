const path = require("path");

module.exports = {
  paths: {
    build: {
      path: path.resolve(__dirname, "..", "build"),
      models: path.resolve(__dirname, "..", "build", "models.json")
    }
  }
};
