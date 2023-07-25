const nodemailer = require("nodemailer");
const asyncHandler = require("express-async-handler");

const sendEmail = asyncHandler(async (data) => {
  const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 465,
    secure: true,
    auth: {
      // Generated user and pass
      user: process.env.MAIL_ID,
      pass: process.env.MP,
    },
  });

  // send mail with defined transport object
  const info = await transporter.sendMail({
    from: '"Kongmeng Xiong 👻" <kongmeng@gmail.com>', // sender address
    to: data.to, // list of receivers
    subject: data.subject, // Subject line
    text: data.text, // plain text body
    html: data.html, // html body
  });

  console.log("Message sent: %s", info.messageId);
  // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>
});

module.exports = sendEmail;