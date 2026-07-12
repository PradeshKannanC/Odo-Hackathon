const asyncHandler = require("../utils/asyncHandler");
const Vehicle = require("../models/Vehicle");
const Driver = require("../models/Driver");
const Trip = require("../models/Trip");
const Maintenance = require("../models/Maintenance");

// Groups a collection by its status field and fills in zero counts for any
// enum value that has no documents yet
const statusCounts = async (Model, enumValues) => {
  const results = await Model.aggregate([{ $group: { _id: "$status", count: { $sum: 1 } } }]);
  const counts = Object.fromEntries(enumValues.map((value) => [value, 0]));
  results.forEach((r) => {
    if (r._id in counts) counts[r._id] = r.count;
  });
  return counts;
};

const sumCounts = (counts) => Object.values(counts).reduce((total, value) => total + value, 0);

// @desc    Aggregate fleet-wide stats for the dashboard cards & charts
// @route   GET /api/dashboard/stats
// @access  Private
const getDashboardStats = asyncHandler(async (req, res) => {
  const [vehicleCounts, driverCounts, tripCounts, maintenanceCounts] = await Promise.all([
    statusCounts(Vehicle, ["AVAILABLE", "ON_TRIP", "IN_SHOP", "RETIRED"]),
    statusCounts(Driver, ["AVAILABLE", "ON_TRIP", "OFF_DUTY", "SUSPENDED"]),
    statusCounts(Trip, ["DRAFT", "DISPATCHED", "COMPLETED", "CANCELLED"]),
    statusCounts(Maintenance, ["ACTIVE", "COMPLETED"]),
  ]);

  const totalVehicles = sumCounts(vehicleCounts);
  const fleetUtilization = totalVehicles
    ? Math.round((vehicleCounts.ON_TRIP / totalVehicles) * 100)
    : 0;

  res.status(200).json({
    success: true,
    data: {
      vehicles: {
        total: totalVehicles,
        active: vehicleCounts.AVAILABLE + vehicleCounts.ON_TRIP,
        available: vehicleCounts.AVAILABLE,
        inMaintenance: vehicleCounts.IN_SHOP,
        byStatus: vehicleCounts,
      },
      trips: {
        total: sumCounts(tripCounts),
        active: tripCounts.DISPATCHED,
        pending: tripCounts.DRAFT,
        byStatus: tripCounts,
      },
      drivers: {
        total: sumCounts(driverCounts),
        onDuty: driverCounts.AVAILABLE + driverCounts.ON_TRIP,
        byStatus: driverCounts,
      },
      maintenance: {
        active: maintenanceCounts.ACTIVE,
        byStatus: maintenanceCounts,
      },
      fleetUtilization,
    },
  });
});

// @desc    List recent trips, optionally filtered by status and/or date range
// @route   GET /api/dashboard/recent-trips
// @access  Private
const getRecentTrips = asyncHandler(async (req, res) => {
  const { status, from, to, limit = 10 } = req.query;
  const filter = {};

  if (status) filter.status = status;
  if (from || to) {
    filter.createdAt = {};
    if (from) filter.createdAt.$gte = new Date(from);
    if (to) filter.createdAt.$lte = new Date(to);
  }

  const trips = await Trip.find(filter)
    .sort({ createdAt: -1 })
    .limit(Math.min(Number(limit) || 10, 50));

  res.status(200).json({ success: true, data: trips });
});

module.exports = { getDashboardStats, getRecentTrips };
