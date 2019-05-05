const functions = require("firebase-functions");
const sendEmail = require("./sendEmail");
const { db } = require("../admin");

module.exports = functions.firestore
  .document("Lists/{id}")
  .onCreate(async () => {
    const users = await db
      .collection("Users")
      .where("receiveNotifications", "==", true)
      .get();

    await Promise.all(
      users.docs.map(async it => {
        const { email: to } = await it.data();
        return await sendEmail(to);
      })
    );
  });
