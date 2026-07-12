const express = require("express");
const {
  getFuelLogs,
  getFuelLogById,
  createFuelLog,
  updateFuelLog,
  deleteFuelLog,
} = require("../controllers/fuelController");
const { protect } = require("../middleware/authMiddleware");
const { authorize } = require("../middleware/roleMiddleware");

const router = express.Router();

router.use(protect);
router.use(authorize("fleet_manager", "financial_analyst"));

router.route("/").get(getFuelLogs).post(createFuelLog);
router.route("/:id").get(getFuelLogById).put(updateFuelLog).delete(deleteFuelLog);

module.exports = router;
