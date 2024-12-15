const express = require("express");
const router = express.Router();
const bonusController = require("../controllers/bonusController");

router.get("/get-status", bonusController.getBonusStatus);
router.post("/claim", bonusController.claimBonus);

module.exports = router;
