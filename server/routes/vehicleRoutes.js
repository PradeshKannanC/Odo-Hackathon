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
router.use(authorize("fleet_manager", "dispatcher"));

router.route("/").get(getVehicles).post(createVehicle);
router.route("/:id").get(getVehicleById).put(updateVehicle).delete(deleteVehicle);

module.exports = router;
