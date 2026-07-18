const sendOtpEmail = async (email, otp) => {
  // Temporary
  console.log(`
===================================
OTP EMAIL
To: ${email}
OTP: ${otp}
===================================
`);
};

module.exports = {
  sendOtpEmail,
};