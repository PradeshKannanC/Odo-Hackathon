const asyncHandler = require("../utils/asyncHandler");
const Driver = require("../models/Driver");

// @route   GET /api/drivers
const getDrivers = asyncHandler(async (req, res) => {
    const drivers = await Driver.find().sort({ createdAt: -1 });

    res.status(200).json({
        success: true,
        count: drivers.length,
        data: drivers,
    });
});

// @route   GET /api/drivers/:id
const getDriverById = asyncHandler(async (req, res) => {
    const driver = await Driver.findById(req.params.id);

    if (!driver) {
        return res.status(404).json({
            success: false,
            message: "Driver not found",
        });
    }

    res.status(200).json({
        success: true,
        data: driver,
    });
});

// @route   POST /api/drivers
const createDriver = asyncHandler(async (req, res) => {
    const driver = await Driver.create(req.body);

    res.status(201).json({
        success: true,
        message: "Driver created successfully",
        data: driver,
    });
});

// @route   PUT /api/drivers/:id
const updateDriver = asyncHandler(async (req, res) => {
    const driver = await Driver.findByIdAndUpdate(
        req.params.id,
        req.body,
        {
            new: true,
            runValidators: true,
        }
    );

    if (!driver) {
        return res.status(404).json({
            success: false,
            message: "Driver not found",
        });
    }

    res.status(200).json({
        success: true,
        message: "Driver updated successfully",
        data: driver,
    });
});

// @route   DELETE /api/drivers/:id
const deleteDriver = asyncHandler(async (req, res) => {
    const driver = await Driver.findById(req.params.id);

    if (!driver) {
        return res.status(404).json({
            success: false,
            message: "Driver not found",
        });
    }

    await driver.deleteOne();

    res.status(200).json({
        success: true,
        message: "Driver deleted successfully",
    });
});

module.exports = {
    getDrivers,
    getDriverById,
    createDriver,
    updateDriver,
    deleteDriver,
};