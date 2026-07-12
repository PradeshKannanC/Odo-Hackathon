const mongoose = require("mongoose");

const driverSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },

    licenseNo: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },

    licenseCategory: {
      type: String,
      required: true,
      trim: true,
    },

    expiryDate: {
      type: Date,
      required: true,
    },

    phone: {
      type: String,
      required: true,
      trim: true,
    },

    experienceYears: {
      type: Number,
      default: 0,
      min: 0,
    },

    safetyScore: {
      type: Number,
      default: 100,
      min: 0,
      max: 100,
    },

    status: {
      type: String,
      enum: [
        "AVAILABLE",
        "ON_TRIP",
        "OFF_DUTY",
        "SUSPENDED",
      ],
      default: "AVAILABLE",
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Driver", driverSchema);