const functions = require("firebase-functions");
const user = require("./user");
const sync = require("./sync");
const list = require("./list");

module.exports = { user, sync, list };
