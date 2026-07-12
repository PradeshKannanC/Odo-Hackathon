const asyncHandler = require("../utils/asyncHandler");
const Notification = require("../models/Notification");

// @desc    List recent notifications and the unread count
// @route   GET /api/notifications
// @access  Private
const getNotifications = asyncHandler(async (req, res) => {
  const [notifications, unreadCount] = await Promise.all([
    Notification.find().sort({ createdAt: -1 }).limit(50),
    Notification.countDocuments({ isRead: false }),
  ]);

  res.status(200).json({ success: true, data: notifications, unreadCount });
});

// @desc    Mark a single notification as read
// @route   PUT /api/notifications/:id/read
// @access  Private
const markAsRead = asyncHandler(async (req, res) => {
  const notification = await Notification.findByIdAndUpdate(
    req.params.id,
    { isRead: true },
    { new: true }
  );

  if (!notification) {
    res.status(404);
    throw new Error("Notification not found");
  }

  res.status(200).json({ success: true, data: notification });
});

// @desc    Mark every unread notification as read
// @route   PUT /api/notifications/read-all
// @access  Private
const markAllAsRead = asyncHandler(async (req, res) => {
  await Notification.updateMany({ isRead: false }, { isRead: true });
  res.status(200).json({ success: true, message: "All notifications marked as read" });
});

module.exports = { getNotifications, markAsRead, markAllAsRead };
