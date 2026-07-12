const asyncHandler = require("../utils/asyncHandler");

// @route   GET /api/reports/summary
const getSummaryReport = asyncHandler(async (req, res) => {
  res.status(501).json({ success: false, message: "Not implemented yet" });
});

// @route   GET /api/reports/expenses
const getExpenseReport = asyncHandler(async (req, res) => {
  res.status(501).json({ success: false, message: "Not implemented yet" });
});

module.exports = { getSummaryReport, getExpenseReport };
