const express = require("express");
const {
  getMaintenanceRecords,
  getMaintenanceById,
  createMaintenance,
  updateMaintenance,
  deleteMaintenance,
} = require("../controllers/maintenanceController");
const { protect } = require("../middleware/authMiddleware");
const { authorize } = require("../middleware/roleMiddleware");

const router = express.Router();

router.use(protect);
router.use(authorize("fleet_manager", "safety_officer"));

router.route("/").get(getMaintenanceRecords).post(createMaintenance);
router.route("/:id").get(getMaintenanceById).put(updateMaintenance).delete(deleteMaintenance);

module.exports = router;
