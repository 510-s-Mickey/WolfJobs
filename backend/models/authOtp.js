const mongoose = require("mongoose");

/**
 * Represents a schema for storing authentication data including the
 * user iD, OTP, and the data that it was created
 */
const autoOtpSchema = new mongoose.Schema(
  {
    userId: {
      type: String,
      required: true,
    },
    otp: {
      type: String,
      required: true,
    },
    createdAt: {
      type: Date,
      default: Date.now,
    },
  },
  {
    timestamps: true,
  }
);

const autoOtp = mongoose.model("autoOtp", autoOtpSchema);

module.exports = autoOtp;
