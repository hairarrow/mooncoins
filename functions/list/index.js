const functions = require("firebase-functions");
const createList = require("./createList");
const listUpdate = require("./listUpdate");

exports.listUpdate = listUpdate;

exports.createList = functions.https.onRequest(async (_, res) => {
  try {
    const { success, updatedList } = await createList();
    res.status(200).send({ success, updatedList });
  } catch (error) {
    console.error(error);
    res.status(400).send({ success: false, error });
  }
});
