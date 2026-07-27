const sendOtpEmail = async (toEmail, otp) => {
  try {
    const apiKey = process.env.BREVO_API_KEY?.trim();

    if (!apiKey) {
      throw new Error(
        "BREVO_API_KEY environment variable is missing or empty!",
      );
    }

    const response = await fetch("https://api.brevo.com/v3/smtp/email", {
      method: "POST",
      headers: {
        accept: "application/json",
        "content-type": "application/json",
        "api-key": apiKey,
      },
      body: JSON.stringify({
        sender: {
          name: "CORE EEE",
          email: "madhusaileshsasamal998@gmail.com",
        },
        to: [{ email: toEmail }],
        subject: "Verification OTP - EEE Student Hub",
        htmlContent: `
<div style="font-family: 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; max-width: 480px; margin: 0 auto; padding: 32px 24px; border: 1px solid #e2e8f0; border-radius: 20px; background: #ffffff; box-shadow: 0 10px 25px -5px rgba(0, 0, 0, 0.05);">
  
  <!-- Header / Badge -->
  <div style="text-align: center; margin-bottom: 24px;">
    <span style="display: inline-block; background-color: #ecfeff; color: #0891b2; font-size: 12px; font-weight: 700; padding: 6px 16px; border-radius: 9999px; text-transform: uppercase; letter-spacing: 1px; border: 1px solid #cffafbe0;">
      ⚡ CORE EEE
    </span>
  </div>

  <h2 style="color: #0f172a; text-align: center; margin: 0 0 8px 0; font-size: 22px; font-weight: 700;">
    Verify Your Email
  </h2>
  
  <p style="font-size: 14px; color: #475569; text-align: center; margin: 0 0 24px 0; line-height: 1.5;">
    Use the OTP below to complete your authentication.
  </p>

  <!-- Animated OTP Box Container -->
  <div style="text-align: center; margin: 32px 0;">
    <div style="display: inline-block; background: linear-gradient(135deg, #e0f2fe 0%, #f0f9ff 100%); border: 2px dashed #0284c7; padding: 16px 32px; border-radius: 16px; box-shadow: 0 4px 14px 0 rgba(2, 132, 199, 0.15);">
      <span style="font-size: 36px; font-weight: 800; letter-spacing: 8px; color: #0284c7; font-family: monospace; text-shadow: 0 2px 4px rgba(2, 132, 199, 0.1);">
        ${otp}
      </span>
    </div>
  </div>

  <!-- Timer Notification -->
  <div style="text-align: center; background-color: #f8fafc; border-radius: 12px; padding: 12px; margin-top: 24px;">
    <p style="font-size: 12px; color: #64748b; margin: 0; display: inline-flex; align-items: center;">
      ⏳ This OTP is valid for <strong style="color: #0f172a; margin-left: 4px;">10 minutes</strong>.
    </p>
  </div>

  <!-- Divider -->
  <hr style="border: none; border-top: 1px solid #f1f5f9; margin: 28px 0 20px 0;" />

  <!-- Footer Note -->
  <p style="font-size: 11px; color: #94a3b8; text-align: center; margin: 0;">
    If you didn't request this email, you can safely ignore it.
  </p>
</div>

        `,
      }),
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(
        data.message || "Failed to send email via Brevo REST API",
      );
    }

    console.log(
      "✅ Email sent successfully via Brevo REST API:",
      data.messageId,
    );
    return data;
  } catch (error) {
    console.error("❌ Send Mail API Error:", error.message || error);
    throw error;
  }
};

module.exports = {
  sendOtpEmail,
};
