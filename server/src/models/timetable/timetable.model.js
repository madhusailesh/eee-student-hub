const mongoose = require("mongoose");

const timetableSchema = new mongoose.Schema(
  {
    semester: {
      type: Number,
      required: true,
      min: 1,
      max: 8,
    },

    branch: {
      type: String,
      required: true,
      uppercase: true,
      default: "EEE",
    },

    title: {
      type: String,
      required: true,
      trim: true,
    },

    fileUrl: {
      type: String,
      required: true,
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

timetableSchema.index(
  { branch: 1, semester: 1 },
  { unique: true }
);

module.exports = mongoose.model("Timetable", timetableSchema);