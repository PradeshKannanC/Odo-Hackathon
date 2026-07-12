const mongoose = require("mongoose");

// Placeholder schema - fields to be expanded further when Driver CRUD is implemented.
// name/licenseNumber/phone/experienceYears added to support realistic seed data.
const driverSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      trim: true,
    },
    licenseNumber: {
      type: String,
      unique: true,
      sparse: true,
      trim: true,
    },
    phone: {
      type: String,
      trim: true,
    },
    experienceYears: {
      type: Number,
      min: 0,
    },
    status: {
      type: String,
      enum: ["AVAILABLE", "ON_TRIP", "OFF_DUTY", "SUSPENDED"],
      default: "AVAILABLE",
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Driver", driverSchema);
