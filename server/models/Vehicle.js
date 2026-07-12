const mongoose = require('mongoose');

const VehicleSchema = new mongoose.Schema(
  {
    registrationNo: {
      type: String,
      required: [true, 'Registration number is required'],
      unique: true,
      trim: true,
      uppercase: true,
    },
    vehicleName: {
      type: String,
      required: [true, 'Vehicle name is required'],
      trim: true,
    },
    vehicleType: {
      type: String,
      required: [true, 'Vehicle type is required'],
      trim: true,
    },
    capacity: {
      type: Number,
      required: [true, 'Capacity is required'],
      min: [1, 'Capacity must be greater than 0'],
    },
    odometer: {
      type: Number,
      required: true,
      default: 0,
      min: [0, 'Odometer cannot be negative'],
    },
    acquisitionCost: {
      type: Number,
      required: [true, 'Acquisition cost is required'],
      min: [0, 'Acquisition cost cannot be negative'],
    },
    status: {
      type: String,
      enum: ['AVAILABLE', 'ON_TRIP', 'IN_SHOP', 'RETIRED'],
      default: 'AVAILABLE',
    },
  },
  {
    timestamps: true, // adds createdAt / updatedAt automatically
  }
);

// Index for faster search/filter
VehicleSchema.index({ vehicleName: 'text', vehicleType: 'text' });

module.exports = mongoose.model('Vehicle', VehicleSchema);
