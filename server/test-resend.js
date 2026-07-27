require("dotenv").config();
const { Resend } = require("resend");

const resend = new Resend(process.env.RESEND_API_KEY);

async function test() {
  try {
    const res = await resend.emails.send({
      from: "EEE Student Hub <onboarding@resend.dev>",
      to: "madhusaileshsasamal998@gmail.com", // 👈 Exact registered email
      subject: "Test OTP Email 🚀",
      html: "<p>Resend Integration Working 100%! 🎉</p>",
    });
    console.log("✅ Email Sent Result:", res);
  } catch (err) {
    console.error("❌ Error:", err);
  }
}

test();