const crypto = require("crypto");

const generateOtp = () => {
  return crypto.randomInt(100000, 999999).toString();
};

const getOtpExpiry = () => {
  return new Date(Date.now() + 10 * 60 * 1000);
};

module.exports = {
  generateOtp,
  getOtpExpiry,
};