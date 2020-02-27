const { spawn } = require("child-process-promise");

module.exports = async function composerInstall(destination) {
  const promise = spawn("composer", ["install"], { cwd: destination });
  const { childProcess } = promise;
  childProcess.stdout.on("data", data => console.log(data.toString()));
  childProcess.stderr.on("data", data => console.log(data.toString()));
  return promise;
};
