require("dotenv").config();

const nodemailer = require("nodemailer");

const gmailUser = process.env.GMAIL_USER;
const gmailPasskey = process.env.GMAIL_PASS_KEY;

const sendRegisterMail = (to, code) => {
  const transporter = nodemailer.createTransport({
    service: "Gmail",
    host: "smtp.gmail.com",
    port: 587,
    secure: true,
    auth: {
      user: gmailUser,
      pass: gmailPasskey,
    },
    tls: { rejectUnauthorized: false },
  });

  console.log(to);

  transporter.sendMail(
    {
      from: `Шаурмичка <${gmailUser}@gmail.com>`,

      to,

      subject: "код регистрации",

      text: `ваш код регистрации: ${code}`,
    },
    (error, info) => {
      if (error) {
        console.log("Error sending email: " + error);
      } else {
        console.log("Email sent: " + info.response);
      }
    }
  );
};

module.exports = {
  sendRegisterMail,
};
