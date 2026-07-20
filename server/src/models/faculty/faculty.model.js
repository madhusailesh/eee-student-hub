const mongoose = require("mongoose");

const facultySchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },

    designation: {
  type: String,
  enum: [
    "HOD",
    "Professor",
    "Associate Professor",
    "Assistant Professor",
    "Guest Faculty"
  ],
  required: true,
},
    email: {
      type: String,
      trim: true,
      lowercase: true,
      default: "",
    },

    phone: {
      type: String,
      default: "",
    },

    photoUrl: {
      type: String,
      default: "",
    },

    cabin: {
      type: String,
      default: "",
    },

    branch: {
      type: String,
      required: true,
      uppercase: true,
    },

    subjects: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Subject",
      },
    ],

    isActive: {
      type: Boolean,
      default: true,
    },
  },
  {
    timestamps: true,
  }
);

facultySchema.index({ branch: 1 });
facultySchema.index({ subjects: 1 });
facultySchema.index({ isActive: 1 });

module.exports = mongoose.model("Faculty", facultySchema);