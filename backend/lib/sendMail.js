import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 465,
<<<<<<< HEAD
  secure: true,
=======
>>>>>>> b7cd8afac5f0fcbbd7a875a7595e47eecb7dce3e
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
<<<<<<< HEAD
=======
  secure: true,
>>>>>>> b7cd8afac5f0fcbbd7a875a7595e47eecb7dce3e
  tls: {
    rejectUnauthorized: false, // allow self-signed certs
  },
});

transporter.verify((err, success) => {
  if (err) console.error("SMTP ERROR:", err);
  else console.log("SMTP READY ✅");
});
console.log(`user : ${process.env.EMAIL_USER}`)
console.log(`password : ${process.env.EMAIL_PASS}`)
export default transporter;
