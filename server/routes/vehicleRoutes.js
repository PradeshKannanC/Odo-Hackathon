const express = require("express");
const {
  getVehicles,
  getVehicleById,
  createVehicle,
  updateVehicle,
  deleteVehicle,
} = require("../controllers/vehicleController");
const { protect } = require("../middleware/authMiddleware");
const { authorize } = require("../middleware/roleMiddleware");

const router = express.Router();

router.use(protect);

// Read access is broader than write access: Maintenance and Fuel need a
// vehicle picker even though only Fleet Manager/Dispatcher can manage the
// Vehicles module itself.
const READ_ROLES = ["fleet_manager", "dispatcher", "safety_officer", "financial_analyst"];
const WRITE_ROLES = ["fleet_manager", "dispatcher"];

router.get("/", authorize(...READ_ROLES), getVehicles);
router.get("/:id", authorize(...READ_ROLES), getVehicleById);
router.post("/", authorize(...WRITE_ROLES), createVehicle);
router.put("/:id", authorize(...WRITE_ROLES), updateVehicle);
router.delete("/:id", authorize(...WRITE_ROLES), deleteVehicle);

module.exports = router;
