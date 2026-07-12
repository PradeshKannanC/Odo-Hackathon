const express = require("express");
const {
  getFuelLogs,
  getFuelLogById,
  createFuelLog,
  updateFuelLog,
  deleteFuelLog,
} = require("../controllers/fuelController");
const { protect } = require("../middleware/authMiddleware");

const router = express.Router();

router.use(protect);

router.route("/").get(getFuelLogs).post(createFuelLog);
router.route("/:id").get(getFuelLogById).put(updateFuelLog).delete(deleteFuelLog);

module.exports = router;
