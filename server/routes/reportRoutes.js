const express = require("express");
const { getSummaryReport, getExpenseReport } = require("../controllers/reportController");
const { protect } = require("../middleware/authMiddleware");
const { authorize } = require("../middleware/roleMiddleware");

const router = express.Router();

router.use(protect);
router.use(authorize("fleet_manager", "safety_officer", "financial_analyst"));

router.get("/summary", getSummaryReport);
router.get("/expenses", getExpenseReport);

module.exports = router;
