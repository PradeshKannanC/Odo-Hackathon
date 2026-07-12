const mongoose = require("mongoose");

const tripSchema = new mongoose.Schema(
  {
    tripId: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },

    vehicle: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Vehicle",
      required: true,
    },

    driver: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Driver",
      required: true,
    },

    source: {
      type: String,
      required: true,
      trim: true,
    },

    destination: {
      type: String,
      required: true,
      trim: true,
    },

    cargoWeight: {
      type: Number,
      required: true,
      min: 0,
    },

    plannedDistance: {
      type: Number,
      required: true,
      min: 0,
    },

    scheduledDate: {
      type: Date,
    },

    status: {
      type: String,
      enum: [
        "DRAFT",
        "DISPATCHED",
        "COMPLETED",
        "CANCELLED",
      ],
      default: "DRAFT",
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Trip", tripSchema);