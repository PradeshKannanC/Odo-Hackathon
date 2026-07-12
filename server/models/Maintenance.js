const mongoose = require("mongoose");

// Placeholder schema - fields to be expanded when Maintenance module is implemented
const maintenanceSchema = new mongoose.Schema(
  {
    status: {
      type: String,
      enum: ["ACTIVE", "COMPLETED"],
      default: "ACTIVE",
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Maintenance", maintenanceSchema);
