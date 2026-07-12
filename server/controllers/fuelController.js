const asyncHandler = require("../utils/asyncHandler");

// @route   GET /api/fuel
const getFuelLogs = asyncHandler(async (req, res) => {
  res.status(501).json({ success: false, message: "Not implemented yet" });
});

// @route   GET /api/fuel/:id
const getFuelLogById = asyncHandler(async (req, res) => {
  res.status(501).json({ success: false, message: "Not implemented yet" });
});

// @route   POST /api/fuel
const createFuelLog = asyncHandler(async (req, res) => {
  res.status(501).json({ success: false, message: "Not implemented yet" });
});

// @route   PUT /api/fuel/:id
const updateFuelLog = asyncHandler(async (req, res) => {
  res.status(501).json({ success: false, message: "Not implemented yet" });
});

// @route   DELETE /api/fuel/:id
const deleteFuelLog = asyncHandler(async (req, res) => {
  res.status(501).json({ success: false, message: "Not implemented yet" });
});

module.exports = { getFuelLogs, getFuelLogById, createFuelLog, updateFuelLog, deleteFuelLog };
