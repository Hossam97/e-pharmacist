const nodemailer = require("nodemailer");

const sendEmail = async (options) => {
  const { EMAIL_HOST, EMAIL_PORT, EMAIL_USER, EMAIL_PASS } = process.env;

  const transporter = nodemailer.createTransport({
    host: EMAIL_HOST,
    port: EMAIL_PORT,
    // secure: true,
    auth: {
      user: EMAIL_USER,
      pass: EMAIL_PASS,
    },
  });

  const data = {
    from: "hossammohamed.ib@gmail.com",
    to: options.email,
    subject: options.subject,
    text: options.message,
  };

   await transporter.sendMail(data);
};

module.exports = sendEmail;
