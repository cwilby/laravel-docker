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
    name: "APP_HOST",
    message: "What is the eventual FQDN of this app?",
    default: process.env.APP_HOST || ""
  },
  {
    type: "input",
    name: "PACKAGIST_URL",
    message: "Enter a URL of a packagist mirror (defaults to main mirror)",
    default: process.env.PACKAGIST_URL || "https://packagist.org/"
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
    message: "What password should be used for the account used by Laravel?",
    default: process.env.DB_PASSWORD || "secret"
  },
  {
    type: "password",
    name: "REDIS_PASSWORD",
    message: "What password should be used for Redis?",
    default: process.env.REDIS_PASSWORD || "secret"
  }
].filter(Boolean);
