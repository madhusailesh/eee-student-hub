const sendOtpEmail = async (toEmail, otp) => {
  try {
    const apiKey = process.env.BREVO_API_KEY?.trim();

    if (!apiKey) {
      throw new Error("BREVO_API_KEY environment variable is missing or empty!");
    }

    const response = await fetch("https://api.brevo.com/v3/smtp/email", {
      method: "POST",
      headers: {
        "accept": "application/json",
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
      }),
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || "Failed to send email via Brevo REST API");
    }

    console.log("✅ Email sent successfully via Brevo REST API:", data.messageId);
    return data;
  } catch (error) {
    console.error("❌ Send Mail API Error:", error.message || error);
    throw error;
  }
};

module.exports = {
  sendOtpEmail,
};