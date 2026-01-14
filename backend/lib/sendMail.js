import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
  service: "gmail",   // ✅ simplest & safest
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS, // Gmail App Password
  },
});

export default transporter;
