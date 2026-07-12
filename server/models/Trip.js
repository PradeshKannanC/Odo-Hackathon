const mongoose = require("mongoose");

// Placeholder schema - fields to be expanded further when Trip CRUD is implemented.
// vehicle/driver refs + origin/destination/distance added to support realistic seed data.
const tripSchema = new mongoose.Schema(
  {
    vehicle: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Vehicle",
    },
    driver: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Driver",
    },
    origin: {
      type: String,
      trim: true,
    },
    destination: {
      type: String,
      trim: true,
    },
    distanceKm: {
      type: Number,
      min: 0,
    },
    scheduledDate: {
      type: Date,
    },
    status: {
      type: String,
      enum: ["DRAFT", "DISPATCHED", "COMPLETED", "CANCELLED"],
      default: "DRAFT",
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Trip", tripSchema);
