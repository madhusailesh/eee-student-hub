const User = require("../users/user.model");
const Otp = require("./otp.model");

const ApiError = require("../../utils/ApiError");

const {
    hashPassword
} = require("../../utils/password");

const {
    generateOtp,
    getOtpExpiry
} = require("../../services/otp.service");

const {
    sendOtpEmail
} = require("../../services/mail.service");

const signup = async (data) => {

    const {
        fullName,
        email,
        password,
        semester,
        rollNumber,
        phone
    } = data;

    // Check existing user
    const existingUser = await User.findOne({ email });

    if (existingUser) {
        throw new ApiError(
            409,
            "Email already registered"
        );
    }

    // Hash password
    const hashedPassword =
        await hashPassword(password);

    // Create user
    const user = await User.create({

        fullName,

        email,

        password: hashedPassword,

        semester,

        rollNumber,

        phone

    });

    // Generate OTP
    const otp = generateOtp();

    // Save OTP
    await Otp.create({

        email,

        otp,

        purpose: "verify-email",

        expiresAt: getOtpExpiry()

    });

    // Send OTP
    await sendOtpEmail(email, otp);

    return user;
};

module.exports = {
    signup
};