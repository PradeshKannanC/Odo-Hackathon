const express = require("express");
const { getSummaryReport, getExpenseReport } = require("../controllers/reportController");
const { protect } = require("../middleware/authMiddleware");

const router = express.Router();

router.use(protect);

router.get("/summary", getSummaryReport);
router.get("/expenses", getExpenseReport);

module.exports = router;
