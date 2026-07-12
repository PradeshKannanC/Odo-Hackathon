const asyncHandler = require("../utils/asyncHandler");
const Trip = require("../models/Trip");

// GET /api/trips
const getTrips = asyncHandler(async (req, res) => {
    const trips = await Trip.find()
        .populate("vehicleId")
        .populate("driverId");

    res.status(200).json({
        success: true,
        count: trips.length,
        data: trips,
    });
});

// GET /api/trips/:id
const getTripById = asyncHandler(async (req, res) => {
    const trip = await Trip.findById(req.params.id)
        .populate("vehicleId")
        .populate("driverId");

    if (!trip) {
        return res.status(404).json({
            success: false,
            message: "Trip not found",
        });
    }

    res.status(200).json({
        success: true,
        data: trip,
    });
});

// POST /api/trips
const createTrip = asyncHandler(async (req, res) => {
    const trip = await Trip.create(req.body);

    res.status(201).json({
        success: true,
        data: trip,
    });
});

// PUT /api/trips/:id
const updateTrip = asyncHandler(async (req, res) => {
    const trip = await Trip.findById(req.params.id);

    if (!trip) {
        return res.status(404).json({
            success: false,
            message: "Trip not found",
        });
    }

    const updatedTrip = await Trip.findByIdAndUpdate(
        req.params.id,
        req.body,
        {
            new: true,
            runValidators: true,
        }
    );

    res.status(200).json({
        success: true,
        data: updatedTrip,
    });
});

// DELETE /api/trips/:id
const deleteTrip = asyncHandler(async (req, res) => {
    const trip = await Trip.findById(req.params.id);

    if (!trip) {
        return res.status(404).json({
            success: false,
            message: "Trip not found",
        });
    }

    await trip.deleteOne();

    res.status(200).json({
        success: true,
        message: "Trip deleted successfully",
    });
});

module.exports = {
    getTrips,
    getTripById,
    createTrip,
    updateTrip,
    deleteTrip,
};