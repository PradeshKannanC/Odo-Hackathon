const express = require("express");
const {
  getDrivers,
  getDriverById,
  createDriver,
  updateDriver,
  deleteDriver,
} = require("../controllers/driverController");
const { protect } = require("../middleware/authMiddleware");
const { authorize } = require("../middleware/roleMiddleware");

const router = express.Router();

router.use(protect);
router.use(authorize("fleet_manager", "dispatcher", "safety_officer"));

router.route("/").get(getDrivers).post(createDriver);
router.route("/:id").get(getDriverById).put(updateDriver).delete(deleteDriver);

module.exports = router;
