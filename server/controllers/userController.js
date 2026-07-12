const asyncHandler = require("../utils/asyncHandler");
const User = require("../models/User");

// @route   GET /api/users
const getUsers = asyncHandler(async (req, res) => {
  res.status(501).json({ success: false, message: "Not implemented yet" });
});

// @route   GET /api/users/:id
const getUserById = asyncHandler(async (req, res) => {
  const user = await User.findById(req.params.id);
  if (!user) {
    res.status(404);
    throw new Error("User not found");
  }
  res.status(200).json({ success: true, data: user });
});

// @route   PUT /api/users/:id
const updateUser = asyncHandler(async (req, res) => {
  const user = await User.findById(req.params.id);
  if (!user) {
    res.status(404);
    throw new Error("User not found");
  }

  const { name, email } = req.body;
  if (name) user.name = name;
  if (email) user.email = email;

  const updated = await user.save();
  res.status(200).json({
    success: true,
    data: {
      _id: updated._id,
      name: updated.name,
      email: updated.email,
      role: updated.role,
    },
  });
});

// @route   DELETE /api/users/:id
const deleteUser = asyncHandler(async (req, res) => {
  res.status(501).json({ success: false, message: "Not implemented yet" });
});

module.exports = { getUsers, getUserById, updateUser, deleteUser };
