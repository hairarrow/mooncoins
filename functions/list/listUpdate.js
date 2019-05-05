const functions = require("firebase-functions");
const nodemailer = require("nodemailer");
const { db } = require("../admin");

export default functions.firestore.document("Lists/{id}").onCreate(async () => {
  const { user, pass } = await nodemailer.createTestAccount();
  const transporter = nodemailer.createTransport({
    host: "smtp.ethreal.email",
    port: 587,
    secure: false,
    auth: {
      user,
      pass
    }
  });

  const users = await db
    .collection("Users")
    .where("receiveNotifications", "==", true)
    .get();

  await Promise.all(
    users.docs.map(async it => {
      const { email } = await it.data();
      const info = await transporter.sendEmail({
        from: "no-reply@mooncoins.firebase.com"
      });
    })
  );
});
