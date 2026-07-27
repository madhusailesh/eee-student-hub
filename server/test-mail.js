require("dotenv").config();
const nodemailer = require("nodemailer");

console.log("Testing with User:", process.env.EMAIL_USER);

const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 465,
  secure: true,
  auth: {
    user: process.env.EMAIL_USER?.trim(),
    pass: process.env.EMAIL_PASS?.trim(),
  },
  tls: {
    rejectUnauthorized: false
  }
});

transporter.verify((error, success) => {
  if (error) {
    console.error("❌ Connection Error:", error);
  } else {
    console.log("✅ SUCCESS! Gmail SMTP credentials working properly!");
  }
});