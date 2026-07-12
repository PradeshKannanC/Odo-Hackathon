const express = require("express");
const { getDashboardStats, getRecentTrips } = require("../controllers/dashboardController");
const { protect } = require("../middleware/authMiddleware");

const router = express.Router();

router.use(protect);

router.get("/stats", getDashboardStats);
router.get("/recent-trips", getRecentTrips);

module.exports = router;
