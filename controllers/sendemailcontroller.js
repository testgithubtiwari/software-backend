const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.ADMIN_EMAIL,
    pass: process.env.ADMIN_PASSWORD,
  },
  tls: {
    rejectUnauthorized: false,
  },
});

const sendemail = (req, res) => {
  const { from, to, subject, html } = req.body;

  if (!from || !to || !subject || !html) {
    return res
      .status(400)
      .json({ error: "Please provide all the required fields" });
  }

  const mailOptions = {
    from: from,
    to: to,
    subject: subject,
    html: html,
  };

  transporter.sendMail(mailOptions, function (error, info) {
    if (error) {
      console.log(error);
      res
        .status(500)
        .send({
          success: false,
          message: "Failed to send email",
          error: error,
        });
    } else {
      console.log("Email sent: " + info.response);
      res
        .status(200)
        .send({ success: true, message: "Email sent successfully" });
    }
  });
};

module.exports = { sendemail };
