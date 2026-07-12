const mongoose = require("mongoose");

// Placeholder schema - fields to be expanded when Driver CRUD is implemented
const driverSchema = new mongoose.Schema(
  {
    status: {
      type: String,
      enum: ["AVAILABLE", "ON_TRIP", "OFF_DUTY", "SUSPENDED"],
      default: "AVAILABLE",
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Driver", driverSchema);
