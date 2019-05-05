const functions = require("firebase-functions");
const nodemailer = require("nodemailer");
const env = functions.config();

const { domain } = env.app;
const { host, port, user, pass } = env.sgrid;

async function sendEmail(to) {
  try {
    const transporter = await nodemailer.createTransport({
      secure: true,
      host,
      port,
      auth: { user, pass }
    });

    console.log(to);
    const info = await transporter.sendMail({
      from: `"MOONCOINS 🚀" <no-reply@${domain}>`,
      to,
      subject: "Top 10 Volatile Cryptos Update!",
      html: `
      <h1>MOONCOINS 🚀</h1>
      <p style="display: block; margin-bottom: 24px">
        The list of top 10 most volatile cryptos just changed!
        Click below to see the new standings!
      </p>
      <a href="https://${domain}" style="background: #082f58; color: #fff; text-decoration: none; font-family: sans-serif; display: inline-block; padding: 16px 24px; border-radius: 8px; font-weight: bolder">
        Open The List
      </a>
    `
    });

    console.info(info);
    console.info(`Message sent: ${info.messageId}`);
  } catch (error) {
    return console.error({ error });
  }
}

module.exports = sendEmail;
