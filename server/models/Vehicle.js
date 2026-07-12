const mongoose = require("mongoose");

// Placeholder schema - fields to be expanded further when Vehicle CRUD is implemented.
// registrationNumber/type/model/region added to support realistic seed data.
const vehicleSchema = new mongoose.Schema(
  {
    registrationNumber: {
      type: String,
      unique: true,
      sparse: true,
      trim: true,
    },
    type: {
      type: String,
      trim: true,
    },
    model: {
      type: String,
      trim: true,
    },
    region: {
      type: String,
      trim: true,
    },
    status: {
      type: String,
      enum: ["AVAILABLE", "ON_TRIP", "IN_SHOP", "RETIRED"],
      default: "AVAILABLE",
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Vehicle", vehicleSchema);
