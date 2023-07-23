const nodemailer = require('nodemailer');

const sendEmail = async options => {
  var transporter = nodemailer.createTransport({
    host: process.env.EMAIL_HOST,
    port: process.env.EMAI_PORT,
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASSWORD
    }
  });

  const mailOptions = {
    from: 'Mobile App',
    to: options.email,
    subject: options.subject,
    text: options.message,
    // html: options.html
  }

  await transporter.sendMail(mailOptions);
}

module.exports = sendEmail;