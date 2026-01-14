import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 587,
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
  secure: false,
  tls: {
    rejectUnauthorized: false, // allow self-signed certs
  },
});

transporter.verify((err, success) => {
  if (err) console.error("SMTP ERROR:", err);
  else console.log("SMTP READY ✅");
});

console.log("Preview URL:", nodemailer.getTestMessageUrl(info));
console.log(user`: ${process.env.EMAIL_USER}`)
console.log(password`: ${process.env.EMAIL_PASS}`)
export default transporter;
