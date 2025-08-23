const nodemailer = require("nodemailer");

const sendEmail = async ({to, subject, html}) => {
  const transporter = nodemailer.createTransport({
    service: "Gmail", // or use SMTP details
    auth: {
      user: process.env.APP_EMAIL_ADDRESS,
      pass: process.env.APP_EMAIL_PASSWORD,
    },
  });

  await transporter.sendMail({
    from: `"MyApp" <${process.env.APP_EMAIL_ADDRESS}>`,
    to,
    subject,
    html,
  });
};

module.exports = sendEmail;
