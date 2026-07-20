const mongoose = require("mongoose");

const noticeSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },

    description: {
      type: String,
      default: "",
      trim: true,
    },

    semester: {
      type: Number,
      min: 1,
      max: 8,
      default: null, // null = All Semesters
    },

    branch: {
      type: String,
      required: true,
      uppercase: true,
    },

    priority: {
      type: String,
      enum: ["LOW", "MEDIUM", "HIGH"],
      default: "MEDIUM",
    },

    fileUrl: {
      type: String,  
    },

    expiryDate: {
      type: Date,
      default: null,
    },

    uploadedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    isActive: {
      type: Boolean,
      default: true,
    },
  },
  {
    timestamps: true,
  }
);

noticeSchema.index({ branch: 1, semester: 1 });
noticeSchema.index({ priority: 1 });
noticeSchema.index({ isActive: 1 });

module.exports = mongoose.model("Notice", noticeSchema);