const express = require("express");

const {
  getTrips,
  getTripById,
  createTrip,
  updateTrip,
  deleteTrip,
} = require("../controllers/tripController");

const { protect } = require("../middleware/authMiddleware");
const { authorize } = require("../middleware/roleMiddleware");

const router = express.Router();

// Protect all trip routes
router.use(protect);

// Allow only Fleet Manager and Dispatcher
router.use(authorize("fleet_manager", "dispatcher"));

router
  .route("/")
  .get(getTrips)
  .post(createTrip);

router
  .route("/:id")
  .get(getTripById)
  .put(updateTrip)
  .delete(deleteTrip);

module.exports = router;