const asyncHandler = require("../utils/asyncHandler");
const Vehicle = require("../models/Vehicle");
const Driver = require("../models/Driver");
const Trip = require("../models/Trip");
const Maintenance = require("../models/Maintenance");
const FuelLog = require("../models/FuelLog");

const statusCounts = async (Model, enumValues) => {
  const results = await Model.aggregate([{ $group: { _id: "$status", count: { $sum: 1 } } }]);
  const counts = Object.fromEntries(enumValues.map((value) => [value, 0]));
  results.forEach((r) => {
    if (r._id in counts) counts[r._id] = r.count;
  });
  return counts;
};

// @route   GET /api/reports/summary
// @access  Fleet Manager, Safety Officer, Financial Analyst
const getSummaryReport = asyncHandler(async (req, res) => {
  const [vehicleCounts, driverCounts, tripCounts, maintenanceAgg, fuelAgg] = await Promise.all([
    statusCounts(Vehicle, ["AVAILABLE", "ON_TRIP", "IN_SHOP", "RETIRED"]),
    statusCounts(Driver, ["AVAILABLE", "ON_TRIP", "OFF_DUTY", "SUSPENDED"]),
    statusCounts(Trip, ["DRAFT", "DISPATCHED", "COMPLETED", "CANCELLED"]),
    Maintenance.aggregate([
      { $group: { _id: null, count: { $sum: 1 }, totalCost: { $sum: "$cost" } } },
    ]),
    FuelLog.aggregate([
      {
        $group: {
          _id: null,
          count: { $sum: 1 },
          totalLiters: { $sum: "$liters" },
          totalCost: { $sum: "$cost" },
        },
      },
    ]),
  ]);

  const sum = (obj) => Object.values(obj).reduce((total, v) => total + v, 0);

  res.status(200).json({
    success: true,
    data: {
      vehicles: { total: sum(vehicleCounts), byStatus: vehicleCounts },
      drivers: { total: sum(driverCounts), byStatus: driverCounts },
      trips: { total: sum(tripCounts), byStatus: tripCounts },
      maintenance: {
        count: maintenanceAgg[0]?.count || 0,
        totalCost: maintenanceAgg[0]?.totalCost || 0,
      },
      fuel: {
        count: fuelAgg[0]?.count || 0,
        totalLiters: fuelAgg[0]?.totalLiters || 0,
        totalCost: fuelAgg[0]?.totalCost || 0,
      },
    },
  });
});

// @route   GET /api/reports/expenses
// @access  Fleet Manager, Safety Officer, Financial Analyst
const getExpenseReport = asyncHandler(async (req, res) => {
  const [maintenanceByVehicle, fuelByVehicle, maintenanceTotalAgg, fuelTotalAgg] =
    await Promise.all([
      Maintenance.aggregate([
        { $group: { _id: "$vehicle", cost: { $sum: "$cost" } } },
        {
          $lookup: {
            from: "vehicles",
            localField: "_id",
            foreignField: "_id",
            as: "vehicle",
          },
        },
        { $unwind: { path: "$vehicle", preserveNullAndEmptyArrays: true } },
        { $sort: { cost: -1 } },
        {
          $project: {
            _id: 0,
            vehicleId: "$_id",
            registrationNo: "$vehicle.registrationNo",
            vehicleName: "$vehicle.vehicleName",
            cost: 1,
          },
        },
      ]),
      FuelLog.aggregate([
        { $group: { _id: "$vehicle", cost: { $sum: "$cost" }, liters: { $sum: "$liters" } } },
        {
          $lookup: {
            from: "vehicles",
            localField: "_id",
            foreignField: "_id",
            as: "vehicle",
          },
        },
        { $unwind: { path: "$vehicle", preserveNullAndEmptyArrays: true } },
        { $sort: { cost: -1 } },
        {
          $project: {
            _id: 0,
            vehicleId: "$_id",
            registrationNo: "$vehicle.registrationNo",
            vehicleName: "$vehicle.vehicleName",
            cost: 1,
            liters: 1,
          },
        },
      ]),
      Maintenance.aggregate([{ $group: { _id: null, total: { $sum: "$cost" } } }]),
      FuelLog.aggregate([{ $group: { _id: null, total: { $sum: "$cost" } } }]),
    ]);

  const totalMaintenanceCost = maintenanceTotalAgg[0]?.total || 0;
  const totalFuelCost = fuelTotalAgg[0]?.total || 0;

  res.status(200).json({
    success: true,
    data: {
      totalMaintenanceCost,
      totalFuelCost,
      totalExpense: totalMaintenanceCost + totalFuelCost,
      maintenanceByVehicle,
      fuelByVehicle,
    },
  });
});

module.exports = { getSummaryReport, getExpenseReport };
