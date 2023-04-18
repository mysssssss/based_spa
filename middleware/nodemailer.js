const nodemailer = require('nodemailer');
const transporter = nodemailer.createTransport({
  host: 'smtp.gmail.com',
  port: 587,
  secure: false,
  auth: {
    user: 'danila2565@gmail.com',
    pass: 'Danila3d',
  },
});

function sendEmail(name, email, message) {
  const mailOptions = {
    from: 'your-email@gmail.com',
    to: email,
    subject: 'Thanks for contacting us!',
    html: `<p>Dear ${name},</p><p>Thank you for contacting us. We have received your message and will get back to you as soon as possible.</p><p>Here is a copy of your message:</p><p>${message}</p><p>Best regards,<br/>Your Name</p>`,
  };
  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.log(error);
    } else {
      console.log(`Email sent: ${info.response}`);
    }
  });
}

module.exports = sendEmail;
