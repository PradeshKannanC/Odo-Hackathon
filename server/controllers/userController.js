const asyncHandler = require("../utils/asyncHandler");

// @route   GET /api/users
const getUsers = asyncHandler(async (req, res) => {
  res.status(501).json({ success: false, message: "Not implemented yet" });
});

// @route   GET /api/users/:id
const getUserById = asyncHandler(async (req, res) => {
  res.status(501).json({ success: false, message: "Not implemented yet" });
});

// @route   PUT /api/users/:id
const updateUser = asyncHandler(async (req, res) => {
  res.status(501).json({ success: false, message: "Not implemented yet" });
});

// @route   DELETE /api/users/:id
const deleteUser = asyncHandler(async (req, res) => {
  res.status(501).json({ success: false, message: "Not implemented yet" });
});

module.exports = { getUsers, getUserById, updateUser, deleteUser };
