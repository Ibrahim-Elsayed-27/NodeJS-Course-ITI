import nodemailer from "nodemailer";
import { template } from "./emailTemplate.js";
import jwt from "jsonwebtoken";

// Create a transporter using Ethereal test credentials.
// For production, replace with your actual SMTP server details
export async function sendEmail(email) {
  await nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: "ibrahim.elsayed.mostafa275@gmail.com",
      pass: "nchi fcud rlqt ezys",
    },
  });

  // Send an email using async/await
  let emailToken = jwt.sign(email, "emailToken");

  const info = await transporter.sendMail({
    from: '"From Node Lab <ibrahim.elsayed.mostafa275@gmail.com>',
    to: email,
    subject: "Welcome to NodeJS Lab",
    // text: "Hello world?", // Plain-text version of the message
    html: template(emailToken), // HTML version of the message
  });

  console.log("Message sent:", info.messageId);
}
