const mongoose = require("mongoose");

// Placeholder schema - fields to be expanded when Trip CRUD is implemented
const tripSchema = new mongoose.Schema(
  {
    status: {
      type: String,
      enum: ["DRAFT", "DISPATCHED", "COMPLETED", "CANCELLED"],
      default: "DRAFT",
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Trip", tripSchema);
