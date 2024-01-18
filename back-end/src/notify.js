import nodemailer from "nodemailer";

import { EMAIL_SERVICE, EMAIL, EMAIL_PASSWORD } from "./environment.js";

const EMAIL_TRANSPORTER = nodemailer.createTransport({
  service: EMAIL_SERVICE,
  auth: {
    user: EMAIL,
    pass: EMAIL_PASSWORD,
  }
});

export default function notify(email, phone_number) {
  if (email != null) {
    EMAIL_TRANSPORTER.sendMail({
      from: EMAIL,
      to: email,
      subject: "You have received a mail",
      text: "TODO",
    }, (err) => {
      console.error("Error: Failed to send mail: " + err);
    });
  }
}
