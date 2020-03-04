module.exports = [
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
    name: "MYSQL_REMOTE_PORT",
    message: "What port should be used to access MySQL from the host?",
    default: process.env.MYSQL_REMOTE_PORT || "3306"
  },
  {
    type: "password",
    name: "MYSQL_ROOT_PASSWORD",
    message: "What password should be used for the root MySQL user?",
    default: process.env.MYSQL_ROOT_PASSWORD || "secret"
  },
  {
    type: "password",
    name: "DB_PASSWORD",
    message: "What password should be used for the account used by Laravel?",
    default: process.env.DB_PASSWORD || "secret"
  },
  {
    type: "password",
    name: "REDIS_PASSWORD",
    message: "What password should be used for Redis?",
    default: process.env.REDIS_PASSWORD || "secret"
  },
  {
    type: "input",
    name: "PRODUCTION_HOST",
    message: "What is the hostname for this app?",
    default: process.env.PRODUCTION_HOST || ""
  },
  {
    type: "input",
    name: "PRODUCTION_USER",
    message: "What is the name of the deploy user in production?",
    default: process.env.PRODUCTION_USER || ""
  },
  {
    type: "input",
    name: "BACKUP_HOST",
    message:
      "Enter an SSH host accessible by the host running Laravel for backup/restore",
    default: process.env.BACKUP_HOST || ""
  },
  {
    type: "input",
    name: "BACKUP_USER",
    message:
      "Enter the user for the backup/restore SSH host",
    default: process.env.BACKUP_USER || ""
  },
].filter(Boolean);
