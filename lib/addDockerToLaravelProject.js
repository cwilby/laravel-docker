const getContext = require("./getContext");
const copyStaticFiles = require("./copyStaticFiles");
const compileTemplates = require("./compileTemplates");

module.exports = async function addDockerToLaravelProject(destination) {
  try {
    console.log("-- Add Docker to Laravel Project");
    const context = await getContext();
    await copyStaticFiles({ destination, context });
    await compileTemplates({ destination, context });
  } catch (e) {
    console.log('❗️There was a problem adding Docker configuration to your Laravel project.')
    console.error(e);
  }
};
