const functions = require("firebase-functions");
const admin = require("firebase-admin");

admin.initializeApp();

const db = admin.firestore();
const timestamp = () => admin.firestore.Timestamp.fromDate(new Date());

module.exports = {
  db,
  timestamp
};
