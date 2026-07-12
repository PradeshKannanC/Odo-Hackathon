const mongoose = require("mongoose");

// Placeholder schema - fields to be expanded when Vehicle CRUD is implemented
const vehicleSchema = new mongoose.Schema(
  {
    status: {
      type: String,
      enum: ["AVAILABLE", "ON_TRIP", "IN_SHOP", "RETIRED"],
      default: "AVAILABLE",
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Vehicle", vehicleSchema);
