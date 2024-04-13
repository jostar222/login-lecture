const fs = require("fs");
const appRoot = require("app-root-path");

const accessLogStream = fs.createWriteStream(
    `${appRoot}/logs/morgan_access.log`,
    { flags: 'a' }
);

module.exports = accessLogStream;