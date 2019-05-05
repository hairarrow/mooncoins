const functions = require("firebase-functions");
const { db } = require("../admin");

exports.updateNotification = functions.https.onCall(
  ({ userId, receiveNotifications }) =>
    db
      .collection("Users")
      .doc(userId)
      .update({ receiveNotifications })
);

exports.createEmailSetting = functions.auth
  .user()
  .onCreate(async ({ uid: userId, email }) => {
    if (email)
      await db
        .collection("Users")
        .doc(userId)
        .create({ email, receiveNotifications: false });
  });
