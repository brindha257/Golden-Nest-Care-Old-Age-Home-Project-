const express = require("express");
const router = express.Router();
const { getEmergency } = require("../controllers/emergencyController");

router.get("/", getEmergency);

module.exports = router;