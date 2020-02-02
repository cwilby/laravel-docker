require("dotenv").config();
const fs = require("fs");
const path = require("path");
const mkdirp = require("mkdirp");
const { ncp } = require("ncp");
const { Command } = require("commander");
const nunjucks = require("nunjucks");
const inquirer = require("inquirer");

ncp.limit = 16;

const readFile = filename =>
  new Promise((resolve, reject) =>
    fs.readFile(
      path.resolve(__dirname, "template", filename),
      "utf-8",
      (err, data) => (err ? reject(err) : resolve(data))
    )
  );

const copyFile = (src, dest) =>
  new Promise((resolve, reject) =>
    ncp(src, dest, err => (err ? reject(err) : resolve()))
  );

const writeFile = (filename, data) =>
  new Promise((resolve, reject) =>
    fs.writeFile(filename, data, err => (err ? reject(err) : resolve()))
  );

const program = new Command();

program.version(require("./package.json").version);

program
  .command("init <destination>")
  .description(
    "Adds Docker configuration to a destination folder containing a Laravel project"
  )
  .action(async destination => {
    console.log(`Initialize ${destination}`);

    console.log("-- Copying static content");
    try {
      await Promise.all(
        [".docker", "package.json", "scripts"].map(file =>
          copyFile(
            path.resolve(__dirname, "static", file),
            path.resolve(destination, file)
          )
        )
      );
    } catch (e) {
      console.error(e);
    }

    console.log("-- Compiling templates");
    const context = await inquirer.prompt(
      [
        {
          type: "input",
          name: "APP_TITLE",
          message: "What is the title of your app? (e.g. AcmeBar): ",
          default: process.env.APP_TITLE || ""
        },
        {
          type: "input",
          name: "APP_NAME",
          message: "What is the lowercase name of your app? (e.g. acmebar): ",
          default: process.env.APP_NAME || ""
        },
        {
          type: "input",
          name: "APP_HOST",
          message: "What is the eventual FQDN of this app?",
          default: process.env.APP_HOST || ""
        },
        {
          type: "input",
          name: "BACKUP_SSH_HOST",
          message:
            "Enter an SSH host accessible by the host running Laravel for backup/restore",
          default: process.env.BACKUP_SSH_HOST || ""
        },
        {
          type: "input",
          name: "PERCONA_REMOTE_PORT",
          message: "What port should be used to access Percona from the host?",
          default: process.env.PERCONA_REMOTE_PORT || "3306"
        },
        {
          type: "password",
          name: "PERCONA_ROOT_PASSWORD",
          message: "What password should be used for the root Percona user?",
          default: process.env.PERCONA_ROOT_PASSWORD || "secret"
        },
        {
          type: "password",
          name: "DB_PASSWORD",
          message:
            "What password should be used for the account used by Laravel?",
          default: process.env.DB_PASSWORD || "secret"
        },
        {
          type: "password",
          name: "REDIS_PASSWORD",
          message: "What password should be used for Redis?",
          default: process.env.REDIS_PASSWORD || "secret"
        }
      ].filter(Boolean)
    );

    await Promise.all(
      [
        ".circleci/config.yml",
        ".docker/workspace/docker-entrypoint.sh",
        ".env",
        ".env.example",
        ".env.testing",
        "scripts/backup.sh",
        "scripts/restore.sh",
        "docker-compose.prod.yml",
        "docker-compose.yml"
      ].map(async filename => {
        console.log(`  ${filename}`);
        const source = await readFile(filename);
        const result = nunjucks.renderString(source, context);
        const destinationFilename = path.resolve(destination, filename);
        await mkdirp(
          destinationFilename
            .split("/")
            .slice(0, -1)
            .join("/")
        );
        return writeFile(destinationFilename, result);
      })
    );

    console.log("Finished");
  });

program.parse(process.argv);
