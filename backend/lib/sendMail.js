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

let info = await transporter.sendMail({
  from: '"Test" <test@example.com>',
  to: "rhvishnushankar@gmail.com",
  subject: `Hello i am vishnu`,
  text: "Test email"
});

console.log("Preview URL:", nodemailer.getTestMessageUrl(info));

export default transporter;
