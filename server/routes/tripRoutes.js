const express = require("express");

const {
    getTrips,
    getTripById,
    createTrip,
    updateTrip,
    deleteTrip,
} = require("../controllers/tripController");

const router = express.Router();

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