const express = require("express");

const {
    getDrivers,
    getDriverById,
    createDriver,
    updateDriver,
    deleteDriver,
} = require("../controllers/driverController");

const router = express.Router();

router
    .route("/")
    .get(getDrivers)
    .post(createDriver);

router
    .route("/:id")
    .get(getDriverById)
    .put(updateDriver)
    .delete(deleteDriver);

module.exports = router;