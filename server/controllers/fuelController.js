const asyncHandler = require("../utils/asyncHandler");
const FuelLog = require("../models/FuelLog");

// @route   GET /api/fuel
const getFuelLogs = asyncHandler(async (req, res) => {
  const { vehicle } = req.query;

  const query = {};
  if (vehicle) query.vehicle = vehicle;

  const logs = await FuelLog.find(query)
    .populate("vehicle", "registrationNo vehicleName vehicleType")
    .sort({ createdAt: -1 });

  res.status(200).json({
    success: true,
    count: logs.length,
    data: logs,
  });
});

// @route   GET /api/fuel/:id
const getFuelLogById = asyncHandler(async (req, res) => {
  const log = await FuelLog.findById(req.params.id).populate(
    "vehicle",
    "registrationNo vehicleName vehicleType"
  );

  if (!log) {
    return res.status(404).json({ success: false, message: "Fuel log not found" });
  }

  res.status(200).json({ success: true, data: log });
});

// @route   POST /api/fuel
const createFuelLog = asyncHandler(async (req, res) => {
  const log = await FuelLog.create(req.body);
  const populated = await log.populate("vehicle", "registrationNo vehicleName vehicleType");

  res.status(201).json({
    success: true,
    message: "Fuel log created successfully",
    data: populated,
  });
});

// @route   PUT /api/fuel/:id
const updateFuelLog = asyncHandler(async (req, res) => {
  const log = await FuelLog.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
  }).populate("vehicle", "registrationNo vehicleName vehicleType");

  if (!log) {
    return res.status(404).json({ success: false, message: "Fuel log not found" });
  }

  res.status(200).json({
    success: true,
    message: "Fuel log updated successfully",
    data: log,
  });
});

// @route   DELETE /api/fuel/:id
const deleteFuelLog = asyncHandler(async (req, res) => {
  const log = await FuelLog.findById(req.params.id);

  if (!log) {
    return res.status(404).json({ success: false, message: "Fuel log not found" });
  }

  await log.deleteOne();

  res.status(200).json({ success: true, message: "Fuel log deleted successfully" });
});

module.exports = { getFuelLogs, getFuelLogById, createFuelLog, updateFuelLog, deleteFuelLog };
