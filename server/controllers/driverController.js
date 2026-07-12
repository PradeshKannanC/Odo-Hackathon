const asyncHandler = require("../utils/asyncHandler");

// @route   GET /api/drivers
const getDrivers = asyncHandler(async (req, res) => {
  res.status(501).json({ success: false, message: "Not implemented yet" });
});

// @route   GET /api/drivers/:id
const getDriverById = asyncHandler(async (req, res) => {
  res.status(501).json({ success: false, message: "Not implemented yet" });
});

// @route   POST /api/drivers
const createDriver = asyncHandler(async (req, res) => {
  res.status(501).json({ success: false, message: "Not implemented yet" });
});

// @route   PUT /api/drivers/:id
const updateDriver = asyncHandler(async (req, res) => {
  res.status(501).json({ success: false, message: "Not implemented yet" });
});

// @route   DELETE /api/drivers/:id
const deleteDriver = asyncHandler(async (req, res) => {
  res.status(501).json({ success: false, message: "Not implemented yet" });
});

module.exports = { getDrivers, getDriverById, createDriver, updateDriver, deleteDriver };
