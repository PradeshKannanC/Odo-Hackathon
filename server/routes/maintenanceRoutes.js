const express = require("express");
const {
  getMaintenanceRecords,
  getMaintenanceById,
  createMaintenance,
  updateMaintenance,
  deleteMaintenance,
} = require("../controllers/maintenanceController");
const { protect } = require("../middleware/authMiddleware");

const router = express.Router();

router.use(protect);

router.route("/").get(getMaintenanceRecords).post(createMaintenance);
router.route("/:id").get(getMaintenanceById).put(updateMaintenance).delete(deleteMaintenance);

module.exports = router;
