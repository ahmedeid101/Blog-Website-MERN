const nodemailer = require("nodemailer");

const sendEmail = async (to, subject, text) => {
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
    text,
  });
};

module.exports = sendEmail;
