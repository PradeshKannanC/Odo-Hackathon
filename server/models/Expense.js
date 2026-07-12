const mongoose = require("mongoose");

// Placeholder schema - fields to be expanded when Expenses/Reports module is implemented
const expenseSchema = new mongoose.Schema({}, { timestamps: true });

module.exports = mongoose.model("Expense", expenseSchema);
