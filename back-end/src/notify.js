import nodemailer from "nodemailer";

import { EMAIL_SERVICE, EMAIL, EMAIL_PASSWORD, FRONT_END_ADDRESS } from "./environment.js";

const EMAIL_TRANSPORTER = nodemailer.createTransport({
  service: EMAIL_SERVICE,
  auth: {
    user: EMAIL,
    pass: EMAIL_PASSWORD,
  }
});

export default function notify(email, phone_number) {
  if (email != null) {
    EMAIL_TRANSPORTER.sendMail(
      {
        from: EMAIL,
        to: email,
        subject: "Vous avez recu un courrier",
        html: `Venez récupérer votre courrier sur <a href='${FRONT_END_ADDRESS}'>Notimail</a>'`,
      },
      (err, info) => {
        if (err) {
          console.error("Error: Failed to send mail: " + err);
          return;
        } else {
          console.log(info);
        }

      });
  }
}
