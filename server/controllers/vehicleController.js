const asyncHandler = require("../utils/asyncHandler");
const Vehicle = require("../models/Vehicle");

// @route   GET /api/vehicles
// Supports ?search=&vehicleType=&status=&page=&limit=
const getVehicles = asyncHandler(async (req, res) => {
  const { search, vehicleType, status, page = 1, limit = 10 } = req.query;

  const query = {};
  if (vehicleType) query.vehicleType = vehicleType;
  if (status) query.status = status;

  if (search) {
    query.$or = [
      { registrationNo: { $regex: search, $options: "i" } },
      { vehicleName: { $regex: search, $options: "i" } },
      { vehicleType: { $regex: search, $options: "i" } },
    ];
  }

  const skip = (Number(page) - 1) * Number(limit);

  const [vehicles, total] = await Promise.all([
    Vehicle.find(query).skip(skip).limit(Number(limit)).sort({ createdAt: -1 }),
    Vehicle.countDocuments(query),
  ]);

  res.status(200).json({
    success: true,
    data: vehicles,
    pagination: {
      total,
      page: Number(page),
      limit: Number(limit),
      totalPages: Math.ceil(total / Number(limit)),
    },
  });
});

// @route   GET /api/vehicles/:id
const getVehicleById = asyncHandler(async (req, res) => {
  const vehicle = await Vehicle.findById(req.params.id);

  if (!vehicle) {
    return res.status(404).json({ success: false, message: "Vehicle not found" });
  }

  res.status(200).json({ success: true, data: vehicle });
});

// @route   POST /api/vehicles
const createVehicle = asyncHandler(async (req, res) => {
  const {
    registrationNo,
    vehicleName,
    vehicleType,
    capacity,
    odometer,
    acquisitionCost,
    status,
  } = req.body;

  // Basic validation
  const errors = [];
  if (!registrationNo || !registrationNo.trim()) errors.push("registrationNo is required");
  if (!vehicleName || !vehicleName.trim()) errors.push("vehicleName is required");
  if (!vehicleType || !vehicleType.trim()) errors.push("vehicleType is required");
  if (capacity === undefined || capacity <= 0) errors.push("capacity must be a positive number");
  if (acquisitionCost === undefined || acquisitionCost < 0) errors.push("acquisitionCost must be a non-negative number");

  if (errors.length > 0) {
    return res.status(400).json({ success: false, message: "Validation failed", errors });
  }

  // Uniqueness check on registrationNo
  const existing = await Vehicle.findOne({
    registrationNo: registrationNo.trim().toUpperCase(),
  });

  if (existing) {
    return res.status(409).json({
      success: false,
      message: `Cannot add vehicle: registration number ${registrationNo} already exists`,
    });
  }

  const vehicle = await Vehicle.create({
    registrationNo,
    vehicleName,
    vehicleType,
    capacity,
    odometer,
    acquisitionCost,
    status,
  });

  res.status(201).json({ success: true, data: vehicle });
});

// @route   PUT /api/vehicles/:id
const updateVehicle = asyncHandler(async (req, res) => {
  const vehicle = await Vehicle.findById(req.params.id);

  if (!vehicle) {
    return res.status(404).json({ success: false, message: "Vehicle not found" });
  }

  // If registrationNo is being changed, re-check uniqueness
  if (req.body.registrationNo) {
    const duplicate = await Vehicle.findOne({
      registrationNo: req.body.registrationNo.trim().toUpperCase(),
      _id: { $ne: req.params.id },
    });

    if (duplicate) {
      return res.status(409).json({
        success: false,
        message: `Cannot update: registration number ${req.body.registrationNo} already exists`,
      });
    }
  }

  const updated = await Vehicle.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
  });

  res.status(200).json({ success: true, data: updated });
});

// @route   DELETE /api/vehicles/:id
const deleteVehicle = asyncHandler(async (req, res) => {
  const vehicle = await Vehicle.findById(req.params.id);

  if (!vehicle) {
    return res.status(404).json({ success: false, message: "Vehicle not found" });
  }

  // Business rule: don't allow deleting a vehicle currently on a trip
  if (vehicle.status === "ON_TRIP") {
    return res.status(400).json({
      success: false,
      message: "Cannot delete a vehicle that is currently ON_TRIP",
    });
  }

  await vehicle.deleteOne();
  res.status(200).json({ success: true, message: "Vehicle deleted" });
});

module.exports = { getVehicles, getVehicleById, createVehicle, updateVehicle, deleteVehicle };