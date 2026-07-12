const asyncHandler = require("../utils/asyncHandler");

// @route   GET /api/trips
const getTrips = asyncHandler(async (req, res) => {
  res.status(501).json({ success: false, message: "Not implemented yet" });
});

// @route   GET /api/trips/:id
const getTripById = asyncHandler(async (req, res) => {
  res.status(501).json({ success: false, message: "Not implemented yet" });
});

// @route   POST /api/trips
const createTrip = asyncHandler(async (req, res) => {
  res.status(501).json({ success: false, message: "Not implemented yet" });
});

// @route   PUT /api/trips/:id
const updateTrip = asyncHandler(async (req, res) => {
  res.status(501).json({ success: false, message: "Not implemented yet" });
});

// @route   DELETE /api/trips/:id
const deleteTrip = asyncHandler(async (req, res) => {
  res.status(501).json({ success: false, message: "Not implemented yet" });
});

module.exports = { getTrips, getTripById, createTrip, updateTrip, deleteTrip };
