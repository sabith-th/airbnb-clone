import * as nodemailer from "nodemailer";

export const sendEmail = async (receipient: string, url: string) => {
  const transporter = nodemailer.createTransport({
    host: "smtp.ethereal.email",
    port: 587,
    auth: {
      user: process.env.NODEMAILER_USERNAME,
      pass: process.env.NODEMAILER_PASSWORD
    }
  });

  const mailOptions = {
    from: "admin@airbnb-clone.com",
    to: receipient,
    subject: "Airbnb Clone Confirmation Email",
    html: `<html>
              <body>
                <p>Please follow the below link to verify your account.</p>
                <a href="${url}">Confirm Email</a>
                <p>Thank you for signing up with Airbnb clone.</p>
              </body>
            </html>`
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      return console.log(error);
    }
    console.log(`Message sent: ${info.messageId}`);
    console.log(`Preview URL: ${nodemailer.getTestMessageUrl(info)}`);
  });
};
