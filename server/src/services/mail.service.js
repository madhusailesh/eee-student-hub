const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST || "smtp-relay.brevo.com",
  port: Number(process.env.SMTP_PORT) || 2525,
  secure: false,
  auth: {
    user: process.env.SMTP_USER?.trim(),
    pass: process.env.SMTP_PASS?.trim(),
  },
});

const sendOtpEmail = async (toEmail, otp) => {
  try {
    const mailOptions = {
      // Must exactly match the verified sender in Brevo
      from: `"CORE EEE" <madhusaileshsasamal998@gmail.com>`,
      to: toEmail,
      subject: "Verification OTP - EEE Student Hub",
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 480px; margin: 0 auto; padding: 24px; border: 1px solid #e2e8f0; border-radius: 16px; background-color: #ffffff;">
          <h2 style="color: #0891b2; text-align: center; margin-top: 0;">EEE Student Hub</h2>
          <p style="font-size: 14px; color: #334155;">Hello,</p>
          <p style="font-size: 14px; color: #334155;">Your Email Verification OTP for EEE Student Hub is:</p>
          
          <div style="text-align: center; margin: 28px 0;">
            <span style="font-size: 32px; font-weight: 800; letter-spacing: 6px; color: #0284c7; background-color: #f0f9ff; padding: 12px 24px; border-radius: 12px; border: 1px dashed #0284c7; display: inline-block;">
              ${otp}
            </span>
          </div>
          
          <p style="font-size: 12px; color: #64748b; text-align: center;">This OTP is valid for <strong>10 minutes</strong>.</p>
        </div>
      `,
    };

    const info = await transporter.sendMail(mailOptions);
    console.log("✅ Email sent via Brevo SMTP:", info.messageId);
    return info;
  } catch (error) {
    console.error("❌ Send Mail Error:", error);
    throw error;
  }
};

module.exports = {
  sendOtpEmail,
};