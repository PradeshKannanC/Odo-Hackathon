const mongoose = require("mongoose");

// Placeholder schema - fields to be expanded further when the Maintenance
// module is implemented. vehicle ref + type/cost/date added to support
// realistic seed data.
const maintenanceSchema = new mongoose.Schema(
  {
    vehicle: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Vehicle",
    },
    type: {
      type: String,
      trim: true,
    },
    cost: {
      type: Number,
      min: 0,
    },
    date: {
      type: Date,
    },
    notes: {
      type: String,
      trim: true,
    },
    status: {
      type: String,
      enum: ["ACTIVE", "COMPLETED"],
      default: "ACTIVE",
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Maintenance", maintenanceSchema);
