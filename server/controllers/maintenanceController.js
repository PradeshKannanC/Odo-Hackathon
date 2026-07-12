const asyncHandler = require("../utils/asyncHandler");
const Maintenance = require("../models/Maintenance");

// @route   GET /api/maintenance
const getMaintenanceRecords = asyncHandler(async (req, res) => {
  const { status, vehicle } = req.query;

  const query = {};
  if (status) query.status = status;
  if (vehicle) query.vehicle = vehicle;

  const records = await Maintenance.find(query)
    .populate("vehicle", "registrationNo vehicleName vehicleType")
    .sort({ createdAt: -1 });

  res.status(200).json({
    success: true,
    count: records.length,
    data: records,
  });
});

// @route   GET /api/maintenance/:id
const getMaintenanceById = asyncHandler(async (req, res) => {
  const record = await Maintenance.findById(req.params.id).populate(
    "vehicle",
    "registrationNo vehicleName vehicleType"
  );

  if (!record) {
    return res.status(404).json({ success: false, message: "Maintenance record not found" });
  }

  res.status(200).json({ success: true, data: record });
});

// @route   POST /api/maintenance
const createMaintenance = asyncHandler(async (req, res) => {
  const record = await Maintenance.create(req.body);
  const populated = await record.populate("vehicle", "registrationNo vehicleName vehicleType");

  res.status(201).json({
    success: true,
    message: "Maintenance record created successfully",
    data: populated,
  });
});

// @route   PUT /api/maintenance/:id
const updateMaintenance = asyncHandler(async (req, res) => {
  const record = await Maintenance.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
  }).populate("vehicle", "registrationNo vehicleName vehicleType");

  if (!record) {
    return res.status(404).json({ success: false, message: "Maintenance record not found" });
  }

  res.status(200).json({
    success: true,
    message: "Maintenance record updated successfully",
    data: record,
  });
});

// @route   DELETE /api/maintenance/:id
const deleteMaintenance = asyncHandler(async (req, res) => {
  const record = await Maintenance.findById(req.params.id);

  if (!record) {
    return res.status(404).json({ success: false, message: "Maintenance record not found" });
  }

  await record.deleteOne();

  res.status(200).json({ success: true, message: "Maintenance record deleted successfully" });
});

module.exports = {
  getMaintenanceRecords,
  getMaintenanceById,
  createMaintenance,
  updateMaintenance,
  deleteMaintenance,
};
