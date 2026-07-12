const express = require("express");
const { getUsers, getUserById, updateUser, deleteUser } = require("../controllers/userController");
const { protect } = require("../middleware/authMiddleware");
const { authorize, requireSelfOrRole } = require("../middleware/roleMiddleware");

const router = express.Router();

router.use(protect);

router.get("/", authorize("fleet_manager"), getUsers);
router.get("/:id", requireSelfOrRole("fleet_manager"), getUserById);
router.put("/:id", requireSelfOrRole("fleet_manager"), updateUser);
router.delete("/:id", authorize("fleet_manager"), deleteUser);

module.exports = router;
