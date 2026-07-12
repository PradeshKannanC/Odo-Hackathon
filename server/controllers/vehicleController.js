const asyncHandler = require("../utils/asyncHandler");

// @route   GET /api/vehicles
const getVehicles = asyncHandler(async (req, res) => {
  res.status(501).json({ success: false, message: "Not implemented yet" });
});

// @route   GET /api/vehicles/:id
const getVehicleById = asyncHandler(async (req, res) => {
  res.status(501).json({ success: false, message: "Not implemented yet" });
});

// @route   POST /api/vehicles
const createVehicle = asyncHandler(async (req, res) => {
  res.status(501).json({ success: false, message: "Not implemented yet" });
});

// @route   PUT /api/vehicles/:id
const updateVehicle = asyncHandler(async (req, res) => {
  res.status(501).json({ success: false, message: "Not implemented yet" });
});

// @route   DELETE /api/vehicles/:id
const deleteVehicle = asyncHandler(async (req, res) => {
  res.status(501).json({ success: false, message: "Not implemented yet" });
});

module.exports = { getVehicles, getVehicleById, createVehicle, updateVehicle, deleteVehicle };
