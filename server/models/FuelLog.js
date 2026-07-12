const mongoose = require("mongoose");

// Placeholder schema - fields to be expanded when Fuel module is implemented
const fuelLogSchema = new mongoose.Schema({}, { timestamps: true });

module.exports = mongoose.model("FuelLog", fuelLogSchema);
