const express = require("express");
const router = express.Router();
const tasksController = require("../controllers/tasksController");

router.post("/complete", tasksController.completeTask);

module.exports = router;
