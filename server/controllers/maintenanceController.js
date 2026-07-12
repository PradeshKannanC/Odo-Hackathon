const asyncHandler = require("../utils/asyncHandler");

// @route   GET /api/maintenance
const getMaintenanceRecords = asyncHandler(async (req, res) => {
  res.status(501).json({ success: false, message: "Not implemented yet" });
});

// @route   GET /api/maintenance/:id
const getMaintenanceById = asyncHandler(async (req, res) => {
  res.status(501).json({ success: false, message: "Not implemented yet" });
});

// @route   POST /api/maintenance
const createMaintenance = asyncHandler(async (req, res) => {
  res.status(501).json({ success: false, message: "Not implemented yet" });
});

// @route   PUT /api/maintenance/:id
const updateMaintenance = asyncHandler(async (req, res) => {
  res.status(501).json({ success: false, message: "Not implemented yet" });
});

// @route   DELETE /api/maintenance/:id
const deleteMaintenance = asyncHandler(async (req, res) => {
  res.status(501).json({ success: false, message: "Not implemented yet" });
});

module.exports = {
  getMaintenanceRecords,
  getMaintenanceById,
  createMaintenance,
  updateMaintenance,
  deleteMaintenance,
};
