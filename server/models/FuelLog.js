const mongoose = require("mongoose");

// Placeholder schema - fields to be expanded further when the Fuel module is
// implemented. vehicle ref + liters/cost/date/odometer added to support
// realistic seed data.
const fuelLogSchema = new mongoose.Schema(
  {
    vehicle: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Vehicle",
    },
    liters: {
      type: Number,
      min: 0,
    },
    cost: {
      type: Number,
      min: 0,
    },
    odometerReading: {
      type: Number,
      min: 0,
    },
    date: {
      type: Date,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("FuelLog", fuelLogSchema);
