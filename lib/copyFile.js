const { ncp } = require("ncp");

ncp.limit = 16;

module.exports = (src, dest) =>
  new Promise((resolve, reject) =>
    ncp(src, dest, err => (err ? reject(err) : resolve()))
  );
