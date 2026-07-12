const express = require("express");
const {
  getTrips,
  getTripById,
  createTrip,
  updateTrip,
  deleteTrip,
} = require("../controllers/tripController");
const { protect } = require("../middleware/authMiddleware");

const router = express.Router();

router.use(protect);

router.route("/").get(getTrips).post(createTrip);
router.route("/:id").get(getTripById).put(updateTrip).delete(deleteTrip);

module.exports = router;
