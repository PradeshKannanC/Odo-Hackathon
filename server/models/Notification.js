const mongoose = require("mongoose");

// Placeholder schema - real triggers (vehicle in shop, maintenance due, etc.)
// will be written here once the owning modules (Vehicles, Maintenance, Fuel...) exist
const notificationSchema = new mongoose.Schema(
  {
    type: {
      type: String,
      enum: ["VEHICLE_IN_SHOP", "MAINTENANCE_DUE", "LICENSE_EXPIRY", "TRIP_COMPLETED", "FUEL_ALERT"],
      required: true,
    },
    message: {
      type: String,
      required: true,
    },
    isRead: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Notification", notificationSchema);
